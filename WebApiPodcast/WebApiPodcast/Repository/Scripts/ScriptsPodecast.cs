namespace WebApiPodcast.Repository.Scripts
{
    public static class ScriptsPodecast
    {
        public static string sql => @"select 
                                        e.id as id, 
                                        e.title as title, 
                                        e.members as members, 
                                        e.published_at as publishedAt, 
                                        e.thumbnail as thumbnail, 
                                        e.description as description, 
                                        f.url as File_Url, 
                                        f.type as File_Type, 
                                        f.duration as File_Duration,
										e.id_fileDet as IdEpisodFile,
										f.id as File_IdFile
                                        from episodes e
                                        join file_det f 
                                        on f.id = e.id_fileDet
                                        order by id_fileDet
                                        ";
    }
}
