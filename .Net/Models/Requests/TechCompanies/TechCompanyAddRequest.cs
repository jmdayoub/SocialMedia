using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.TechCompanies
{
    public class TechCompanyAddRequest
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Profile { get; set; }
        [Required]
        public string Summary { get; set; }
        [Required]
        public string Headline { get; set; }
        [Required]
        public string ContactInformation { get; set; }
        [Required]
        public string Slug { get; set; }
        [Required]
        public int StatusId { get; set; }
        [Required]
        public int ImageTypeId { get; set; }
        [Required]
        public string ImageUrl { get; set; }
    }
}
