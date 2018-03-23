using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace LegenDiary.Models
{
    [Table("WIDGET_TYPE")]
    public class WidgetType
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key, Column(Order = 0)]
        [Required]
        [DisplayName("WidgetTypeId")]
        public int WidgetTypeId { get; set; }

        [MaxLength(150)]
        [Required]
        [DisplayName("Label")]
        public string Label { get; set; }
    }
}
