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
        [HttpGet]
         public IActionResult Index()  
        {  
            TestContext context = HttpContext
                .RequestServices
                .GetService(typeof(api.Models.TestContext)) as TestContext;  
            return Ok(context.GetTest());  
        }  

        [HttpPost]
        public IActionResult Create([FromBody] Test test)
        {
            TestContext context = HttpContext
                .RequestServices
                .GetService(typeof(api.Models.TestContext)) as TestContext;
            context.postTest(test);
            if(test == null){
                return BadRequest();
            }
            else
            {
                return Ok();
            }
        }
    }
}
