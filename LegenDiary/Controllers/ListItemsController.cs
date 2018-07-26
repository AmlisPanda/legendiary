using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LegenDiary.Models.ListWidgets;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace LegenDiary.Controllers
{
    [Produces("application/json")]
    [Route("api/ListItems")]
    public class ListItemsController : Controller
    {
        private IConfiguration _configuration;
        private readonly ILogger _logger;

        public ListItemsController(IConfiguration Configuration, ILogger<WidgetsController> logger)
        {
            _configuration = Configuration;
            _logger = logger;
        }

        // GET: api/ListItems
        [HttpGet("{widgetId}", Name = "Get")]
        public Response GetListItems(int widgetId)
        {
            Response res = new Response(false);
            try
            {
                res = Models.Widget.GetListWidgetItems(_configuration, widgetId);
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"GetListItems for widget {widgetId}");
            }
            return res;
        }

        // POST: api/ListItems
        [HttpPost]
        public ListItemResponse Post([FromBody]Models.ListWidgets.ListItem item)
        {
            ListItemResponse res = new ListItemResponse(false);
            try
            {
                res = item.Save(_configuration);
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Post ListItem");
            }
            return res;
        }

        // PUT: api/ListItems/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }
        
        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public Response Delete(int id)
        {
            Response res = new Response(false);
            try
            {
                res = ListItem.Delete(_configuration, id);
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Delete ListItem {id}");
            }
            return res;
        }
    }
}
