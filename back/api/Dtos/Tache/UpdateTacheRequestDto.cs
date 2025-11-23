namespace api.Dtos.Tache
{
    public class UpdateTacheRequestDto
    {
        public string Titre { get; set; } = string.Empty;
        public string Assignement { get; set; } = string.Empty;
        public string Statut { get; set; } = string.Empty;
        public DateTime Date_limite { get; set; }
    }
}