using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace LegenDiary.Models
{
    [DataContract]
    public class GridLayout
    {
        [DataMember(Name = "lg")]
        public WidgetPosition[] Positions { get; set; }
    }
}
