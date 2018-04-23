using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using api.Models;

namespace api.Controllers
{
    [Route("api/[controller]")]
    public class DeliveryController : Controller
    {
        private readonly DeliveryContext _context;
       public DeliveryController(DeliveryContext context)
       {
           _context = context;
       }


        [HttpGet]
         public IActionResult Index()  
        {  
            return Ok(_context.GetDelivery());  
        }  

        [HttpPost]
        public IActionResult Create([FromBody] Delivery Delivery)
        {
            _context.postDelivery(Delivery);
            if(Delivery == null){
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
            _context.GetDelivery(id);
            if(_context.GetDelivery(id) == null){
                return BadRequest();
            }
            else
            {
                return Ok(_context.GetDelivery(id));
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteById(int id)
        {
            _context.deleteDelivery(id);
            return Ok("Data was deleted");
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Delivery Delivery)
        {

            _context.UpdateDelivery(id, Delivery);
            return Ok("object updated");
        }

        
    }
}
