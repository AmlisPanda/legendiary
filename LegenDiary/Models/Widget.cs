using System;
using System.Collections.Generic;

namespace LegenDiary.Models
{
    public partial class Widget
    {
        public int WidgetId { get; set; }
        public DateTimeOffset? WidgetDate { get; set; }
        public string Title { get; set; }
        public string Subtitle { get; set; }
        public bool? IsFavourite { get; set; }
        public string WidgetData { get; set; }
        public int WidgetTypeId { get; set; }
        public int AppuserId { get; set; }

        public Appuser Appuser { get; set; }
        public WidgetType WidgetType { get; set; }
    }
}
