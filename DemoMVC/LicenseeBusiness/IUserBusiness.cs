using System.Collections.Generic;
using BusinessEntities;


namespace LicenseeBusiness
{
    public interface IUserBusiness
    {
        UserEntity Login(string userName, string passWord);

        UserEntity GetUserById(int userId);
        IEnumerable<UserEntity> GetAllUser();



        //List<User> GetUserList();

        //User GetUser();
        
    }
}
