using AutoMapper;
using DTO;
using Duende.IdentityServer.Extensions;
using Duende.IdentityServer.Models;
using Duende.IdentityServer.Validation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Model;
using Service.AccountService;
using Service.CurrentUserService;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Transactions;
using static IdentityModel.OidcConstants;

namespace webapi.Controllers.AccountController
{
    public class AccountController : AuthorizeController
    {
   
        private UserManager<ApplicationUser> _userManager;
        private SignInManager<ApplicationUser> _signInManager;
        private RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;
        private readonly IAccountService _accountService;
        public AccountController(IAccountService accountService,UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, RoleManager<IdentityRole> roleManager,
            IConfiguration configuration, IMapper mapper, ICurrentUserService currentUserService) : base (mapper, currentUserService)
        {
       
            _userManager = userManager;
            _accountService = accountService;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _configuration = configuration;      

        }


        [HttpPost]     
        public async Task<Response<ApplicationUser>> RegisterGeneralUser(UserDto dto)

                {
                     try
                    {
                 using var scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled);
                //automapper
                var domainModel = _mapper.Map<ApplicationUserVm>(dto);

                        if (domainModel == null) return Message.Error(" Incomplete user informtion", (ApplicationUser)null);        
                      var userExists = await _userManager.FindByNameAsync(domainModel.UserName);
                      if (userExists != null) return Message.Error($"{domainModel.UserName} User Name already exists", (ApplicationUser)null);   

                      var applicationUser = new ApplicationUser()
                      {
                          UserName = domainModel.UserName,
                          Email = domainModel.email,
                          fullName = domainModel.fullName,
                          isactive= domainModel.isactive,
                      };

                       var result = await _userManager.CreateAsync(applicationUser, domainModel.password);
                      if (result.Succeeded)
                          {
                              var role = domainModel.role;
                              if (!await _roleManager.RoleExistsAsync(role))
                               await _roleManager.CreateAsync(new IdentityRole(role));
                              await _userManager.AddToRoleAsync(applicationUser, role);
                              var user = await _userManager.FindByNameAsync(domainModel.UserName);
                               scope.Complete();
                              return Message.Sucess("User Created Sucessfully", (ApplicationUser)null);        


                          }
                          else
                          {
                              dynamic errors = null;
                              foreach (var error in result.Errors)
                              {
                                 errors = error.Description;                 

                              }
                              return Message.Error(errors, (ApplicationUser)null);
                          }
               
            }
                      catch (Exception e)
                      {
                          return Message.Error(e.Message, (ApplicationUser)null);
                      }
                }

        [AllowAnonymous]
        [HttpPost]
       public async Task<Response<LoginReturnTypeDto>> Login(LoginDto model)
                {
                    try
                    {
                        var domainModel = _mapper.Map<LoginVm>(model);

                        if (domainModel == null || string.IsNullOrEmpty(domainModel.UserName) || string.IsNullOrEmpty(domainModel.Password)) return Message.Error("Need both User Name and Password", (LoginReturnTypeDto)null);
                        var user = await _userManager.FindByNameAsync(domainModel.UserName);
                        if (user == null) return Message.Error("User Name doesnot exist", (LoginReturnTypeDto)null);
                        if (user.isactive == false) return Message.Error("User is not Active", (LoginReturnTypeDto)null);  

                        var login = await _signInManager.CheckPasswordSignInAsync(user, domainModel.Password, false);
                        if (login.Succeeded)
                        {
                            var assignedroles = await _userManager.GetRolesAsync(user);
                            string assignedrole = assignedroles.FirstOrDefault();

                              /* var getroleId = await _accountService.GetRoleNameById(assignedrole);
                                 var getroleById = getroleId[0].Id;
                                 var navigation = await _navigationService.GetNavigationByRole(getroleById);*/

                            if (assignedroles.Count == 0) return Message.Error($"{domainModel.UserName}has not been assigned any roles", (LoginReturnTypeDto)null);
                      /*      if (assignedrole != "admin") return Message.Error("UnAuthorized Access", (LoginReturnTypeDto)null);*/
                            var assignedroledetails = await _roleManager.FindByNameAsync(assignedrole);

                            // handiling login  SigningCredentials

                            IdentityOptions _options = new IdentityOptions();
                            var tokenDescriptor = new JwtSecurityToken(
                           issuer: _configuration["JWT:ValidIssuer"],
                           audience: _configuration["JWT:ValidAudience"],
                          claims: (new Claim[]
                                {
                                new Claim("UserId",user.Id.ToString()),
                                new Claim("UserName",user.UserName.ToString()),
                                new Claim("RoleId",assignedroledetails.Id.ToString()),
                                new Claim("Role",assignedroledetails.Name.ToString()),
                                new Claim(_options.ClaimsIdentity.RoleClaimType, assignedrole)
                                }),
                          notBefore: DateTime.UtcNow,
                          expires: DateTime.UtcNow.AddHours(100),
                       signingCredentials: new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["ApplicationSettings:JWT_Secret"])), SecurityAlgorithms.HmacSha256)
                   );
                            var token = new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
                            var _id = user.Id;
                            var getuser = await _userManager.FindByIdAsync(_id);
                            var rolelist = await _userManager.GetRolesAsync(user);
                            var role = rolelist.FirstOrDefault();

                            var roleId = await _roleManager.Roles.FirstOrDefaultAsync(r => r.Name == role);
                            dynamic roleid = null;

                            if (roleId != null)
                            {
                                roleid = roleId.Id;
                            }

