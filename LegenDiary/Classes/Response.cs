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
        public int UserId { get; set; }

        public LoginResponse(bool success, string message = "") : base(success, message)
        {
        }
    }
}
