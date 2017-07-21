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
    public class CurrencyController : ApiController
    {
        readonly IUserServices _userBusiness;
        public CurrencyController(IUserServices userBusiness)
        {
            _userBusiness = userBusiness;
        }

        [AuthorizationRequired]
        // GET api/currency
        public IEnumerable<UserEntity> Get()
        {
            return _userBusiness.GetAllUser();
        }

        // GET api/currency/5
        public UserEntity Get(int Id)
        {
            return _userBusiness.GetUserById(Id);
        }

       
    }
}