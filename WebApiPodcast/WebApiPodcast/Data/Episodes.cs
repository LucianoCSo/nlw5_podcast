using System;

namespace WebApiPodcast.Data
{
    public class Episodes
    {
        public string id { get; set; }
        public string title { get; set; }
        public string members { get; set; }
        public DateTime publishedAt { get; set; }
        public string thumbnail { get; set; }
        public string description { get; set; }
        public int IdEpisodFile { get; set; }
        public FileDet File { get; set; }
    }
}
