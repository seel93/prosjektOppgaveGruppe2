using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using api.Models;
using api.models;

namespace api.Controllers
{
    [Route("api/[controller]")]
    public class OrderByUserController : Controller
    {
        private readonly OrderContext _context;
        private readonly BikeAndOrderContext second_context;

        public OrderByUserController(OrderContext context, BikeAndOrderContext context2)
        {
            _context = context;
            second_context = context2;
        }

        [HttpGet("{id}")]
        public IActionResult GetOrder(int id)
        {
            return Ok(second_context.GetEquipmentByOrder(id));
        }

        [HttpPost]
        public IActionResult GetOrdersForUser([FromBody] OrderByUser order)
        {
            return Ok(_context.getOrderByUserId(order));
        }
    }
}