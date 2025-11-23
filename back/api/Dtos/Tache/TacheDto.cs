namespace api.Dtos.Tache
{
    public class TacheDto
    {
        public int Id { get; set; }
        public string Titre { get; set; } = string.Empty;
        public string Assignement { get; set; } = string.Empty;
        public string Statut { get; set; } = string.Empty;
        public DateTime Date_limite { get; set; }
    }
}