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

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            if(_context.GetDeliveryById(id).Count() == 0){
                return BadRequest("No data by that Id found");
            }
            else
            {
                return Ok(_context.GetDeliveryById(id));
            }
        }

        [HttpPost]
        public IActionResult Create([FromBody] Delivery Delivery)
        {
            if(Delivery == null){
                return BadRequest("Invalid Delivery");
            }
            else
            {
                _context.postDelivery(Delivery);
                return Ok("Data created");
            }
        }

        // [HttpPost]
        // public IActionResult Create([FromBody] Delivery[] Delivery)
        // {
        //     foreach(var element in Delivery)
        //     {
        //         _context.postDelivery(Delivery);
        //         if(Delivery == null)
        //         {
        //             return BadRequest();
        //         }    
        //     }

        //     return Ok("Data created");
        // }
        


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
