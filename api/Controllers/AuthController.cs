using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;
using System.Security.Cryptography;
using System.Text;
using api.Models;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace api
{
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly CredContext _context;
        private readonly ILogger _logger;


        public AuthController(CredContext context, ILogger<AuthController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpPost]
        public IActionResult Auth([FromBody] Creds cred, [FromHeader] string options)
        {
            string value = Request.Headers["Authorization"];
            if (value != "{'firstName':'John', 'lastName':'Doe'}")
            {
                _logger.LogError("invalid auht token");
                return BadRequest("Invali auth token");
            }
            else
            {

                if (!cred.IsEmployee)
                {
                    if (_context.Authenticate(cred) != null)
                    {
                        _logger.LogInformation("Customer authenticated");
                        return Ok(_context.Authenticate(cred));

                    }
                    else
                    {
                        _logger.LogWarning("invalid logg inn attempt");
                        return BadRequest("invalid credentials");
                    }
                }
                else
                {
                    if (_context.AuthenticateEmployee(cred) != null)
                    {
                        _logger.LogInformation("Employee authenticated");
                        return Ok(_context.AuthenticateEmployee(cred));

                    }
                    else
                    {
                        _logger.LogWarning("invalid logg inn attempt");
                        return BadRequest("invalid credentials");
                    }
                }
            }

        }
    }
}