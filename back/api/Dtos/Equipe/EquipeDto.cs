namespace api.Dtos.Equipe
{
    public class EquipeDto
    {
        public int Id { get; set; }
        public string Titre { get; set; } = string.Empty;
    
        public string Description { get; set; } = string.Empty;
    
        public DateTime Date_creation { get; set; }
    }
}