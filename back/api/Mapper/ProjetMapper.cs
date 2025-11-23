using System.ComponentModel.DataAnnotations;
using api.Dtos.Projet;
using api.Models;
using Microsoft.AspNetCore.Identity;

namespace api.Mappers
{
    public static class ProjetMapper
    {
        public static ProjetDto ToProjetDto(this Projet projetModel)
        {
            return new ProjetDto
            {
                Id = projetModel.Id,
                Membre = projetModel.Membre,
                Titre = projetModel.Titre,
                Description = projetModel.Description,
                Statut = projetModel.Statut,
                Date_creation = projetModel.Date_creation



            };
        }
        public static Projet ToProjetFromCreateDTO(this CreateProjetRequestDto projetDto)
        {
            return new Projet
            {
                Titre = projetDto.Titre,
                Membre = projetDto.Membre,
                Description = projetDto.Description,
                Statut = projetDto.Statut,
                Date_creation = projetDto.Date_creation
            };
        }
    }
}