using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using api.Models;

namespace api.Controllers
{
    [Route("api/[controller]")]
    public class StatusController : Controller
    {
        private readonly StatusContext _context;
       public StatusController(StatusContext context)
       {
           _context = context;
       }


        [HttpGet]
         public IActionResult Index()  
        {  
            return Ok(_context.GetStatus());  
        }  

        [HttpPost]
        public IActionResult Create([FromBody] Status Status)
        {
            _context.postStatus(Status);
            if(Status == null){
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
            _context.GetStatus(id);
            if(_context.GetStatus(id) == null)
            {
                return BadRequest();
            }
            else
            {
                return Ok(_context.GetStatus(id));
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteById(int id)
        {
            _context.deleteStatus(id);
            return Ok("Data was deleted");
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Status Status)
        {

            _context.UpdateStatus(id, Status);
            return Ok("object updated");
        }

        
    }
}
