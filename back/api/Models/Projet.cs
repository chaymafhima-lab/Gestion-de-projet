using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Projet
    {
        public int Id { get; set; }
        public int Membre { get; set; }
        public string Titre { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;
        public string Statut { get; set; } = string.Empty;
        public DateTime Date_creation { get; set; }
    }
}