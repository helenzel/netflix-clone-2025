import React, { useEffect, useState } from "react";
import "./Row.css";
import axios from "../../../utils/axios";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";
const Row = ({ title, fetchUrl, islargeRow }) => {
  const [movies, setMovie] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [trailerNotFound, setTrailerNotFound] = useState(false);
  const base_url = "https://image.tmdb.org/t/p/original";
  useEffect(() => {
    (async () => {
      try {
        const request = await axios.get(fetchUrl);
        setMovie(request.data.results);
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, [fetchUrl]);
  const handleClick = async (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
      setTrailerNotFound(false);
    } else {
      try {
        const url = await movieTrailer(
          movie?.title || movie?.name || movie?.original_name
        );
        if (!url) {
          console.warn(
            "no trailer URl Found For:",
            movie?.title || movie?.name
          );
          return;
        }
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get("v"));
        setTrailerNotFound(false);
      } catch (error) {
        console.error("Trailer not found:", error);
        setTrailerNotFound(true);
      }
    }
  };
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  const onPlayerReady = (event) => {
    console.log("youTube Player Ready");
  };
  return (
    <div className="row">
      <h1>{title}</h1>
      <div className="row_posters">
        {movies?.map((movie, id) => (
          <img
            onClick={() => handleClick(movie)}
            key={id}
            src={`${base_url}${
              islargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
            className={`row_poster ${islargeRow && "row_posterlarge"}`}
          />
        ))}
      </div>
      <div style={{ padding: "40px", textAlign: "center", color: "#fff" }}>
        {trailerUrl ? (
          <YouTube videoId={trailerUrl} opts={opts} onReady={onPlayerReady} />
        ) : trailerNotFound ? (
          <p>🎬 Trailer not available</p>
        ) : null}
      </div>
    </div>
  );
};

export default Row;
