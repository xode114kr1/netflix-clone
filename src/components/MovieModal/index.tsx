import styled, { keyframes } from "styled-components";
import type { MovieModalProps } from "../../models/components/Modal";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const MovieModalContanier = styled.section`
  z-index: 1200;
  position: absolute;
`;

const ModalWapper = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 71%);
  -webkit-tap-highlight-color: transparent;
  display: flex;
  justify-content: center;

  @media screen and (max-height: 768px) {
    align-items: unset;
    padding-top: 2rem;
  }

  @media screen and (max-width: 768px) {
    padding: 0;
  }
`;

const Modal = styled.div`
  position: relative;
  max-width: 800px;
  background: #111;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12);
  transition: all 400ms ease-in-out 2s;
  animation: ${fadeIn} 400ms;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
    visibility: hidden;
  }

  @media screen and (max-height: 768px) {
    overflow-y: scroll;
  }

  @media screen and (max-width: 768px) {
    overflow-y: scroll !important;
  }
`;

const ModalClose = styled.span`
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
  z-index: 1000;
  color: white;
  background: none;
  border: none;
  font-size: 24px;

  &:hover {
    opacity: 0.8;
  }
`;

const ModalPosterImg = styled.img`
  width: 100%;
  height: auto;
`;

const ModalContent = styled.div`
  padding: 40px;
  color: white;
`;

const ModalDetail = styled.p`
  font-weight: 600;
  font-size: 18px;

  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
`;

const ModalUserPerc = styled.span`
  color: #46d369;
`;

const ModalTitle = styled.h2`
  padding: 0;
  font-size: 40px;
  margin: 16px 0;

  @media screen and (max-width: 768px) {
    font-size: 28px;
  }
`;

const ModalOverView = styled.p`
  font-size: 20px;
  line-height: 1.5;

  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
`;

export default function MovieModal({ movie, setIsModalOpen }: MovieModalProps) {
  return (
    <MovieModalContanier>
      <ModalWapper
        onClick={(e) => {
          if (e.target === e.currentTarget) setIsModalOpen(false);
        }}
      >
        <Modal>
          <ModalClose onClick={() => setIsModalOpen(false)}>X</ModalClose>
          <ModalPosterImg
            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
            alt="modal-poster-img"
          />
          <ModalContent>
            <ModalDetail>
              <ModalUserPerc>100% for you</ModalUserPerc>
              {movie.release_date ? movie.release_date : movie.first_air_date}
            </ModalDetail>
            <ModalTitle>{movie.title ? movie.title : movie.name}</ModalTitle>
            <ModalOverView>평점 : {movie.vote_average}</ModalOverView>
            <ModalOverView>{movie.overview}</ModalOverView>
          </ModalContent>
        </Modal>
      </ModalWapper>
    </MovieModalContanier>
  );
}
