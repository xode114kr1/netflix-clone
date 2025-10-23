import { useEffect, useRef, useState } from 'react';
import type { RowProps } from '../models/components/Row';
import instance from '../api/axios';
import type { IMovie } from '../models/tmdb';
import styled from 'styled-components';

interface RowPosterImgProps {
  $isLargeRow: boolean;
}

const RowContanier = styled.section`
  margin-left: 20px;
  color: white;

  h2 {
    padding-left: 20px;
  }
`;

const SliderContanier = styled.div`
  position: relative;

  &:hover .SlicerArrowLeft,
  &:hover .SlicerArrowRight {
    transition: 400ms all ease-in-out;
    visibility: visible;
  }
`;

const SlicerArrowLeft = styled.div`
  top: 50%;
  position: absolute;
  left: 20px;
  width: 35px;
  height: 35px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;

  &:hover {
    transition: 400ms all ease-in-out;
    background: rgba(255, 255, 255, 0.6);
    color: black;
  }
`;

const SlicerArrowRight = styled.div`
  position: absolute;
  top: 50%;
  right: 0px;
  width: 35px;
  height: 35px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;

  &:hover {
    transition: 400ms all ease-in;
    background: rgba(255, 255, 255, 0.6);
    color: black;
  }
`;

const Arrow = styled.span`
  transition: 400ms all ease-in-out;
`;

const RowPosterContaneier = styled.div`
  display: flex;
  overflow-y: hidden;
  overflow-x: scroll;
  padding: 20px 0 20px 20px;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const RowPosterImg = styled.img<RowPosterImgProps>`
  object-fit: contain;
  width: 100%;
  max-height: ${({ $isLargeRow }) => ($isLargeRow ? 320 : 144)}px;
  margin-right: 10px;
  transition: transform 450ms;
  border-radius: 4px;

  &:hover {
    transform: ${({ $isLargeRow }) =>
      $isLargeRow ? 'scale(1.1)' : 'scale(1.08)'};
    opacity: 1;
  }

  @media screen and (min-width: 1200px) {
    max-height: ${({ $isLargeRow }) => ($isLargeRow ? 360 : 160)}px;
  }

  @media screen and (max-width: 768px) {
    max-height: ${({ $isLargeRow }) => ($isLargeRow ? 280 : 100)}px;
  }
`;

export default function Row({
  title,
  id,
  fetchUrl,
  isLargeRow = false,
}: RowProps) {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchMovieData();
  }, []);

  const fetchMovieData = async () => {
    const request = await instance.get(fetchUrl);
    setMovies(request?.data?.results);
  };

  const scrollByPage = (dir: 'left' | 'right') => {
    const el = scrollerRef.current;
    if (!el) return;
    const vw = typeof window !== 'undefined' ? window.innerWidth : 1024;
    const amount = Math.max(320, vw - 80);
    el.scrollBy({
      left: dir === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  return (
    <RowContanier>
      <h2>{title}</h2>
      <SliderContanier>
        <SlicerArrowLeft onClick={() => scrollByPage('left')}>
          <Arrow>{'<'}</Arrow>
        </SlicerArrowLeft>
        <RowPosterContaneier id={id} ref={scrollerRef}>
          {movies.map((movie) => (
            <RowPosterImg
              key={movie.id}
              $isLargeRow={isLargeRow}
              src={`https://image.tmdb.org/t/p/original/${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
            />
          ))}
        </RowPosterContaneier>
        <SlicerArrowRight onClick={() => scrollByPage('right')}>
          <Arrow>{'>'}</Arrow>
        </SlicerArrowRight>
      </SliderContanier>
    </RowContanier>
  );
}
