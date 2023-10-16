using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Service.CurrentUserService;

namespace webapi.Controllers
{
    [Route("api/[controller]/[action]")]
    [Authorize]
    public class AuthorizeController : Controller
    {
        public readonly IMapper _mapper;
        public readonly ICurrentUserService _currentUserService;
        public AuthorizeController(IMapper mapper, ICurrentUserService currentUserService)
        {
             _currentUserService = currentUserService;
            _mapper = mapper;
        }

    }
}
