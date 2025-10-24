import requests from '../../api/request';
import Banner from '../../components/Banner';
import Row from '../../components/Row';

export default function MainPage() {
  return (
    <>
      <Banner />
      <Row
        title="NETFLIX ORIGINALS"
        id="NO"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <Row title="Trendin Now" id="TN" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" id="TR" fetchUrl={requests.fetchTopRated} />
      <Row title="Acion Movies" id="AM" fetchUrl={requests.fetchActionMovies} />
      <Row
        title="Comedy Movies"
        id="CM"
        fetchUrl={requests.fetchComedyMovies}
      />
    </>
  );
}
