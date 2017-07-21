using System.Collections.Generic;
using BusinessEntities;


namespace LicenseeBusiness
{
    public interface IUserServices
    {
        int Authenticate(string userName, string password);

        UserEntity GetUserById(int userId);

        IEnumerable<UserEntity> GetAllUser();

        int AddUser(UserEntity user);

        bool UpdateUserInfo(UserEntity user);


    }
}
