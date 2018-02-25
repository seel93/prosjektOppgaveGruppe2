using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using api.Models;

namespace api.Controllers
{
    [Route("api/[controller]")]
    public class TestController : Controller
    {
         public IActionResult Index()  
        {  
            TestContext context = HttpContext.RequestServices.GetService(typeof(api.Models.TestContext)) as TestContext;  
            Console.WriteLine(context.GetTest());
  
            return View(context.GetTest());  
        }  
        /* TestEntities db = new TestEntities();

        public IActionResult Index()
        {
            var test = from m in db.Test select m;

            return test.ToList();
        } */
    }
}