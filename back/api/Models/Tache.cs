using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Tache
    {
        public int Id { get; set; }
        public string Titre { get; set; } = string.Empty;
        public string Assignement { get; set; } = string.Empty;
        public string Statut { get; set; } = string.Empty;
        public DateTime Date_limite { get; set; }
    }
}