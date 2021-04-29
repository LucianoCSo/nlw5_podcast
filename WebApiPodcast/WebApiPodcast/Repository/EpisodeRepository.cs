using Dapper;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using WebApiPodcast.Data;
using WebApiPodcast.Repository.Interface;
using WebApiPodcast.Repository.Scripts;

namespace WebApiPodcast.Repository
{
    public sealed class EpisodeRepository : IEpisodeRepository
    {
        private readonly string _connectionString;

        public EpisodeRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DbConnection");
        }
        public async Task<IEnumerable<Episodes>> ListarEpisodios()
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                try
                {
                    string sql = ScriptsPodecast.sql;
                    var response = await connection.QueryAsync<dynamic>(sql);
                    Slapper.AutoMapper.Configuration.AddIdentifier(typeof(Episodes), "IdEpisodFile");
                    Slapper.AutoMapper.Configuration.AddIdentifier(typeof(FileDet), "IdFile");

                    return Slapper.AutoMapper.MapDynamic<Episodes>(response, false).ToList();
                }
                catch
                {
                    return null;
                }
            }
        }

        public async Task<Episodes> ListarEpisodios(string id)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                try
                {
                    string sql = ScriptsPodecast.sqlId;
                    var param = new DynamicParameters();
                    param.Add("@id", id, DbType.String, ParameterDirection.Input);
                    var response = await connection.QueryAsync<dynamic>(sql, param);
                    Slapper.AutoMapper.Configuration.AddIdentifier(typeof(Episodes), "IdEpisodFile");
                    Slapper.AutoMapper.Configuration.AddIdentifier(typeof(FileDet), "IdFile");

                    return Slapper.AutoMapper.MapDynamic<Episodes>(response, false).FirstOrDefault();

                }
                catch
                {
                    return null;
                }
            }
        }
    }
}
