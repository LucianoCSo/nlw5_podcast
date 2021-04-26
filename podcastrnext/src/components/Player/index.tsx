import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import { usePlayer } from "../../contexts/PlayerContext";
import style from "./styles.module.scss";
import { convertDurationTimeString } from "../../Utils/convertDurationTimeString";

export default function Player() {
  const audioRaf = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);

  const {
    episodeList,
    currentEpisodeIndex,
    isPlaying,
    isLooping,
    isShuffling,
    togglePlay,
    toggLoop,
    toggShuffle,
    setPlayingState,
    playNext,
    playProvios,
    clearPlayingState,
    hasNext,
    hasPrevios,
  } = usePlayer();

  useEffect(() => {
    if (!audioRaf.current) {
      return;
    }

    if (isPlaying) {
      audioRaf.current.play();
    } else {
      audioRaf.current.pause();
    }
  }, [isPlaying]);

  const episode = episodeList[currentEpisodeIndex];

  function setupProgressListener() {
    audioRaf.current.currentTime = 0;

    audioRaf.current.addEventListener("timeupdate", () => {
      setProgress(Math.floor(audioRaf.current.currentTime));
    });
  }

  function hendleSeek(amount: number) {
    audioRaf.current.currentTime = amount;
    setProgress(amount);
  }

  function hendleEpisodioEnded() {
    if (hasNext) {
      playNext();
    } else {
      clearPlayingState();
    }
  }
  return (
    <div className={style.playerContainer}>
      <header>
        <img src="/playing.svg" alt="Tocando agora" />
        <strong>Tocando agora</strong>
      </header>
      {episode ? (
        <div className={style.currentEpisode}>
          <Image
            width={592}
            height={592}
            src={episode.thumbnail}
            objectFit="cover"
          />
          <strong>{episode.title}</strong>
          <span>{episode.members}</span>
        </div>
      ) : (
        <div className={style.emptyPlayer}>
          <strong>Selecione um podcast para ouvir</strong>
        </div>
      )}
      <footer className={!episode ? style.empty : ""}>
        <div className={style.progress}>
          <span>{convertDurationTimeString(progress)}</span>
          <div className={style.slider}>
            {episode ? (
              <Slider
                max={episode.duration}
                value={progress}
                onChange={hendleSeek}
                trackStyle={{ backgroundColor: "#84d361" }}
                railStyle={{ backgroundColor: "#9f75ff" }}
                handleStyle={{ borderColor: "#9f75ff", borderWidth: 4 }}
              />
            ) : (
              <div className={style.emptySlider} />
            )}
          </div>
          <span>{convertDurationTimeString(episode?.duration ?? 0)}</span>
        </div>

        {episode && (
          <audio
            src={episode.url}
            ref={audioRaf}
            autoPlay
            loop={isLooping}
            onEnded={hendleEpisodioEnded}
            onLoadedMetadata={setupProgressListener}
            onPlay={() => setPlayingState(true)}
            onPause={() => setPlayingState(false)}
          />
        )}

        <div className={style.buttons}>
          <button
            type="button"
            disabled={!episode || episodeList.length === 1}
            onClick={toggShuffle}
            className={isShuffling ? style.isActive : ""}
          >
            <img src="/shuffle.svg" alt="Embaralhar" />
          </button>
          <button
            type="button"
            disabled={!episode || !hasPrevios}
            onClick={playProvios}
          >
            <img src="/play-previous.svg" alt="Tocar anterior" />
          </button>
          <button
            type="button"
            className={style.playButton}
            disabled={!episode}
            onClick={togglePlay}
          >
            {isPlaying ? (
              <img src="/pause.svg" alt="Tocar" />
            ) : (
              <img src="/play.svg" alt="Tocar" />
            )}
          </button>
          <button
            type="button"
            disabled={!episode || !hasNext}
            onClick={playNext}
          >
            <img src="/play-next.svg" alt="Proximo" />
          </button>
          <button
            type="button"
            disabled={!episode}
            onClick={toggLoop}
            className={isLooping ? style.isActive : ""}
          >
            <img src="/repeat.svg" alt="Repitir" />
          </button>
        </div>
      </footer>
    </div>
  );
}
