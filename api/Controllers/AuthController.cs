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

        const string SessionKeyName = "_Name";
        const string SessionKeyYearsMember = "_YearsMember";
        const string SessionKeyDate = "_Date";

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

      /*   public IActionResult Index()
        {
            const string sessionKey = "FirstSeen";
            DateTime dateFirstSeen;
            var value = HttpContext.Session.GetString(sessionKey);
            if (string.IsNullOrEmpty(value))
            {
                dateFirstSeen = DateTime.Now;
                var serialisedDate = JsonConvert.SerializeObject(dateFirstSeen);
                HttpContext.Session.SetString(sessionKey, serialisedDate);
            }
            else
            {
                dateFirstSeen = JsonConvert.DeserializeObject<DateTime>(value);
            }

            var model = new SessionStateViewModel
            {
                DateSessionStarted = dateFirstSeen,
                Now = DateTime.Now
            };

            return View(model);
        } */


        [HttpPost]
        public IActionResult Auth([FromBody] Creds cred)
        {
            var testHash = hasher(cred.Password);


            if (_context.AuthenticateEmployee(cred))
            {
                _logger.LogInformation("Employee authenticated");
                return Ok("ok");

            }
            else
            {
                _logger.LogWarning("invalid logg inn attempt");
                return BadRequest("invalid credentials");
            }

        }
    }
}