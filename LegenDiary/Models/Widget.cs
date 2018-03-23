using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace LegenDiary.Models
{
    [Table("WIDGET")]
    public class Widget
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key, Column(Order = 0)]
        [Required]
        [DisplayName("WidgetId")]
        public int WidgetId { get; set; }

        [Required]
        [DisplayName("WidgetDate")]
        public DateTimeOffset WidgetDate { get; set; }

        [MaxLength(500)]
        [Required]
        [DisplayName("Title")]
        public string Title { get; set; }

        [MaxLength(500)]
        [DisplayName("Subtitle")]
        public string Subtitle { get; set; }

        [DisplayName("IsFavourite")]
        public bool IsFavourite { get; set; }

        [MaxLength(4000)]
        [DisplayName("WidgetData")]
        public string WidgetData { get; set; }

        [Key, Column(Order = 1)]
        [Required]
        [DisplayName("WidgetTypeId")]
        public int WidgetTypeId{ get; set; }

        [Key, Column(Order = 2)]
        [Required]
        [DisplayName("AppUserId")]
        public int AppUserId { get; set; }
    }
}
