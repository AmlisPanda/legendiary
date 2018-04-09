using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace LegenDiary.Models
{

    [ModelBinder(BinderType = typeof(AppUserModelBinder))]
    public partial class Appuser
    {
        public Appuser()
        {
            Widget = new HashSet<Widget>();
        }

        public int AppuserId { get; set; }
        public string AppuserLogin { get; set; }
        public string Email { get; set; }
        public DateTimeOffset? SubscriptionDate { get; set; }
        public DateTimeOffset? LastConnection { get; set; }

        private string _encryptedPassword;
        public string EncryptedPassword {
            get => _encryptedPassword;
            set => _encryptedPassword = value; }

        public ICollection<Widget> Widget { get; set; }
        
    }
}
