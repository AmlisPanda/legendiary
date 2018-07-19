using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace LegenDiary.Models.ListWidgets
{
    [DataContract]
    public class ListWidgetItem
    {
        [DataMember]
        public string Label { get; set; }
        [DataMember]
        public bool Done { get; set; }
        [DataMember]
        public int Order { get; set; }
        [DataMember]
        public int Note { get; set; }
    }
}
