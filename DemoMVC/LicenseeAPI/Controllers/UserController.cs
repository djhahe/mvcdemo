using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Http;
using LicenseeBusiness;
using DBContext;
using AutoMapper;

namespace LicenseeAPI.Controllers
{
    public class UserController : ApiController
    {
        [System.Web.Http.HttpGet]
        public IEnumerable<User> GetAll()
        {
            IUserBusiness userBusiness = new UserBusiness();
            var userList = userBusiness.GetUserList();
            return Mapper.Map<List<DBContext.User>,List<User> >(userList);
        }
    }
}