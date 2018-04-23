using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using api.Models;

namespace api.Controllers
{
    [Route("api/[controller]")]
    public class BikeController : Controller
    {
        private readonly BikeContext _context;
       public BikeController(BikeContext context)
       {
           _context = context;
       }


        [HttpGet]
         public IActionResult Index()  
        {  
            return Ok(_context.GetBike());  
        }  

        [HttpPost]
        public IActionResult Create([FromBody] Bike Bike)
        {
            _context.postBike(Bike);
            if(Bike == null){
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
            _context.GetBike(id);
            if(_context.GetBike(id) == null){
                return BadRequest();
            }
            else
            {
                return Ok(_context.GetBike(id));
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteById(int id)
        {
            _context.deleteBike(id);
            return Ok("Data was deleted");
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Bike Bike)
        {
            _context.UpdateBike(id, Bike);
            return Ok("object updated");
        }

        [HttpPut("{id}")]
        public IActionResult UpdateStatus(int id, int STATUS)
        {
            _context.UpdateBikeStatus(id, STATUS);
            return Ok("object updated");
        }

        [HttpGet("{id}")]
        public IActionResult GetBikeStatusAsString(int id)
        {
            _context.GetBikeStatusAsString(id);
            if(_context.GetBikeStatusAsString(id) == null)
            {
                return BadRequest();
            }
            else
            {
                return Ok(_context.GetBikeStatusAsString(id));
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetBikeStatusAsString(Bike bike)
        {
            _context.GetBikeStatusAsString(bike);
            if(_context.GetBikeStatusAsString(bike) == null)
            {
                return BadRequest();
            }
            else
            {
                return Ok(_context.GetBikeStatusAsString(bike));
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetBikeStatusAsInt(Bike bike)
        {
            _context.GetBikeStatusAsInt(bike);
            if(_context.GetBikeStatusAsInt(bike) == null)
            {
                return BadRequest();
            }
            else
            {
                return Ok(_context.GetBikeStatusAsInt(bike));
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetBikeStatusAsInt(int id)
        {
            _context.GetBikeStatusAsInt(id);
            if(_context.GetBikeStatusAsInt(id) == null)
            {
                return BadRequest();
            }
            else
            {
                return Ok(_context.GetBikeStatusAsInt(id));
            }
        } 
    }
}
