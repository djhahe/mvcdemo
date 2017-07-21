using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using BusinessEntities;
using DataModel;
using DataModel.UnitOfWork;
using System;

namespace LicenseeBusiness
{
    public class UserServices : IUserServices
    {
        private readonly UnitOfWork _unitOfWork;
        public UserServices(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<User, UserEntity>();              
            });

            Mapper.AssertConfigurationIsValid();
        }

        public int AddUser(UserEntity userEntity)
        {
            var user = new User
            {
                UserName = userEntity.UserName,
                PassWord = userEntity.PassWord,
                IsActive = userEntity.IsActive,
                Email = userEntity.Email,
                Permissions = string.Empty,
                Currencies = string.Empty
            };

            _unitOfWork.UserRepository.Insert(user);
            _unitOfWork.Save();

            return user.Id;
        }

        public IEnumerable<UserEntity> GetAllUser()
        {
            var users = _unitOfWork.UserRepository.GetAll().ToList();

            return Mapper.Map<List<User>, List<UserEntity>>(users) ;
        }

        public UserEntity GetUserById(int userId)
        {
            var user = _unitOfWork.UserRepository.GetByID(userId);

            return user != null ? Mapper.Map<User, UserEntity>(user) : new UserEntity();
        }

        public int Authenticate(string userName, string password)
        {
            var user = _unitOfWork.UserRepository.Get(u => u.UserName == userName && u.PassWord == password);
            if (user != null && user.Id > 0)
            {
                return user.Id;
            }

            return 0;
        }

        public bool UpdateUserInfo(UserEntity userEntity)
        {
            var success = false;
            if(userEntity != null)
            {
                var user = _unitOfWork.UserRepository.GetByID(userEntity.Id);
                if(user != null)
                {
                    user.Email = userEntity.Email;
                    user.IsActive = userEntity.IsActive;
                    user.PassWord = userEntity.PassWord;
                    user.UserName = userEntity.UserName;
                    user.Currencies = userEntity.Currencies;
                    user.Permissions = userEntity.Permissions;

                    _unitOfWork.UserRepository.Update(user);
                    _unitOfWork.Save();

                    success = true;
                }
            }

            return success;
        }

    }
}
