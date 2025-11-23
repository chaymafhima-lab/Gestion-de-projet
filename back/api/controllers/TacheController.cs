using System.Xml.Serialization;
using api.Data;
using api.Dtos.Tache;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/Tache")]
    [ApiController]
    public class TacheController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        public TacheController(ApplicationDBContext context)
        {
            _context = context;
        }
        [HttpGet]
        public IActionResult GetAll()
        {
            var Taches = _context.Taches.ToList()
             .Select(s => s.ToTacheDto());

            return Ok(Taches);
        }
        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute] int id)
        {
            var Tache = _context.Taches.Find(id);

            if (Tache == null)
            {
                return NotFound();
            }
            return Ok(Tache.ToTacheDto());
        }
        [HttpPost]
        public IActionResult Create([FromBody] CreateTacheRequestDto tacheDto)
        {
            var tacheModel = tacheDto.ToTacheFromCreateDTO();
            _context.Taches.Add(tacheModel);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetById), new { id = tacheModel.Id }, tacheModel.ToTacheDto());
        }
        [HttpPut]
        [Route("{id}")]
        public IActionResult update([FromRoute] int id, [FromBody] UpdateTacheRequestDto updateDto)
        {
            var tacheModel = _context.Taches.FirstOrDefault(x => x.Id == id);
            if (tacheModel == null)
            {
                return NotFound();
            }
            tacheModel.Titre = updateDto.Titre;
            tacheModel.Assignement = updateDto.Assignement;
            tacheModel.Statut = updateDto.Statut;
            tacheModel.Date_limite = updateDto.Date_limite;

            _context.SaveChanges();

            return Ok(tacheModel.ToTacheDto());

        }
        [HttpPatch("{id}")]
        public async Task<IActionResult> Patch(int id, [FromBody] JsonPatchDocument<UpdateTacheRequestDto> patchDoc)
        {
            if (patchDoc == null)
            {
                return BadRequest("Patch document is required");
            }

            // find existing project
            var tache = await _context.Taches.FindAsync(id);
            if (tache == null)
            {
                return NotFound();
            }

            // map entity -> DTO
            var tacheToPatch = new UpdateTacheRequestDto
            {
                Titre = tache.Titre,
                Assignement = tache.Assignement,
                Statut = tache.Statut,
                Date_limite = tache.Date_limite
            };

            // apply patch to DTO
            try
            {
                patchDoc.ApplyTo(tacheToPatch, ModelState);
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
            if (!TryValidateModel(tacheToPatch))
            {
                return BadRequest(ModelState);
            }

            // update entity with patched values
            tache.Titre = tacheToPatch.Titre;
            tache.Assignement = tacheToPatch.Assignement;
            tache.Statut = tacheToPatch.Statut;
            tache.Date_limite = tacheToPatch.Date_limite;

            await _context.SaveChangesAsync();

            return Ok(tache.ToTacheDto());
        }
        
        [HttpDelete]
        [Route("{id}")]
        public IActionResult Delete([FromRoute] int id)
        {
            var tacheModel = _context.Taches.FirstOrDefault(x => x.Id == id);

            if (tacheModel == null)
            {
                return NotFound();
            }
            _context.Taches.Remove(tacheModel);
            _context.SaveChanges();

            return NoContent();
        }
    }
}