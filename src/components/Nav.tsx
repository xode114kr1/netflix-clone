import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface NavContainerProps {
  $show: boolean;
}

const NavContanier = styled.nav<NavContainerProps>`
  position: fixed;
  top: 0;
  width: 100%;
  height: 30px;
  z-index: 3;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.5s ease-in;

  background-color: ${(props) => (props.$show ? '#111' : 'transparent')};

  &:hover {
    background-color: #111;
  }
`;

const NavLogoImg = styled.img`
  position: fixed;
  left: 40px;
  width: 80px;
  object-fit: contain;
`;

const NavUserImg = styled.img`
  position: fixed;
  right: 40px;
  width: 30px;
  object-fit: contain;
`;

const SearchInput = styled.input`
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: rgb(0, 0, 0, 0.65);
  border-radius: 5px;
  color: white;
  padding: 5px;
  border: none;
`;

export default function Nav() {
  const [show, setShow] = useState<boolean>(false);
  const [searchValue, SetSearchValue] = useState<string>('');

  const navigate = useNavigate();

  const handleSearchInput = (value: string) => {
    SetSearchValue(value);
    navigate(`search?q=${value}`);
  };

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
    return () => {
      window.removeEventListener('scroll', () => {});
    };
  }, []);

  return (
    <NavContanier $show={show}>
      <NavLogoImg
        alt="Netflix Logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/250px-Netflix_2015_logo.svg.png"
        onClick={() => navigate('./')}
      />
      <SearchInput
        value={searchValue}
        placeholder="영화를 입력해주세요"
        onChange={(e) => handleSearchInput(e.target.value)}
      />
      <NavUserImg
        alt="User logged"
        src="https://png.pngtree.com/png-vector/20191115/ourmid/pngtree-beautiful-profile-line-vector-icon-png-image_1990469.jpg"
      />
    </NavContanier>
  );
}
