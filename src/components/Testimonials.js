import React from "react";
import CenteredColumns from "./CenteredColumns";
import Avatar from "./Avatar";
import "./Testimonials.scss";

function Testimonials(props) {
  return (
    <CenteredColumns>
      {props.items.map((item, index) => (
        <div className="column" key={index}>
          <figure className="testimonial">
            <blockquote className="Testimonials__card card">
              "{item.quote}"
            </blockquote>
            <div className="Testimonials__author">
              <div className="Testimonials__avatar-wrapper">
                <Avatar image={item.avatar} size={64} alt={item.name} />
              </div>
              <div className="Testimonials__info">
                <div className="has-text-weight-bold has-text-dark">
                  {item.name}
                </div>
                <div className="Testimonials__company is-size-7">
                  {item.company}
                </div>
              </div>
            </div>
          </figure>
        </div>
      ))}
    </CenteredColumns>
  );
}

export default Testimonials;
