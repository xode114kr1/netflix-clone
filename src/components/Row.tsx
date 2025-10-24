import { useEffect, useRef, useState } from 'react';
import type { RowProps } from '../models/components/Row';
import instance from '../api/axios';
import type { IMovie } from '../models/tmdb';
import styled from 'styled-components';
import MovieModal from './MovieModal';

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

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

const breakpoints = {
  1378: {
    slidesPerView: 6,
    slidesPerGroup: 6,
  },
  998: {
    slidesPerView: 5,
    slidesPerGroup: 5,
  },
  625: {
    slidesPerView: 4,
    slidesPerGroup: 4,
  },
  0: {
    slidesPerView: 3,
    slidesPerGroup: 3,
  },
};

export default function Row({
  title,
  id,
  fetchUrl,
  isLargeRow = false,
}: RowProps) {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [idModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [movieSelected, setMovieSelected] = useState<IMovie | null>(null);

  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchMovieData();
  }, []);

  const fetchMovieData = async () => {
    const request = await instance.get(fetchUrl);
    setMovies(request?.data?.results);
  };

  const handleOpenModal = (movie: IMovie) => {
    setIsModalOpen(true);
    setMovieSelected(movie);
  };

  return (
    <RowContanier>
      <h2>{title}</h2>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        navigation
        loop={true}
        pagination={{ clickable: true }}
        breakpoints={breakpoints}
      >
        <RowPosterContaneier id={id} ref={scrollerRef}>
          {movies.map((movie) => (
            <SwiperSlide>
              <RowPosterImg
                key={movie.id}
                $isLargeRow={isLargeRow}
                src={`https://image.tmdb.org/t/p/original/${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
                onClick={() => handleOpenModal(movie)}
              />
            </SwiperSlide>
          ))}
        </RowPosterContaneier>
      </Swiper>
      {idModalOpen && movieSelected && (
        <MovieModal movie={movieSelected} setIsModalOpen={setIsModalOpen} />
      )}
    </RowContanier>
  );
}
