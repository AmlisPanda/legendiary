using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LegenDiary.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace LegenDiary.Controllers
{
    [Produces("application/json")]
    [Route("api/Widgets")]
    public class WidgetsController : Controller
    {
        private IConfiguration _configuration;
        private readonly ILogger _logger;

        public WidgetsController(IConfiguration Configuration, ILogger<WidgetsController> logger)
        {
            _configuration = Configuration;
            _logger = logger;
        }

        // GET: api/Widgets
        [HttpGet]
        [Route("User/{id}/{dt}")]
        public WidgetsResponse GetUserWidgets(int id, DateTimeOffset dt)
        {
            WidgetsResponse res = new WidgetsResponse(false);
            try
            {
                res = Widget.GetUserWidgets(_configuration, id, dt.ToString("yyyy-MM-dd"));
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Failed getting widgets of user {id}");
            }
            
            return res;
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

        [HttpGet]
        [Route("ListItems/{id}")]
        public Response GetListItems(int id)
        {
            return Widget.GetListWidgetItems(_configuration, id);
        }

        [HttpPost]
        [Route("EditLayout")]
        public Response EditLayout([FromBody]WidgetPosition[] positions)
        {
            return Widget.SaveLayout(_configuration, positions);
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
