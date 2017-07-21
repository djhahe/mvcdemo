using Microsoft.Practices.Unity;
using System.Web.Http;
using Unity.WebApi;
using Resolver;


namespace LicenseeAPI
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
			var container = BuildUnityContainer();
            
            GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);
        }

        private static IUnityContainer BuildUnityContainer()
        {
            var container = new UnityContainer();

            RegisterTypes(container);

            return container;
        }

        public static void RegisterTypes(IUnityContainer container)
        {

            //Component initialization via MEF
            ComponentLoader.LoadContainer(container, ".\\bin", "LicenseeAPI.dll");
            ComponentLoader.LoadContainer(container, ".\\bin", "LicenseeBusiness.dll");

        }
    }
}