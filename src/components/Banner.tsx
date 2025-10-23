import { useEffect, useState } from 'react';
import requests from '../api/request';
import instance from '../api/axios';
import styled, { css } from 'styled-components';
import { type IMovieSummary } from '../models/tmdb';

interface BannerContanierProps {
  $backgroundImg: string;
}

interface BannerButtonProps {
  $variant: 'play' | 'info';
}

const BannerContanier = styled.header<BannerContanierProps>`
  position: relative;
  color: #f0f0f0;
  object-fit: contain;
  height: 448px;
  background-position: center;
  background-size: cover;
  ${({ $backgroundImg }) =>
    $backgroundImg
      ? css`
          background-image: url(https://image.tmdb.org/t/p/original/${$backgroundImg});
        `
      : css`
          background: #111;
        `}
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(
      180deg,
      transparent,
      rgba(37, 37, 37, 0.61),
      #111
    );
    z-index: 1;
    pointer-events: none;
  }

  @media (min-width: 1500px) {
    position: relative;
    height: 600px;
  }
`;

const BannerTextContanier = styled.div`
  position: relative;
  z-index: 2;
  margin-left: 40px;
  padding-top: 140px;
  height: 190px;

  @media (max-width: 768px) {
    width: min-content !important;
    padding-left: 2.3rem;
    margin-left: 0 !important;
  }
`;

const BannerButtonContanier = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  font-size: 3rem;
  font-weight: 800;
  padding-bottom: 0.5rem;
`;

const BannerDescription = styled.p`
  width: 45rem;
  max-width: 400px;
  line-height: 1.3;
  padding-top: 1rem;
  font-weight: 500;
  font-size: 1rem;
  height: 80px;
  overflow: hidden;

  @media (max-width: 768px) {
    font-size: 0.8rem !important;
    width: auto !important;
  }
`;

const BannerButton = styled.button<BannerButtonProps>`
  display: flex;
  align-items: center;
  justify-content: start;
  cursor: pointer;
  outline: none;
  border: none;
  font-size: 1rem;
  font-weight: 700;
  border-radius: 0.2vw;
  padding: 0.4rem 1.8rem 0.4rem 1rem;

  &:hover {
    color: #000;
    background-color: rgba(170, 170, 170, 0.9);
    transition: all 0.2s;
  }

  ${({ $variant }) =>
    $variant === 'play'
      ? css`
          background-color: white;
          color: black;
        `
      : css`
          background-color: rgba(109, 109, 110, 0.7);
          color: white;
          &:hover {
            background-color: rgb(74, 74, 74);
            color: white;
          }
        `}

  @media (max-width: 768px) {
    font-size: 0.8rem !important;
    border-radius: 4px !important;
  }
`;

export default function Banner() {
  const [movie, setMovie] = useState<IMovieSummary>();

  const truncate = (str: string | undefined, n: number) => {
    if (!str) return '';
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const request = await instance.get(requests.fetchNowPlaying);
    const movieId =
      request.data.results[
        Math.floor(Math.random() * request.data.results.length)
      ].id;

    const { data: movieDetail } = await instance.get(`movie/${movieId}`, {
      params: { append_to_response: 'videos' },
    });
    setMovie(movieDetail);
  };

  return (
    <BannerContanier $backgroundImg={movie?.backdrop_path ?? ''}>
      <BannerTextContanier>
        <h1>{movie?.title || movie?.original_title}</h1>
        <BannerButtonContanier>
          <BannerButton $variant="play">Play</BannerButton>
          <BannerButton $variant="info">More Information</BannerButton>
        </BannerButtonContanier>
        <BannerDescription>{truncate(movie?.overview, 100)}</BannerDescription>
      </BannerTextContanier>
    </BannerContanier>
  );
}
