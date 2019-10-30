import React, { useState } from "react";
import NavbarContainer from "./NavbarContainer";
import { Link, useRouter } from "./../util/router.js";
import SectionButton from "./SectionButton";
import styled from "styled-components";

const NavBarItem = styled.div`
`;

const Logo = styled.img`
  height: 80px;

  @media (max-width: 1000px) {
    margin: 20px;
  }
`;

function Navbar(props) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <NavbarContainer spaced={props.spaced} color={props.color}>
      <div className="container">
        <div className="navbar-brand">
          <NavBarItem>
            <Link to="/">
              <Logo src={props.logo} alt="Logo" />
            </Link>
          </NavBarItem>
          <div
            className={"navbar-burger burger" + (menuOpen ? " is-active" : "")}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span />
            <span />
          </div>
        </div>
        <div className={"navbar-menu" + (menuOpen ? " is-active" : "")}>
          <div className="navbar-end">
            <Link className="navbar-item" to="/about">
              About
            </Link>
            <Link className="navbar-item" to="/pricing">
              Dexwallet
            </Link>
            <Link className="navbar-item" to="/faq">
              FAQ
            </Link>

            <div className="navbar-item">
              <SectionButton
                parentColor={props.color}
                size="normal"
                onClick={() => {
                  router.push("/recipes");
                }}
              >
                Open App
              </SectionButton>
            </div>
          </div>
        </div>
      </div>
    </NavbarContainer>
  );
}

export default Navbar;
