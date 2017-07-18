using System;
using System.Collections.Generic;

namespace LicenseeAPI.Models
{
    public partial class User
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string PassWord { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public string Permissions { get; set; }
        public string Currencies { get; set; }
    }
}