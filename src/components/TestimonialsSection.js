import React from "react";
import Section from "./Section";
import SectionHeader from "./SectionHeader";
import Testimonials from "./Testimonials";

function TestimonialsSection(props) {
  return (
    <Section color={props.color} size={props.size}>
      <div className="container">
        <SectionHeader
          title={props.title}
          subtitle={props.subtitle}
          centered={true}
          size={3}
        />
        <Testimonials
          items={[
            {
              avatar: "https://pbs.twimg.com/profile_images/1016178318251560962/kOOtikO6_400x400.jpg",
              name: "Michael Burgess",
              quote:
                "Have been waiting for something like this... It's the next evolutionary step for #defi composability and will have a profound impact on the space. As a product, this far exceeds what available in legacy finance. 👏 ",
              company: "Ren Protocol",
              link: "https://twitter.com/mw_burgess/status/1189257050699849734?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E1189257050699849734&ref_url=https%3A%2F%2Fpublish.twitter.com%2F%3Fquery%3Dhttps%253A%252F%252Ftwitter.com%252Fmw_burgess%252Fstatus%252F1189257050699849734%26widget%3DTweet"
            },
            {
              avatar: "https://pbs.twimg.com/profile_images/1170881713926365184/gI59qCJT_400x400.jpg",
              name: "Kain Warwick",
              quote:
                "This is an amazing DeFi mashup. Love the eth maxi recipe, short BTC and long ETH.",
              company: "Synthetix.io"
            },
            {
              avatar: "https://pbs.twimg.com/profile_images/1184083008242016258/mlQ4vHYC_400x400.jpg",
              name: "Emiliano Bonassi",
              quote:
                "dDai is really the equivalent of  IFTTT for the DeFi. This ecosystem is the next big thing! Thanks to Compound.finance, b0xNet, synthetix_io and KyberSwap for building the atoms of the #DeFi",
              company: "Eidoo"
            },
          ]}
        />
      </div>
    </Section>
  );
}

export default TestimonialsSection;
