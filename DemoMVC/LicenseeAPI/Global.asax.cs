using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Routing;

namespace LicenseeAPI
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);
            Mapper.Initialize(cfg => cfg.CreateMap<DBContext.User, Models.User>()
            );
            Mapper.Initialize(cfg => cfg.CreateMap<List<DBContext.User>, List<Models.User>>()
            );
            Mapper.AssertConfigurationIsValid();
            
        }
    }
}
