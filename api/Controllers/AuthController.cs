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

       public byte[] hasher(string PasswordToHash)
        {
            byte[] hash;
            var dataForHash = Encoding.UTF8.GetBytes(PasswordToHash);
            using (SHA512 shaM = new SHA512Managed())
            {
                hash = shaM.ComputeHash(dataForHash);
            }

            return hash;
        } 

        [HttpGet]
        public IActionResult testAuth()
        {
            return Ok("auth works");
        }

        [HttpPost]
        public IActionResult Auth([FromBody] Creds cred)
        {
            var testHash = hasher(cred.Password);
            Boolean logginAttempt = _context.AuthenticateEmployee(cred);
            try
            {
             if (logginAttempt)
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
            catch(Exception e)
            {
                _logger.LogWarning(e.ToString());
                return BadRequest(e.ToString());
            }
        } 
    }
}