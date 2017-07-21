using System;
using System.Configuration;
using BusinessEntities;
using DataModel;
using DataModel.UnitOfWork;
using AutoMapper;
using System.Linq;

namespace LicenseeBusiness
{
    class TokenServices : ITokenServices
    {
        private readonly UnitOfWork _unitOfWork;
        public TokenServices(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;

        }

        public bool DeleteByUserId(int userId)
        {
            _unitOfWork.TokenRepository.Delete(x => x.UserId == userId);
            _unitOfWork.Save();

            var isNotDeleted = _unitOfWork.TokenRepository.GetMany(x => x.UserId == userId).Any();
            return !isNotDeleted;
        }

        public TokenEntity GenerateToken(int userId)
        {
            var tokendomain = CreateToken(userId);
            SaveToken(tokendomain);

            Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<Token, TokenEntity>();
            });
            return Mapper.Map<Token, TokenEntity>(tokendomain);

        }

        
        private Token CreateToken(int userId)
        {    
            string authToken = Guid.NewGuid().ToString();
            DateTime issuedOn = DateTime.Now;
            DateTime expiredOn = DateTime.Now.AddSeconds(
                Convert.ToDouble(ConfigurationManager.AppSettings["AuthTokenExpiry"]));
            var token = new Token
            {
                UserId = userId,
                AuthToken = authToken,
                IssuedOn = issuedOn,
                ExpiresOn = expiredOn
            };

            return token;
        }
        private void SaveToken(Token token)
        {
            _unitOfWork.TokenRepository.Insert(token);
            _unitOfWork.Save();
        }

        public bool Kill(string tokenId)
        {
            _unitOfWork.TokenRepository.Delete(x => x.AuthToken == tokenId);
            _unitOfWork.Save();

            var isNotDeleted = _unitOfWork.TokenRepository.GetMany(x => x.AuthToken == tokenId).Any();
            if (isNotDeleted) { return false; }
            return true;
        }

        public bool ValidateToken(string authToken)
        {
            var token = _unitOfWork.TokenRepository.Get(t => t.AuthToken == authToken && t.ExpiresOn > DateTime.Now);

            if(token != null && !(DateTime.Now > token.ExpiresOn))
            {
                token.ExpiresOn = token.ExpiresOn.AddSeconds(
                    Convert.ToDouble(ConfigurationManager.AppSettings["AuthTokenExpiry"]));

                _unitOfWork.TokenRepository.Update(token);
                _unitOfWork.Save();

                return true;
            }

            return false;
        }
    }
}