                            var data = new LoginReturnTypeDto();
                            data.jwt = token;
                            data.displayName = user.fullName;
                            data.userid = user.Id;
                            data.Role = role;
                            data.RoleId = roleid;
                            data.email = user.Email;
                            return Message.SucessWithData("Login Successfully", data);
                        }
                        else return Message.Error("Email and Password doesnot match.",(LoginReturnTypeDto)null);

                    }
                    catch (Exception e)
                    {
                        return Message.Error(e.Message, (LoginReturnTypeDto)null);
                    }

                }

        /// <summary>
                /// API for logged in user to change his/her password
                /// </summary>
                /// <param name="model"></param>
                /// <returns></returns>

        [HttpPost]
        public async Task<Response<UserPassword>> ChangePassword(UserPasswordDto dto)
                {
                    try
                    {
                        var model = _mapper.Map<UserPassword>(dto);
                        var user = await _userManager.FindByIdAsync(_currentUserService.UserId);
                        var t = _userManager.CheckPasswordAsync(user, model.OldPassword);
                        if (t.Result == true)
                        {
                            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
                            var result = await _userManager.ResetPasswordAsync(user, token, model.NewPassword);
                            return result.Succeeded ? Message.Sucess("Password changed successfully", (UserPassword)null) : Message.Error("Passwords must be at least 6 digits", (UserPassword)null);                 
                        }
                        else
                        {
                            return Message.Error("Invalid Old Password", (UserPassword)null);
                        }
                    }
                    catch (Exception ex)
                    {
                        return Message.Error(ex.Message, (UserPassword)null);
                    }
                }


        /// <summary>
        /// API  for super admin to change other users' password
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<Response<ChangePassword>> ChangeUserPassword(ChangePasswordDto dto)
        {
            try
            {
                var model = _mapper.Map<ChangePassword>(dto);
                var user = await _userManager.FindByNameAsync(model.UserName);
                if (user != null)
                {
                    var token = await _userManager.GeneratePasswordResetTokenAsync(user);
                    var result = await _userManager.ResetPasswordAsync(user, token, model.NewPassword);
                    return result.Succeeded ? Message.Sucess("Password changed successfully", (ChangePassword)null) : Message.Error("Passwords must be at least 6 digits", (ChangePassword)null) ;
                }
                else
                {
                    return Message.Error("User doesnot exist", (ChangePassword)null);
                }
            }
            catch (Exception e)
            {
                return Message.Error(e.Message, (ChangePassword)null);

            }
        }

        [HttpGet]
        public async Task<Response<List<UserListDto>>> UserList(int? pageNumber, int? pageSize, string? SearchString)
        {
            try
            {
                // filter Nullable handler
                 string searchstring = FilterNullHandler.ReturnEmptyString(SearchString);
                // pagination handler
                Dictionary<int, int> pagination = FilterNullHandler.paginationHandler(pageNumber, pageSize);
              
                var data = await _accountService.GetUser(pagination.Keys.FirstOrDefault(), pagination.Values.FirstOrDefault(), searchstring);
                var result = _mapper.Map<List<RegisterList>, List<UserListDto>>(data);
                return Message.SucessWithData("User list get sucessfully", result);
            }
            catch (Exception e)
            {
                return Message.Error(e.Message, (List<UserListDto>)null);


            }
        }

        [HttpGet]
        public async Task<Response<List<SelectListModel>>> GetRole()
        {
            try
            {
                string[] generalUserRoles = _configuration["Roles:role"].ToString().Split(',');
                var selectListItems = new List<SelectListModel>();
                foreach (var role in generalUserRoles)
                {
                    var selectListItem = new SelectListModel
                    {
                        Key = role,
                        Value = role
                    };
                    selectListItems.Add(selectListItem);
                }
                return Message.SucessWithData("Role get Sucessfully", selectListItems);
            }
            catch (Exception ex)
            {
                return Message.Error(ex.Message, (List<SelectListModel>)null);
            }                     
        }

        [HttpPost]     
        public async Task<Response<ApplicationUser>> UpdateGeneralUser(UserDto dto)
        {
            try
            {
             var model = _mapper.Map<ApplicationUserVm>(dto);
            if (model == null || string.IsNullOrEmpty(model.Id)) return Message.Error("User id cannot be null for editing existing user", (ApplicationUser)null);           
            using var scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled);

            var updating_User = await _userManager.FindByIdAsync(model.Id);
            updating_User.UserName = model.UserName;
            updating_User.fullName = model.fullName;
            updating_User.Email = model.email;
             updating_User.isactive = model.isactive;
               
            var result = _userManager.UpdateAsync(updating_User);
                if (result.Result.Succeeded)
                {
                    var rolelist = await _userManager.GetRolesAsync(updating_User);//gets array of rolesfor this user
                    await _userManager.RemoveFromRoleAsync(updating_User, rolelist[0]); //remove this user from all previous roles
                    await _userManager.AddToRoleAsync(updating_User, model.role); //assign new given role to this user
                }
                scope.Complete();
                return Message.Sucess("User update Sucessfully", (ApplicationUser)null);
            }
            catch (Exception e)
            {
                return Message.Error(e.Message, (ApplicationUser)null);
            }

        }
  
        [HttpGet]
        public async Task<Response<List<ApplicationUser>>> Delete(string Id)
        {
            try
            {
                var data = _accountService.DeleteUser(Id);
                return Message.Sucess("Deletd Sucessfully", (List<ApplicationUser>)null);
            }
            catch (Exception e)
            {
                return Message.Error(e.Message, (List<ApplicationUser>)null);
            }
            
        }

        [HttpGet]
        public async Task<Response<List<SelectListModel>>> GetAllRoles()
        {
            var roles = _roleManager.Roles;
            var result = roles.Select(x => new SelectListModel()
            {
                Key = x.Id,
                Value = x.Name
            }).OrderBy(x => x.Value).ToList();
            return Message.SucessWithData("Roles get sucessfully", result);
           
        }
    }
}
