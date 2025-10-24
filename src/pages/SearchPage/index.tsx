import { useLocation } from 'react-router-dom';
import instance from '../../api/axios';
import { useEffect, useState } from 'react';
import type { IMovie } from '../../models/tmdb';

export default function SearchPage() {
  const [searchResults, setSearchResults] = useState<IMovie[]>([]);

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  let query = useQuery();

  const searchTerm = query.get('q');

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
    if (searchTerm) {
      fetchSearchMovie(searchTerm);
    }
  }, [searchTerm]);

  console.log(searchResults);
  return <div>SearchPage</div>;
}
