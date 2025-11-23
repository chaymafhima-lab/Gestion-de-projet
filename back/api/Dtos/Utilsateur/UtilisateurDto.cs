namespace api.Dtos.Utilisateur
{
    public class UtilisateurDto
    {
        public int Id { get; set; }
        public string Nom { get; set; }= string.Empty;
        public string Prenom { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public DateOnly Date_creation { get; set; }
        public string Role { get; set; } = string.Empty;
        public string Niveau { get; set; } = string.Empty;
    }
}