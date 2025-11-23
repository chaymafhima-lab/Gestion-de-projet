using System.ComponentModel.DataAnnotations;
using api.Dtos.Utilisateur;
using api.Models;
using Microsoft.AspNetCore.Identity;

namespace api.Mappers
{
    public static class UtilisateurMapper
    {
        public static UtilisateurDto ToUtilisateurDto(this Utilisateur utilisateurModel)
        {
            return new UtilisateurDto
            {
                Id = utilisateurModel.Id,
                Nom = utilisateurModel.Nom,
                Prenom = utilisateurModel.Prenom,
                Email = utilisateurModel.Email,
                Date_creation = utilisateurModel.Date_creation,
                Role = utilisateurModel.Role,
                Niveau = utilisateurModel.Niveau


            };
        }
        public static Utilisateur ToUtilisateurFromCreateDTO(this CreateUtilisateurRequestDto utilisateurDto)
        {
            return new Utilisateur
            {
                Nom = utilisateurDto.Nom,
                Prenom = utilisateurDto.Prenom,
                Email = utilisateurDto.Email,
                Date_creation = utilisateurDto.Date_creation,
                Role = utilisateurDto.Role,
                Niveau = utilisateurDto.Niveau

            };
        }
    }
}