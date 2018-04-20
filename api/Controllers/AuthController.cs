using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using api.Models;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;


namespace api
{
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly ILogger _logger;
        private readonly TestContext _context;

        public AuthController(TestContext context, ILogger<AuthController> logger)
        {
            _logger = logger;
            _context = context;
        }

        
        [HttpPost]
        public IActionResult Auth([FromBody] Creds cred)
        {

            if(_context.Authenticate(cred))
            {
                _logger.LogInformation("User authenticated");
                return Ok("user authenticated"); 

            }
            else 
            {
                _logger.LogWarning("invalid logg inn attempt");
                return BadRequest("invalid credentials");
            }
        }




    }
}