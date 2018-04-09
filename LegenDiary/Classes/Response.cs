using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LegenDiary
{
    public class Response
    {
        public bool Success { get; set; }
        public string Message { get; set; }

        public Response(bool success, string message)
        {
            Success = success;
            Message = message;
        }
    }
}
