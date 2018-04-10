using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LegenDiary.Controllers
{
    public class UserHomeController : Controller
    {
        // GET: UserHome
        public ActionResult Index()
        {
            return View();
        }

        // GET: UserHome/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: UserHome/Create
        public ActionResult Create()
        {
            return View();
        }


        // GET: UserHome/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: UserHome/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

 
    }
}