using Sabio.Models.Domain.TechCompanies;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Jobs
{
    public class JobAddRequest
    {
        [Required]
        public string Title { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public string Summary { get; set; }
        [Required]
        public string Pay { get; set; }
        [Required]
        public string Slug { get; set; }
        [Required]
        public int StatusId { get; set; }
        [Required]
        public int TechCompanyId { get; set; }
        [Required]
        public List<string> Skills { get; set; }

    }
}
