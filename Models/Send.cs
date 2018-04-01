using System;
using System.ComponentModel.DataAnnotations;

namespace LabasanCryptoFountain.Models
{
    public class Send
    {
        public int ID { get; set; }

        [Required]
        public string Address { get; set; }

        [Required]
        public string TokenName { get; set; }

        [Required]
        public decimal Amount { get; set; }
    }
}