using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using api.Models;

namespace api.Controllers
{
    [Route("api/[controller]")]
    public class EmployeeController : Controller
    {
        private readonly EmployeeContext _context;
       public EmployeeController(EmployeeContext context)
       {
           _context = context;
       }


        [HttpGet]
         public IActionResult Index()  
        {  
            return Ok(_context.GetEmployee());  
        }  

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            _context.GetEmployeeById(id);
            if(_context.GetEmployeeById(id) == null){
                return BadRequest();
            }
            else
            {
                return Ok(_context.GetEmployeeById(id));
            }
        }
        [HttpPost]
        public IActionResult Create([FromBody] Employee Employee)
        {
            _context.postEmployee(Employee);
            if(Employee == null){
                return BadRequest();
            }
            else
            {
                return Ok("Data created");
            }
        }


        [HttpDelete("{id}")]
        public IActionResult DeleteById(int id)
        {
            _context.deleteEmployee(id);
            return Ok("Data was deleted");
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Employee Employee)
        {

            _context.UpdateEmployee(id, Employee);
            return Ok("object updated");
        }

        
    }
}
