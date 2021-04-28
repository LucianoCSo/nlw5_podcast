using System.Collections.Generic;
using System.Threading.Tasks;
using WebApiPodcast.Data;

namespace WebApiPodcast.Repository.Interface
{
    public interface IEpisodeRepository
    {
        Task<IEnumerable<Episodes>> ListarEpisodios();
    }
}
