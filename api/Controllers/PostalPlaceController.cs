using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using api.Models;

namespace api.Controllers
{
    [Route("api/[controller]")]
    public class PostalPlaceController : Controller
    {
        private readonly PostalPlaceContext _context;
       public PostalPlaceController(PostalPlaceContext context)
       {
           _context = context;
       }


        [HttpGet]
         public IActionResult Index()  
        {  
            return Ok(_context.GetPostalPlace());  
        }  

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            if(_context.GetPostalPlace(id) == null){
                return BadRequest("No postal place found by that id");
            }
            else
            {
                return Ok(_context.GetPostalPlace(id));
            }
        }
        
        [HttpPost]
        public IActionResult Create([FromBody] PostalPlace PostalPlace)
        {
            if(PostalPlace == null){
                return BadRequest();
            }
            else
            {
                _context.postPostalPlace(PostalPlace);
                return Ok("Data created");
            }
        }


        [HttpDelete("{id}")]
        public IActionResult DeleteById(int id)
        {
            _context.deletePostalPlace(id);
            return Ok("Data was deleted");
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] PostalPlace PostalPlace)
        {

            _context.UpdatePostalPlace(id, PostalPlace);
            return Ok("object updated");
        }

        
    }
}
