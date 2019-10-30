import React from "react";
import Navbar from "../../components/Navbar";
import ClientsSection from "../../components/ClientsSection";
import TestimonialsSection from "../../components/TestimonialsSection";
import ContactSection from "../../components/ContactSection";
import Footer from "../../components/Footer";
import Conversation from "../../components/Conversation";

function IndexPage(props) {
  return (
    <>
      <Navbar
        color="white"
        spaced={true}
        logo="../images/logo.svg"
      />
      <Conversation />
      <ClientsSection
        color="white"
        size="medium"
        title="Built on"
        subtitle=""
      />
      <TestimonialsSection
        color="white"
        size="medium"
        title="Here's what people are saying"
        subtitle=""
      />
      {/* <ContactSection
        color="white"
        size="medium"
        title="Contact Us"
        subtitle=""
        showNameField={true}
        buttonText="Send message"
      /> */}
      <Footer
        color="white"
        size="medium"
        logo="../images/logo.svg"
        description="Earn dDai - Interest with smart DeFi recipes"
        copyright="© 2019 Dexlab.io"
      />
    </>
  );
}

export default IndexPage;
