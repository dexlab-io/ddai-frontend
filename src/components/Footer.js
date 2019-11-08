import React from "react";
import styled from "styled-components";
import Section from "./Section";
import { Link } from "./../util/router.js";
import "./Footer.scss";
import {link} from "../mixpanel";

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
              <a className="brand" to="/"
               onClick={() => link({position: 'footer', to: '/', type: 'logo'})}>
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
                        <a
                          onClick={() => link({position: 'footer', to: 'dexwallet.io', type: 'text'})}
                          target="_blank"
                          href="https://dexwallet.io"
                          
                        >
                          Dexwallet
                        </a>
                      </li>
                      <li>
                        <a onClick={() => link({position: 'footer', to: 'defitracker.io', type: 'text'})}
                          target="_blank"
                          href="https://defitracker.io/">DeFi Tracker</a>
                      </li>
                      <li>
                        <a onClick={() => link({position: 'footer', to: 'dexpay.io', type: 'text'})}
                          target="_blank"
                          href="https://dexpay.me/">Dexpay</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="column is-4">
                  <div className="menu">
                    <p className="menu-label">Company</p>
                    <ul className="menu-list">
                      <li>
                        <a onClick={() => link({position: 'footer', to: 'about', type: 'text'})}
                          target="_blank"
                          href="https://github.com/dexlab-io/whitepaper-official/blob/master/README.md">
                          About
                        </a>
                      </li>
                      <li>
                        <a onClick={() => link({position: 'footer', to: 'contact', type: 'text'})}
                          target="_blank"
                          href="founders@dexlab.io">Contact</a>
                      </li>
                      <li>
                        <a
                          onClick={() => link({position: 'footer', to: 'medium.com/dexlab-io', type: 'text'})}
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
                          onClick={() => link({position: 'footer', to: 'dexwallet.io/discord', type: 'icon'})}
                          href="https://www.dexwallet.io/discord/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img src="../images/discord.svg" alt="Discord" />
                          Discord
                        </a>
                      </li>
                      <li>
                        <a
                        onClick={() => link({position: 'footer', to: 't.me/joindexlab', type: 'icon'})}
                        target="_blank"
                          href="https://t.me/joindexlab"
                          rel="noopener noreferrer"
                        >
                          <img src="../images/telegram.svg" alt="Telegram" />
                          Telegram
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={() => link({position: 'footer', to: 'twitter.com/Dexwallet', type: 'icon'})}
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
