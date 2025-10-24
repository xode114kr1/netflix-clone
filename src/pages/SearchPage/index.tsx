import { useLocation, useNavigate } from 'react-router-dom';
import instance from '../../api/axios';
import { useEffect, useState } from 'react';
import type { IMovie } from '../../models/tmdb';
import styled from 'styled-components';
import { useDebounce } from '../../hooks/useDebounce';

const SearchContanier = styled.section`
  background-color: black;
  width: 100%;
  text-align: center;
  padding: 5rem 0;
`;

const Movie = styled.div`
  flex: 1 1 auto;
  display: inline-block;
  padding-right: 0.5rem;
  padding-bottom: 7rem;
`;
const MovieColumnPoster = styled.div`
  cursor: pointer;
  transition: transform 0.3s;
  -webkit-transition: transform 0.3s;

  &:hover {
    transform: scale(1.25);
  }
`;
const MoviePosterImg = styled.img`
  width: 90%;
  border-radius: 5px;
`;

const NoResultContanier = styled.section`
  display: flex;
  justify-content: center;
  align-content: center;
  color: #c5c5c5;
  height: 100%;
  padding: 8rem;
`;
const NoResultText = styled.div``;

export default function SearchPage() {
  const [searchResults, setSearchResults] = useState<IMovie[]>([]);

  const navigate = useNavigate();

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  let query = useQuery();

  const searchTerm = query.get('q');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const fetchSearchMovie = async (searchTerm: string) => {
    try {
      const res = await instance.get(
        `/search/multi?include_adult=false&query=${searchTerm}`
      );
      setSearchResults(res.data.results);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    console.log(debouncedSearchTerm);
    if (debouncedSearchTerm) {
      fetchSearchMovie(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  const renderSearchResults = () => {
    return searchResults.length > 0 ? (
      <SearchContanier>
        {searchResults.map((movie) => {
          if (movie.backdrop_path !== null) {
            const movieImageUrl = `http://image.tmdb.org/t/p/w500${movie.backdrop_path}`;
            return (
              <Movie key={movie.id}>
                <MovieColumnPoster onClick={() => navigate(`/${movie.id}`)}>
                  <MoviePosterImg src={movieImageUrl} alt="movie image" />
                </MovieColumnPoster>
              </Movie>
            );
          }
        })}
      </SearchContanier>
    ) : (
      <NoResultContanier>
        <NoResultText>
          <p>찾고자 하는 영화가 없습니다.</p>
        </NoResultText>
      </NoResultContanier>
    );
  };

  return renderSearchResults();
}
