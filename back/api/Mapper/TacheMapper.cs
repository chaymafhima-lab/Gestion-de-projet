using System.ComponentModel.DataAnnotations;
using api.Dtos.Tache;
using api.Models;
using Microsoft.AspNetCore.Identity;

namespace api.Mappers
{
    public static class TacheMapper
    {
        public static TacheDto ToTacheDto(this Tache tacheModel)
        {
            return new TacheDto
            {
                Id = tacheModel.Id,
                Titre = tacheModel.Titre,
                Assignement = tacheModel.Assignement,
                Statut = tacheModel.Statut,
                Date_limite = tacheModel.Date_limite



            };
        }
        public static Tache ToTacheFromCreateDTO(this CreateTacheRequestDto tacheDto)
        {
            return new Tache
            {
                Titre = tacheDto.Titre,
                Assignement = tacheDto.Assignement,
                Statut = tacheDto.Statut,
                Date_limite = tacheDto.Date_limite

            };
        }
    }
}