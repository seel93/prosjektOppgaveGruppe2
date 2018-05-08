using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using api.Models;

namespace api.Controllers
{
    [Route("api/[controller]")]
    public class CustomerController : Controller
    {
        private readonly CustomerContext _context;
       public CustomerController(CustomerContext context)
       {
           _context = context;
       }


        [HttpGet]
         public IActionResult Index()  
        {  
            return Ok(_context.GetCustomer());  
        }  

        [HttpPost]
        public IActionResult Create([FromBody] Customer Customer)
        {
            if(Customer == null){
                return BadRequest();
            }
            else
            {
                _context.postCustomer(Customer);
                return Ok("Data created");
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            _context.GetCustomerById(id);
            if(_context.GetCustomerById(id) == null){
                return BadRequest();
            }
            else
            {
                return Ok(_context.GetCustomerById(id));
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteById(int id)
        {
            _context.deleteCustomer(id);
            return Ok("Data was deleted");
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Customer Customer)
        {

            _context.UpdateCustomer(id, Customer);
            return Ok("object updated");
        }

        
    }
}
