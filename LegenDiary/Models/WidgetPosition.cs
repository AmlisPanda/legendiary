using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace LegenDiary.Models
{
    [DataContract]
    public class WidgetPosition
    {
        [DataMember(Name = "i")]
        public string Id { get; set; }
        [DataMember(Name = "w")]
        public int Width { get; set; }
        [DataMember(Name = "h")]
        public int Height { get; set; }
        [DataMember(Name = "x")]
        public int X { get; set; }
        [DataMember(Name = "y")]
        public int Y { get; set; }

        public int WidgetId { get { return int.Parse(Id.Split('_')[1]); } }
    }
}
