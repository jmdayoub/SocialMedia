﻿using Sabio.Models.Domain.Images;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Friends
{
    public class FriendAddRequestV3
    {
        [Required]
        public string Title { get; set; }
        [Required]
        public string Bio { get; set; }
        [Required]
        public string Summary { get; set; }
        [Required]
        public string Headline { get; set; }
        [Required]
        public string Slug { get; set; }
        [Required]
        [Range(1, 4)]
        public int StatusId { get; set; }
        [Required]
        [Range(1, 10)]
        public int ImageTypeId { get; set; }
        [Required]
        public string ImageUrl { get; set; }
        public List<string> Skills { get; set; }
    }
}
