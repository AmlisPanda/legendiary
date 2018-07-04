﻿using LegenDiary.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace LegenDiary
{
    [DataContract]
    public class Response
    {
        [DataMember]
        public bool Success { get; set; }
        [DataMember]
        public string Message { get; set; }

        public Response(bool success, string message = "")
        {
            Success = success;
            Message = message;
        }
    }

    [DataContract]
    public class LoginResponse : Response
    {
        [DataMember]
        public User UserData { get; set; }

        public LoginResponse(bool success, string message = "") : base(success, message)
        {
        }
    }

    [DataContract]
    public class WidgetsResponse : Response
    {
        [DataMember]
        public List<Widget> WidgetsList { get; set; }

        public WidgetsResponse(bool success, string message = "") : base(success, message)
        {
        }
    }
}
