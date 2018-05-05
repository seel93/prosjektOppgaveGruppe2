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

        public OrderByUserController(OrderContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Index()
        {
            return Ok();
        }

        [HttpPost]
        public IActionResult GetOrdersForUser([FromBody] OrderByUser order)
        {
            return Ok(_context.getOrderByUserId(order));
        }
    }
}