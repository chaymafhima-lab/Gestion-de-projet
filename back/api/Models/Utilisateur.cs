using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Utilisateur
    {
        public int Id { get; set; }
        public required string Nom { get; set; }
        public string Prenom { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public DateOnly Date_creation { get; set; }
        public string Role { get; set; } = string.Empty;
        public  string Niveau { get; set; } = string.Empty;
    }
}