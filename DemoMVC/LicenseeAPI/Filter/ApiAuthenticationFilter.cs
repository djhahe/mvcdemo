using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.Controllers;
using LicenseeBusiness;
using System.Threading;

namespace LicenseeAPI.Filter
{
    public class ApiAuthenticationFilterAttribute : GenericAuthenticationFilterAttribute
    {
        public ApiAuthenticationFilterAttribute()
        {

        }

        public ApiAuthenticationFilterAttribute(bool isActive) : base(isActive)
        {

        }

        protected override bool OnAuthorizeUser(string user, string pass, HttpActionContext filterContext)
        {
            var provider = filterContext.ControllerContext.
                Configuration.DependencyResolver.
                GetService(typeof(IUserServices)) as IUserServices;

            if(provider != null)
            {
                var userId = provider.Authenticate(user, pass);
                if(userId > 0)
                {
                    var basicAuthenticationIdentity = Thread.CurrentPrincipal.Identity 
                                                                as BasicAuthenticationIdentity;

                    if (basicAuthenticationIdentity != null)
                        basicAuthenticationIdentity.UserId = userId;
                    return true;
                }
            }

            return false;
        }

    }
}