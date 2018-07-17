using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LegenDiary.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace LegenDiary.Controllers
{
    [Produces("application/json")]
    [Route("api/Widgets")]
    public class WidgetsController : Controller
    {
        private IConfiguration _configuration;

        public WidgetsController(IConfiguration Configuration)
        {
            _configuration = Configuration;
        }

        // GET: api/Widgets
        [HttpGet]
        [Route("User/{id}")]
        public WidgetsResponse GetUserWidgets(int id)
        {
            return Widget.GetUserWidgets(_configuration, id);
        }

        // GET: api/Widgets/5
        [HttpGet("{id}", Name = "GetWidget")]
        public string Get(int id)
        {
            return "value";
        }
        
        // POST: api/Widgets
        [HttpPost]
        [Route("Save")]
        public Response Post([FromBody]Widget w)
        {
            return w.Save(_configuration);
        }

        [HttpPost]
        [Route("EditLayout")]
        public Response EditLayout([FromBody]WidgetLayout[] lg)
        {
            return Widget.SaveLayout(_configuration, lg);
        }

        // PUT: api/Widgets/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }
        
        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public Response Delete(int id, int userId)
        {
            return Widget.Delete(_configuration, id);
        }
    }
}
