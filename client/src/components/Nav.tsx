import React from 'react';
import styled from 'styled-components';

const Nav = styled.div`
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.0975);
`;
const NavHeader = styled.div`
  padding: 26px 20px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const NavLeft = styled.div`
  width: 33.333%;
  text-align: left;
`;
const NavCenter = styled.div`
  width: 33.333%;
`;
const Button = styled.button`
  cursor: pointer;
  background: transparent;
  font-size: 16px;
  border-radius: 3px;
  color: #5199FF;
  border: 2px solid #5199FF;
  margin: 0 1em;
  padding: 0.25em 1em;
  transition: 0.5s all ease-out;
  &:hover {
    background-color: #5199FF;
    color: white;
  }
`;
const NavRight = styled.div`
  width: 33.333%;
  text-align: right;
  svg {
    margin-right: 20px;
  }
`;
const NavLogo = styled(NavLeft)`
  font-family: udagramLogo;
  font-size: 48px;
`;

function Header() {
  return (
    <Nav>
      <NavHeader>
        <NavLeft>
            <NavLogo>Udagram</NavLogo>
        </NavLeft>
        <NavCenter></NavCenter>
        <NavRight>
            <Button>Login</Button>
        </NavRight>
      </NavHeader>
    </Nav>
  );
}
export default Header;