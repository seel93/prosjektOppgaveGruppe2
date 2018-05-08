using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using api.Models;

namespace api.Controllers
{
    [Route("api/[controller]")]
    public class OrderController : Controller
    {
        private readonly OrderContext _context;
       public OrderController(OrderContext context)
       {
           _context = context;
       }


        [HttpGet]
         public IActionResult Index()  
        {  
            return Ok(_context.GetOrders());  
        }

        [HttpPost]
        public IActionResult Create([FromBody] Order Order)
        {
            if(Order == null){
                return BadRequest("Inlavid Order");
            }
            else
            {
                _context.postOrder(Order);
                return Ok(_context.GetLatestOrderId());
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            _context.GetOrderById(id);
            if(_context.GetOrderById(id) == null){
                return BadRequest();
            }
            else
            {
                return Ok(_context.GetOrderById(id));
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteById(int id)
        {
            _context.deleteOrder(id);
            return Ok("Data was deleted");
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Order Order)
        {

            _context.UpdateOrder(id, Order);
            return Ok("object updated");
        }

        
    }
}
