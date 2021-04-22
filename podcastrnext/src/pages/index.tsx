import {GetStaticProps} from 'next';
import {format, parseISO} from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';
import { api } from '../services/api';
import { convertDurationTimeString } from '../Utils/convertDurationTimeString';

type Episode = {
  id: string;
  title: string;
  members: string;
  publishedAt: string;
  thumbnail: string;
  description: string;
  durationAsString: string;
  duration: string;
  url: string;
}
type HomeProps = {
  episodes: Episode[];
}

export default function Home(props: HomeProps) {
  return (
      <div>
        <h1>Index</h1>
        <p>{JSON.stringify(props.episodes)}</p>
      </div>
  );
}
//Chamada SSG
export const getStaticProps: GetStaticProps = async () => {
  const {data} = await api.get("episodes", {
    params:{
      _limit: 12,
      _sort: "published_at",
      _order: "desc",
    }
  });

  const episodes = data.map(episode => {
    return{
      id: episode.id,
      title: episode.title,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', {locale: ptBr}),
      thumbnail: episode.thumbnail,
      description: episode.description,
      durationAsString: convertDurationTimeString(Number(episode.file.duration)),
      duration: Number(episode.file.duration),
      url: episode.file.url 
    }
  })

  return{
    props: {
      episodes: episodes,
    },
    revalidate: 60 * 60 * 8,
  }
}

  //Chamada SPA
  /* useEffect(() => {
    fetch("http://localhost:3333/episodes")
      .then(response => response.json())
      .then(data => console.log(data))
  },[]) */

//Chamada SSR
/* export async function getServerSideProps(){
  const response = await fetch("http://localhost:3333/episodes");
  const data = await response.json();

  return{
    props: {
      epsodes: data,
    }
  }
} */

