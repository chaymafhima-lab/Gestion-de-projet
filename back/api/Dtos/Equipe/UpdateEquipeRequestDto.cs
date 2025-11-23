namespace api.Dtos.Equipe
{
    public class UpdateEquipeRequestDto
    {
        public string Titre { get; set; } = string.Empty;
    
        public string Description { get; set; } = string.Empty;
    
        public DateTime Date_creation { get; set; }
    }
}