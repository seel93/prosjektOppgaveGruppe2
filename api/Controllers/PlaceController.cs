using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using api.Models;

namespace api.Controllers
{
    [Route("api/[controller]")]
    public class PlaceController : Controller
    {
        private readonly PlaceContext _context;
       public PlaceController(PlaceContext context)
       {
           _context = context;
       }


        [HttpGet]
         public IActionResult Index()  
        {  
            return Ok(_context.GetPlace());  
        }  

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            _context.GetPlaceById(id);
            if(_context.GetPlaceById(id) == null){
                return BadRequest();
            }
            else
            {
                return Ok(_context.GetPlaceById(id));
            }
        }
        [HttpPost]
        public IActionResult Create([FromBody] Place Place)
        {
            _context.postPlace(Place);
            if(Place == null){
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
            _context.deletePlace(id);
            return Ok("Data was deleted");
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Place Place)
        {

            _context.UpdatePlace(id, Place);
            return Ok("object updated");
        }

        
    }
}
