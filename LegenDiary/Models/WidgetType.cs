using System;
using System.Collections.Generic;

namespace LegenDiary.Models
{
    public partial class WidgetType
    {
        public WidgetType()
        {
            Widget = new HashSet<Widget>();
        }

        public int WidgetTypeId { get; set; }
        public string Label { get; set; }

        public ICollection<Widget> Widget { get; set; }
    }
}
