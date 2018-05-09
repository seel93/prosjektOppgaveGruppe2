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

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            if (_context.GetBike(id).Count() == 0)
            {
                return BadRequest("No Data found");
            }
            else
            {
                return Ok(_context.GetBike(id));
            }
        }

        [HttpPost]
        public IActionResult Create([FromBody] Bike Bike)
        {
            if (Bike == null)
            {
                return BadRequest();
            }
            else
            {
                _context.postBike(Bike);
                return Ok("Data created");
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

        //-------------------------------------------------------------------------//
        // //Dont need these for now

        //     [HttpPut("{id}")]
        //     public IActionResult UpdateStatus(int bike_id, string STATUS)
        //     {
        //         _context.UpdateBikeStatus(bike_id, STATUS);
        //         return Ok("object updated");
        //     }

        //     [HttpGet("{id}")]
        //     public IActionResult GetBikeStatus(int id)
        //     {
        //         _context.GetBikeStatus(id);
        //         if(_context.GetBikeStatus(id) == null)
        //         {
        //             return BadRequest();
        //         }
        //         else
        //         {
        //             return Ok(_context.GetBikeStatus(id));
        //         }
        //     }

        //     [HttpGet("{id}")]
        //     public IActionResult  GetBikeOriginalLocation(int id)
        //     {
        //         _context.GetBikeOriginalLocation(id);
        //         if(_context.GetBikeOriginalLocation(id) == null)
        //         {
        //             return BadRequest();
        //         }
        //         else
        //         {
        //             return Ok(_context.GetBikeOriginalLocation(id));
        //         }
        //     }

        //     [HttpGet("{id}")]
        //     public IActionResult GetBikeLastSeenLocation(int id)
        //     {
        //         _context.GetBikeLastSeenLocation(id);
        //         if(_context.GetBikeLastSeenLocation(id) == null)
        //         {
        //             return BadRequest();
        //         }
        //         else
        //         {
        //             return Ok(_context.GetBikeLastSeenLocation(id));
        //         }
        //     } 
    }
}
