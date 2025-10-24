import { useParams } from 'react-router-dom';
import instance from '../../api/axios';
import { useEffect, useState } from 'react';
import type { IMovie } from '../../models/tmdb';
import styled from 'styled-components';

const DetailContanier = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  color: #fff;
  overflow: hidden;
`;

const MovieImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.5;
`;

export const MovieTitle = styled.h1`
  position: absolute;
  bottom: 80px;
  left: 60px;
  font-size: 3rem;
  font-weight: bold;
  text-shadow: 0px 4px 10px rgba(0, 0, 0, 0.7);

  @media screen and (max-width: 768px) {
    font-size: 2rem;
    left: 30px;
    bottom: 60px;
  }
`;

export default function DetailPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<IMovie | null>(null);
  useEffect(() => {
    fetchMovieDetail();
  }, [movieId]);

  const fetchMovieDetail = async () => {
    try {
      const res = await instance.get(`/movie/${movieId}`);
      setMovie(res.data);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <DetailContanier>
      <MovieImage
        src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
        alt="poster"
      />
      <MovieTitle>{movie?.title}</MovieTitle>
    </DetailContanier>
  );
}
