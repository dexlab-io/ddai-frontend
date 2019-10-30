import React from "react";
import Section from "./Section";
import SectionHeader from "./SectionHeader";
import Clients from "./Clients";

function ClientsSection(props) {
  return (
    <Section color={props.color} size={props.size}>
      <div >
        <SectionHeader
          title={props.title}
          subtitle={props.subtitle}
          centered={true}
          size={3}
        />
        <Clients
          items={[
            {
              name: "Compound",
              image: "../images/compound.svg",
              width: "160px"
            },
            {
              name: "Fulcrum",
              image: "../images/fulcrum.svg",
              width: "170px"
            },
            {
              name: "Kyber",
              image: "../images/kyber.svg",
              width: "100px"
            },
            {
              name: "Synthetix",
              image: "../images/synthetix.png",
              width: "180px"
            },
            {
            name: "Bzx",
            image: "../images/bzxlogo.svg",
            width: "120px"
          },
          ]}
        />
      </div>
    </Section>
  );
}

export default ClientsSection;
