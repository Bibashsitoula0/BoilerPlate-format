using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Service.CommonService;
using Service.CurrentUserService;
using static IdentityModel.OidcConstants;
using System;
using Model;
using Microsoft.AspNetCore.Authorization;
using static Duende.IdentityServer.IdentityServerConstants;
using System.Text;
using Microsoft.AspNetCore.Identity;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using DTO;
using System.Runtime.CompilerServices;
using Service.NavigationService;

namespace webapi.Controllers.CommonController
{
    public class CommonController : AuthorizeController
    {
        private readonly ICommonService _commonservice;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly INavigationService _navigationService;
        public CommonController(INavigationService navigationservice, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IMapper mapper, ICurrentUserService currentUserService, ICommonService commonservice) : base(mapper, currentUserService)
        {
            _commonservice = commonservice;
            _userManager = userManager;
            _signInManager = signInManager;
            _navigationService = navigationservice;
        }

        [HttpGet]
        public async Task<Response<List<SelectList>>> GetAllFiscal()
        {
            try
            {
                var getfiscal = await _commonservice.GetAllFiscal();
                var result = getfiscal.Select(x => new SelectList()
                {
                    Key = x.id,
                    Value = x.fyname
                }).OrderBy(x => x.Value).ToList();

                return Message.SucessWithData("Fiscal year get sucessfully", result);
            }
            catch (Exception ex)
            {
                return Message.Error(ex.Message, (List<SelectList>)null);
            }

        }

        [HttpGet]
        public async Task<Response<List<SelectList>>> GetProvince()
        {
            try
            {
                var getprovince = await _commonservice.GetProvince();
                var result = getprovince.Select(x => new SelectList()
                {
                    Key = x.id,
                    Value = x.province_name
                }).OrderBy(x => x.Value).ToList();
                return Message.SucessWithData("Province get sucessfully", result);
            }
            catch (Exception ex)
            {
                return Message.Error(ex.Message, (List<SelectList>)null);
            }
        }

        [HttpGet]
        public async Task<Response<List<SelectList>>> GetDistrictByProvinceIds(string? provinceIds)
        {
            if (provinceIds == null)
            {
                provinceIds = "0";
            }
            int[] dids = new int[provinceIds.Length];
            string[] ids = provinceIds.Split(',');
            for (int j = 0; j < ids.Length; j++)
            {
                dids[j] = Convert.ToInt32(ids[j]);
            }
            try
            {
                var getdistrict = await _commonservice.GetDistrictByProvinceIds(dids);
                var result = getdistrict.Select(x => new SelectList()
                {
                    Key = x.id,
                    Value = x.district_name
                }).OrderBy(x => x.Value).ToList();

                return Message.SucessWithData("District get sucessfully", result);
            }
            catch (Exception ex)
            {
                return Message.Error(ex.Message, (List<SelectList>)null);
            }
        }

        [HttpGet]
        public async Task<Response<List<SelectList>>> GetMultiplePalikaByMultipleDistrictIds(string? districtIds)
        {
            if (districtIds == null)
            {
                districtIds = "0";
            }
            int[] dids = new int[districtIds.Length];
            string[] ids = districtIds.Split(',');
            for (int j = 0; j < ids.Length; j++)
            {
                dids[j] = Convert.ToInt32(ids[j]);
            }
            try
            {
                var getpalika = await _commonservice.GetMultiplePalikaByMultipleDistrictIds(dids);
                var result = getpalika.Select(x => new SelectList()
                {
                    Key = x.id,
                    Value = x.palika_name
                }).OrderBy(x => x.Value).ToList();
                return Message.SucessWithData("Palika get sucessfully", result);
            }
            catch (Exception ex)
            {
                return Message.Error(ex.Message, (List<SelectList>)null);
            }
        }

        [HttpGet]
        public async Task<Response<List<ProvinceDistrictPalika>>> GetProvinceDistrictPalika()
        {

            try
            {
                var listpdp = new List<ProvinceDistrictPalika>();
                var getpalika = await _commonservice.GetProvinceDistrictPalika();
                foreach (var item in getpalika)
                {
                    var da = new ProvinceDistrictPalika();
                    var district = new DistrictVm();
                    var palika = new palikaVm();
                    da.provinceid = item.provinceid;
                    da.provincename = item.provincename;
                    da.provincenamenepali = item.provincenamenepali;
                    da.province_active = item.province_active;
                    district.districtid = item.districtid;
                    district.districtname = item.districtname;
                    district.districtnamenepali = item.districtnamenepali;
                    district.district_active = item.district_active;
                    palika.palikaid = item.palikaid;
                    palika.palikaname = item.palikaname;
                    palika.palikanamenepali = item.palikanamenepali;
                    palika.palikaactive = item.palikaactive;
                    da.District = district;
                    district.Paliaka = palika;
                    listpdp.Add(da);
                }
                return Message.SucessWithData("Province District Palika", listpdp);

            }
            catch (Exception ex)
            {
                return Message.Error(ex.Message, (List<ProvinceDistrictPalika>)null);
            }
        }

