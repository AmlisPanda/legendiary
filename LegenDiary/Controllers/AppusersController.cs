using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LegenDiary.Models;

namespace LegenDiary.Controllers
{
    [Produces("application/json")]
    [Route("api/Appusers")]
    public class AppusersController : Controller
    {
        private readonly LEGENDIARYContext _context;

        public AppusersController(LEGENDIARYContext context)
        {
            _context = context;
        }

        // GET: api/Appusers
        [HttpGet]
        public IEnumerable<Appuser> GetAppuser()
        {
            return _context.Appuser;
        }

        // GET: api/Appusers/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAppuser([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var appuser = await _context.Appuser.SingleOrDefaultAsync(m => m.AppuserId == id);

            if (appuser == null)
            {
                return NotFound();
            }

            return Ok(appuser);
        }

        // PUT: api/Appusers/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAppuser([FromRoute] int id, [FromBody] Appuser appuser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != appuser.AppuserId)
            {
                return BadRequest();
            }

            _context.Entry(appuser).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AppuserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Appusers
        [HttpPost]
        public async Task<IActionResult> PostAppuser([FromBody] Appuser appuser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Appuser.Add(appuser);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAppuser", new { id = appuser.AppuserId }, appuser);
        }

        // DELETE: api/Appusers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAppuser([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var appuser = await _context.Appuser.SingleOrDefaultAsync(m => m.AppuserId == id);
            if (appuser == null)
            {
                return NotFound();
            }

            _context.Appuser.Remove(appuser);
            await _context.SaveChangesAsync();

            return Ok(appuser);
        }

        private bool AppuserExists(int id)
        {
            return _context.Appuser.Any(e => e.AppuserId == id);
        }
    }
}