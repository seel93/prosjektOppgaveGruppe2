using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using api.Models; 

namespace api.Controllers
{
    [Route("api/[controller]")]
    public class BikeAndOrderController : Controller
    {
        private readonly BikeAndOrderContext _context;
        public BikeAndOrderController(BikeAndOrderContext context)
        {
           _context = context;
        }


        [HttpGet]
         public IActionResult Index()  
        {  
            return Ok(_context.GetBikeAndOrder());  
        }  

        [HttpPost]
        public IActionResult Create([FromBody] BikeAndOrder BikeAndOrder)
        {
            _context.postBikeAndOrder(BikeAndOrder);
            if(BikeAndOrder == null){
                return BadRequest();
            }
            else
            {
                return Ok("Data created");
            }
        }

        // [HttpPost]
        // public IActionResult Create([FromBody] BikeAndOrder[] BikeAndOrder)
        // {
        //     foreach(var element in BikeAndOrder)
        //     {
        //         _context.postBikeAndOrder(BikeAndOrder);
        //         if(BikeAndOrder == null)
        //         {
        //             return BadRequest();
        //         }    
        //     }

        //     return Ok("Data created");
        // }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            _context.GetBikeAndOrder(id);
            if(_context.GetBikeAndOrder(id) == null){
                return BadRequest();
            }
            else
            {
                return Ok(_context.GetBikeAndOrder(id));
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteById(int id)
        {
            _context.deleteBikeAndOrder(id);
            return Ok("Data was deleted");
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] BikeAndOrder BikeAndOrder)
        {

            _context.UpdateBikeAndOrder(id, BikeAndOrder);
            return Ok("object updated");
        }

        //----------------------------------------------------------------------------------//
        //----------------------------------------------------------------------------------//
        //----------------------------------------------------------------------------------//
        //don't know 100% where these functions will be

        // // public void CreateCompledeOrder(List<int> bike_ids)
        // // {
        // //     //make it random
        // //     int order_id = 5;

        // //     //inserting values into "utstyr_has_bestilling"
        // //     foreach(var bike_id in bike_ids)
        // //     {
        // //         /* Create(new BikeAndOrder
        // //         {
        // //             Bike_id = bike_id;
        // //             Order_id = order_id;
        // //         })); */

        // //         // // updating status of the each ordered bike/equipment
        // //         // BikeController.UpdateStatus(bike_id...) // //use bike_id here
        // //     } 

        // //     // //inserting one value into "bestilling"
        // //     // OrderController.create(new order {...}) // //use order_id here
            
        // // }

    }
}
