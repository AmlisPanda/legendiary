﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace LegenDiary.Models.ListWidgets
{
    [DataContract]
    public class ListData
    {
        //[DataMember]
        //public int WidgetId { get; set; }
        [DataMember]
        public int ListType { get; set; }
    }
}
