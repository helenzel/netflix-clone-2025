import React from "react";
import Row from "../Row/Row";
import requests from "../../../utils/requests";
const Rowlist = () => {
  return (
    <>
      <Row
        title="NETFLIX ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
        islargeRow={true}
      />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRatedMovies} />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Tv Shows" fetchUrl={requests.fetchPopularTVShowsPage1} />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaryMovies} />
    </>
  );
};

export default Rowlist;
