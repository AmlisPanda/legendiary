using Microsoft.AspNetCore.Mvc.ModelBinding;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace LegenDiary.Models
{
    public class AppUserModelBinder : IModelBinder
    {
        public Task BindModelAsync(ModelBindingContext bindingContext)
        {
            if (bindingContext == null)
                throw new ArgumentNullException(nameof(bindingContext));

            string valueFromBody = string.Empty;

            using (var sr = new StreamReader(bindingContext.HttpContext.Request.Body))
            {
                valueFromBody = sr.ReadToEnd();
            }

            if (string.IsNullOrEmpty(valueFromBody))
            {
                return Task.CompletedTask;
            }

            //JToken tok = JObject.Parse(valueFromBody).First;
            //if (tok["Name"] == "AppUserLogin")
            //{

            //}
            string values = Convert.ToString(((JValue)JObject.Parse(valueFromBody)["value"]).Value);

            //var splitData = values.Split(new char[] { '|' });
            //if (splitData.Length >= 2)
            //{
            //    var result = new User1
            //    {
            //        Id = Convert.ToInt32(splitData[0]),
            //        Name = splitData[1]
            //    };
            //    bindingContext.Result = ModelBindingResult.Success(result);
            //}

            return Task.CompletedTask;
        }
    }
}
