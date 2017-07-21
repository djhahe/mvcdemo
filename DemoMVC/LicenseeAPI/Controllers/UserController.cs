using System.Collections.Generic;
using System.Web.Http;
using LicenseeBusiness;
using BusinessEntities;
using LicenseeAPI.Filter;
using LicenseeAPI.ActionFilters;
using System.Web.Http.Cors;

namespace LicenseeAPI.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [AuthorizationRequired]
    public class UserController : ApiController
    {
        readonly IUserServices _userBusiness;
        public UserController(IUserServices userBusiness)
        {
            _userBusiness = userBusiness;
        }

        [AuthorizationRequired]
        // GET api/user
        public IEnumerable<UserEntity> Get()
        {
            return _userBusiness.GetAllUser();
        }

        // GET api/user/5
        public UserEntity Get(int Id)
        {
            return _userBusiness.GetUserById(Id);
        }

        // POST api/user
        public int Post([FromBody] UserEntity userEntity)
        {
            return _userBusiness.AddUser(userEntity);
        }

        public bool Put(UserEntity userEntity)
        {
            return _userBusiness.UpdateUserInfo(userEntity);
        }



    }
}