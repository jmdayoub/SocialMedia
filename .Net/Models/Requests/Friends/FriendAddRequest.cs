using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Friends
{
    public class FriendAddRequest
    {
        [Required]
        [MinLength(2)]
        [MaxLength(120)]
        public string Title { get; set; }
        [Required]
        [MinLength(2)]
        [MaxLength(700)]
        public string Bio { get; set; }
        [Required]
        [MinLength(2)]
        [MaxLength(255)]
        public string Summary { get; set; }
        [Required]
        [MinLength(2)]
        [MaxLength(80)]
        public string Headline { get; set; }
        [Required]
        [MinLength(2)]
        [MaxLength(100)]
        public string Slug { get; set; }
        [Required]
        [Range(1, 4)]
        public int StatusId { get; set; }
        [Required]
        [MinLength(2)]
        [MaxLength(128)]
        public string PrimaryImageUrl { get; set; }
        public int UserId { get; set; }
    }
}
