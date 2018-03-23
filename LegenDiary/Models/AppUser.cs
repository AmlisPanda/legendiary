using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace LegenDiary.Models
{
    [Table("APPUSER")]
    public class AppUser
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key, Column(Order = 0)]
        [Required]
        [DisplayName("AppUserId")]
        public int AppUserId { get; set; }

        [MaxLength(200)]
        [Required]
        [DisplayName("AppUserLogin")]
        public string AppUserLogin { get; set; }

        [MaxLength(200)]
        [Required]
        [DisplayName("Email")]
        public string Email { get; set; }

        [MaxLength(500)]
        [Required]
        [DisplayName("EncryptedPassword")]
        public string EncryptedPassword { get; set; }

        [DisplayName("SubscriptionDate")]
        public DateTimeOffset SubscriptionDate { get; set; }

        [DisplayName("LastConnection")]
        public DateTimeOffset LastConnection { get; set; }


    }
}
