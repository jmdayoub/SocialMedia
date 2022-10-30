using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Images
{
    public class Image
    {
        public int Id { get; set; }

        public int ImageTypeId { get; set; }
           
        public string ImageUrl { get; set; }
        

    }
}
