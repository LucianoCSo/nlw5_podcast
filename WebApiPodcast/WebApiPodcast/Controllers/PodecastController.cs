using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;
using WebApiPodcast.Repository.Interface;

namespace WebApiPodcast.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PodecastController : ControllerBase
    {
        private readonly ILogger<PodecastController> _logger;
        private readonly IEpisodeRepository _episode;

        public PodecastController(ILogger<PodecastController> logger, IEpisodeRepository episode)
        {
            _logger = logger;
            _episode = episode;
        }

        [HttpGet]
        [Route("episodes")]
        public async Task<IActionResult> ListEpisodes()
        {
            try
            {
                var response = await _episode.ListarEpisodios();
                return Ok(response);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao tentar buscar lista de podecast");
                return new StatusCodeResult(500);
            }
        }

        [HttpGet]
        [Route("episodes/{id}")]
        public async Task<IActionResult> ListEpisodes(string id)
        {
            try
            {
                var response = await _episode.ListarEpisodios(id);
                return Ok(response);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao tentar buscar podecast");
                return new StatusCodeResult(500);
            }
        }
    }
}
