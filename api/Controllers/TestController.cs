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
        private readonly TestContext _context;
       public TestController(TestContext context)
       {
           _context = context;
       }


        [HttpGet]
         public IActionResult Index()  
        {  
            return Ok(_context.GetTest());  
        }  

        [HttpPost]
        public IActionResult Create([FromBody] Test test)
        {
            _context.postTest(test);
            if(test == null){
                return BadRequest();
            }
            else
            {
                return Ok("Data created");
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            _context.GetTest(id);
            if(_context.GetTest(id) == null){
                return BadRequest();
            }
            else
            {
                return Ok(_context.GetTest(id));
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteById(int id)
        {
            _context.deleteTest(id);
            return Ok("Data was deleted");
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Test test)
        {

            _context.UpdateTest(id, test);
            return Ok("object updated");
        }

        [HttpPost("{auth}")]
        public IActionResult Auth([FromBody] Creds cred)
        {

            if(_context.Authenticate(cred))
            {
                return Ok("user authenticated");

            }
            else 
            {
                return BadRequest("invalid credentials");
            }
        }
    }
}
