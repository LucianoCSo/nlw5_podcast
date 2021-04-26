import { GetStaticProps } from "next";
import Imag from "next/image";
import Link from "next/link";
import Head from "next/head";
import { format, parseISO } from "date-fns";
import ptBr from "date-fns/locale/pt-BR";
import { api } from "../services/api";
import { convertDurationTimeString } from "../Utils/convertDurationTimeString";

import style from "./home.module.scss";
import { usePlayer } from "../contexts/PlayerContext";

type Episode = {
  id: string;
  title: string;
  members: string;
  publishedAt: string;
  thumbnail: string;
  description: string;
  durationAsString: string;
  duration: number;
  url: string;
};
type HomeProps = {
  latesEpisodes: Episode[];
  allEpisodes: Episode[];
};

export default function Home({ latesEpisodes, allEpisodes }: HomeProps) {
  const { playList } = usePlayer();

  const episodeList = [...latesEpisodes, ...allEpisodes];

  return (
    <div className={style.homePage}>
      <Head>
        <title>Home | Podecastr</title>
      </Head>
      <section className={style.latesEpisodes}>
        <h2>Ultimos Lançamentos</h2>
        <ul>
          {latesEpisodes.map((episode, index) => {
            return (
              <li key={episode.id}>
                <Imag
                  width={192}
                  height={192}
                  src={episode.thumbnail}
                  alt={episode.title}
                  objectFit="cover"
                />
                <div className={style.episodeDetales}>
                  <Link href={`/episode/${episode.id}`}>
                    <a>{episode.title}</a>
                  </Link>
                  <p>{episode.members}</p>
                  <span>{episode.publishedAt}</span>
                  <span>{episode.durationAsString}</span>
                </div>
                <button
                  type="button"
                  onClick={() => playList(episodeList, index)}
                >
                  <img src="/play-green.svg" alt="Tocar episodio" />
                </button>
              </li>
            );
          })}
        </ul>
      </section>
      <section className={style.allEpisodes}>
        <h2>Todos os episodios</h2>

        <table cellSpacing={0}>
          <thead>
            <tr>
              <th></th>
              <th>Podcast</th>
              <th>Integrantes</th>
              <th>Data</th>
              <th>Duração</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allEpisodes.map((episode, index) => {
              return (
                <tr key={episode.id}>
                  <td>
                    <Imag
                      width={120}
                      height={120}
                      src={episode.thumbnail}
                      alt={episode.title}
                      objectFit="cover"
                    />
                  </td>
                  <td>
                    <Link href={`/episode/${episode.id}`}>
                      <a>{episode.title}</a>
                    </Link>
                  </td>
                  <td>{episode.members}</td>
                  <td>{episode.publishedAt}</td>
                  <td>{episode.durationAsString}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() =>
                        playList(episodeList, index + latesEpisodes.length)
                      }
                    >
                      <img src="/play-green.svg" alt="Tocar episodio" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}
//Chamada SSG
export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get("episodes", {
    params: {
      _limit: 12,
      _sort: "published_at",
      _order: "desc",
    },
  });

  const episodes = data.map((episode) => {
    return {
      id: episode.id,
      title: episode.title,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), "d MMM yy", {
        locale: ptBr,
      }),
      thumbnail: episode.thumbnail,
      description: episode.description,
      durationAsString: convertDurationTimeString(
        Number(episode.file.duration)
      ),
      duration: Number(episode.file.duration),
      url: episode.file.url,
    };
  });
  const latesEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.length);
  return {
    props: {
      latesEpisodes,
      allEpisodes,
    },
    revalidate: 60 * 60 * 8,
  };
};

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