        [HttpPost]
        public async Task<object> AccessAreaForProvince([FromBody]List<ApproveProvinceDistrictPalika> model)
        {
            try
            { 
                var data = await _commonservice.ApproveArea(model);
                return Message.Error("Access given sucessfully", (List<Province>)null);
            }
            catch (Exception ex)
            {
                return Message.Error(ex.Message, (List<Province>)null);
            }
        }

      
        [HttpGet]
        public async Task<Response<UserWithNavigation>> GetUserDetails(string token)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(token)) return Message.Error("Token is null", (UserWithNavigation)null);
                var tokenHandler = new JwtSecurityTokenHandler();
                var jwtToken = tokenHandler.ReadJwtToken(token);
                var userId = jwtToken.Claims.FirstOrDefault(c => c.Type == "UserId");
                var usernameClaim = jwtToken.Claims.FirstOrDefault(c => c.Type == "UserName");
                var roleID = jwtToken.Claims.FirstOrDefault(c => c.Type == "Role");
                var roleName = jwtToken.Claims.FirstOrDefault(c => c.Type == "RoleId");

                if (userId == null) return Message.Error("UserID is null", (UserWithNavigation)null);

                var userid = userId.Value;
                var username = usernameClaim?.Value;
                var role = roleName?.Value;
                var roleId = roleID?.Value;

                List<Navigation> navigations = new List<Navigation>();
                var nav = await _navigationService.GetNavigationByRole(role);
                navigations = nav.Where(x => x.parent_navigation_id == 0 & x.root_navigation_id == 0).OrderBy(x => x.display_order).ToList();
                foreach (var item in navigations)
                {
                    var childNav = nav.Where(x => x.parent_navigation_id == item.navigation_id).ToList();
                    item.children = childNav;
                    foreach (var child in childNav)
                    {
                        var grandChildNav = nav.Where(x => x.parent_navigation_id == child.navigation_id).ToList();
                        child.children = grandChildNav;
                    }
                }
                var user = await _userManager.FindByNameAsync(username);
                var userwithnav =new UserWithNavigation();
                userwithnav.UserID=userid;
                userwithnav.role = roleId;
                userwithnav.UserName = username;
                userwithnav.Navigations = navigations;
                userwithnav.displayname = user.fullName;
                userwithnav.email = user.Email;
                return Message.SucessWithData("User and navigation get sucessfully", userwithnav);
            }
            catch (Exception ex)
            {
                return Message.Error(ex.Message, (UserWithNavigation)null);
            }

        }

        [HttpPost]
        public async Task<object> LockoutForFiscalYear([FromBody] GiveAcessForFiscalYear model)
        {
            try
            {
                var data = await _commonservice.LockoutForFiscalYear(model);
                return Message.Error("Access given sucessfully", (GiveAcessForFiscalYear)null);
            }
            catch (Exception ex)
            {
                return Message.Error(ex.Message, (GiveAcessForFiscalYear)null);
            }
        }

        [HttpGet]
        public async Task<Response<List<FiscalYearsDto>>> GetAllFiscalForChecked()
        {
            try
            {
                var fiscalDto = new List<FiscalYearsDto>();
                var getfiscal = await _commonservice.GetAllFiscal();
                foreach (var item in getfiscal)
                {
                    var fisdto = new FiscalYearsDto();
                    fisdto.fiscalid = item.id;
                    fisdto.name = item.fynamenepali;
                    fisdto.fy_locked = item.locked;
                    fiscalDto.Add(fisdto);
                }
                return Message.SucessWithData("Fiscal year get sucessfully", fiscalDto);
            }
            catch (Exception ex)
            {
                return Message.Error(ex.Message, (List<FiscalYearsDto>)null);
            }

        }

        [HttpGet]
        public async Task<Response<List<FiscalDetailDto>>> GetAllFiscalChildForChecked(int fyid)
        {
            try
            {
                var fiscalDto = new List<FiscalDetailDto>();        
                var getfiscaldetail = await _commonservice.GetAllFiscalDetail(fyid);                
                foreach (var item in getfiscaldetail)
                {
                    var fisdto = new FiscalDetailDto();
                    fisdto.fiscal_detail_id = item.id;
                    fisdto.fiscal_id = item.fyid;
                    fisdto.fydetail_nepali_name = item.fydetail_nepali_name;
                    fisdto.fydetail_name = item.fydetail_name;
                    fisdto.fy_type = item.fy_type;
                    fisdto.locked = item.locked;
                    fiscalDto.Add(fisdto);
                }
                return Message.SucessWithData("Fiscal year get sucessfully", fiscalDto);            }
            catch (Exception ex)
            {
                return Message.Error(ex.Message, (List<FiscalDetailDto>)null);
            }

        }


    }
    }
