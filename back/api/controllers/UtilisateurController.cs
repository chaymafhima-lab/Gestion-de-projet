using System.Xml.Serialization;
using api.Data;
using api.Dtos.Utilisateur;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/Utilisateur")]
    [ApiController]
    public class UtilisateurController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        public UtilisateurController(ApplicationDBContext context)
        {
            _context = context;
        }
        [HttpGet]
        public IActionResult GetAll()
        {
            var Utilisateurs = _context.Utilisateurs.ToList()
             .Select(s => s.ToUtilisateurDto());

            return Ok(Utilisateurs);
        }
        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute] int id)
        {
            var Utilisateur = _context.Utilisateurs.Find(id);

            if (Utilisateur == null)
            {
                return NotFound();
            }
            return Ok(Utilisateur.ToUtilisateurDto());
        }
        [HttpPost]
        public IActionResult Create([FromBody] CreateUtilisateurRequestDto utilisateurDto)
        {
            var utilisateurModel = utilisateurDto.ToUtilisateurFromCreateDTO();
            _context.Utilisateurs.Add(utilisateurModel);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetById), new { id = utilisateurModel.Id }, utilisateurModel.ToUtilisateurDto());
        }
        [HttpPut]
        [Route("{id}")]
        public IActionResult update([FromRoute] int id, [FromBody] UpdateUtilisateurRequestDto updateDto)
        {
            var utilisateurModel = _context.Utilisateurs.FirstOrDefault(x => x.Id == id);
            if (utilisateurModel == null)
            {
                return NotFound();
            }
            utilisateurModel.Nom = updateDto.Nom;
            utilisateurModel.Prenom = updateDto.Prenom;
            utilisateurModel.Email = updateDto.Email;
            utilisateurModel.Date_creation = updateDto.Date_creation;
            utilisateurModel.Role = updateDto.Role;
            utilisateurModel.Niveau = updateDto.Niveau;

            _context.SaveChanges();

            return Ok(utilisateurModel.ToUtilisateurDto());

        }
        [HttpPatch("{id}")]
        public async Task<IActionResult> Patch(int id, [FromBody] JsonPatchDocument<UpdateUtilisateurRequestDto> patchDoc)
        {
            if (patchDoc == null)
            {
                return BadRequest("Patch document is required");
            }

            // find existing project
            var utilisateur = await _context.Utilisateurs.FindAsync(id);
            if (utilisateur == null)
            {
                return NotFound();
            }

            // map entity -> DTO
            var utilisateurToPatch = new UpdateUtilisateurRequestDto
            {
                Nom = utilisateur.Nom,
                Prenom = utilisateur.Prenom,
                Email = utilisateur.Email,
                Role = utilisateur.Role,
                Niveau = utilisateur.Niveau,
                Date_creation = utilisateur.Date_creation
            };

            // apply patch to DTO
            try
            {
                patchDoc.ApplyTo(utilisateurToPatch, ModelState);
            }
            catch (Exception ex)
            {
                return BadRequest($"Invalid patch operation: {ex.Message}");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Validate the patched model
            if (!TryValidateModel(utilisateurToPatch))
            {
                return BadRequest(ModelState);
            }

            // update entity with patched values
            utilisateur.Nom = utilisateurToPatch.Nom;
            utilisateur.Prenom = utilisateurToPatch.Prenom;
            utilisateur.Email = utilisateurToPatch.Email;
            utilisateur.Role = utilisateurToPatch.Role;
            utilisateur.Niveau = utilisateurToPatch.Niveau;
            utilisateur.Date_creation = utilisateurToPatch.Date_creation;

            await _context.SaveChangesAsync();

            return Ok(utilisateur.ToUtilisateurDto());
        }
        [HttpDelete]
        [Route("{id}")]
        public IActionResult Delete([FromRoute] int id)
        {
            var utilisateurModel = _context.Utilisateurs.FirstOrDefault(x => x.Id == id);

            if (utilisateurModel == null)
            {
                return NotFound();
            }
            _context.Utilisateurs.Remove(utilisateurModel);
            _context.SaveChanges();

            return NoContent();
        }
    }
}