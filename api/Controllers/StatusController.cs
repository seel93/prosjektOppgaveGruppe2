using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using api.Models;

namespace api.Controllers
{
    [Route("api/[controller]")]
    public class StatusController : Controller
    {
         private readonly BikeContext _context;

         public StatusController(BikeContext context)
         {
             _context = context;
         }

         public IActionResult GetSortedOrFilteredData([FromBody] StatusCriteria data)
         {
             if(data.Criteria == "price")
             {
                 return Ok(_context.GetBikeOrderByHourPrice());
             }
             else if(data.Criteria == "validStatus")
             {
                 return Ok(_context.GetBikeOrderByStatus());
             }
             else if(data.Criteria == "invalidStatus")
             {
                 return Ok(_context.GetBikeOrderByInvalidState());
             }
             else if(data.Criteria == "priceDay")
             {
                 return Ok(_context.GetBikeOrderByDayPrice());
             }
             else
             {
                return BadRequest("invalid criteria");
             }
         }


    }
}