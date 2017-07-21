using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessEntities
{
    public class UserEntity
    {
        public int Id { get; set; }

        public string UserName { get; set; }

        public string PassWord { get; set; }

        public bool IsActive { get; set; }

        public string Permissions { get; set; }

        public string Currencies { get; set; }

        public string Email { get; set; }

    }
}
