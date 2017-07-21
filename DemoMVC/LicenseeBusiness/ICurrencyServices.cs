using System.Collections.Generic;
using BusinessEntities;


namespace LicenseeBusiness
{
    public interface ICurrencyServices
    {
        UserEntity GetUserById(int userId);

        IEnumerable<UserEntity> GetAllUser();
    }
}
