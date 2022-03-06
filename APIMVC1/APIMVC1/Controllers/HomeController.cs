using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace APIMVC1.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
   
        private static async Task<string> ProcessRepositories(string movieTitle)
        {
            var movieList = "";
            var url = "http://www.omdbapi.com/?s="+ movieTitle + "&apikey=3f66eca5";
            using (var client = new HttpClient())
            {
                var response = await client.GetAsync(url);
                var result = await response.Content.ReadAsStringAsync();
                movieList = result;
            }
            return movieList;
        }

            public async Task<ActionResult> CallAPIAsync(string searchValue)
        {
            var result = await ProcessRepositories(searchValue);
            return Json(result);
        }
    }

}