import type { IMovie } from "../tmdb";

export interface MovieModalProps {
  movie: IMovie;
  setIsModalOpen: (open: boolean) => void;
}
