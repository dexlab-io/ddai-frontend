import React from "react";
import styled from "styled-components";
import Section from "./Section";
import { Link } from "./../util/router.js";
import "./Footer.scss";

const Container = styled.div`
  @media (max-width: 800px) {
    margin: 0 20px;
    letter-spacing: -2px;
    line-height: 57px;
  }
`;

function Footer(props) {
  return (
    <Container>
      <Section color={props.color} size={props.size}>
        <div className="FooterComponent__container container">
          <div className="columns">
            <div className="column is-5 is-4-widescreen">
              <a className="brand" to="/">
                <div className="brand-icon">
                  <img
                    className="FooterComponent__logo"
                    src={props.logo}
                    alt="Logo"
                  />
                </div>
              </a>

              {props.description && (
                <p className="FooterComponent__description">
                  {props.description}
                </p>
              )}

              {props.copyright && (
                <p className="FooterComponent__copywrite">{props.copyright}</p>
              )}
            </div>
            <div className="column is-7 is-6-widescreen is-offset-2-widescreen">
              <div className="columns">
                <div className="column is-4">
                  <div className="menu">
                    <p className="menu-label">Products</p>
                    <ul className="menu-list">
                      <li>
                        <a href="https://www.dexwallet.io/">Dexwallet</a>
                      </li>
                      <li>
                        <a href="https://defitracker.io/">DeFi Tracker</a>
                      </li>
                      <li>
                        <a href="https://dexpay.me/">Dexpay</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="column is-4">
                  <div className="menu">
                    <p className="menu-label">Company</p>
                    <ul className="menu-list">
                      <li>
                        <a href="https://hackmd.io/@8O08261_SpWdZUBJKxeF5Q/rk7VotSpE?type=view">About</a>
                      </li>
                      <li>
                        <a href="founders@dexlab.io">Contact</a>
                      </li>
                      <li>
                        <a
                          target="_blank"
                          href="https://medium.com/dexlab-io"
                          rel="noopener noreferrer"
                        >
                          Blog
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="column is-4">
                  <div className="menu">
                    <p className="menu-label">Social</p>
                    <ul className="menu-list">
                      <li>
                        <a
                          href="https://discord.gg/DxttPVm"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src="../images/discord.svg"
                            alt="Discord"
                          />
                          Discord
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://t.me/joindexlab"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src="../images/telegram.svg"
                            alt="Telegram"
                          />
                          Telegram
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://twitter.com/Dexwallet"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src="https://uploads.divjoy.com/icon-twitter.svg"
                            alt="Twitter"
                          />
                          Twitter
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </Container>
  );
}

export default Footer;
