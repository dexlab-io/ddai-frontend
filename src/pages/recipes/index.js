import React from 'react';
import { PageHeading, CardOneButton, IF } from "../../components";
import ActionCardContainer from "../../containers/ActionCardContainer";

class Recipes extends React.Component {
    render() {
        return(
            <>
                <PageHeading subheading={`Select your investment strategy for the interest you earn on dDAI`} />
                <ActionCardContainer/>
            </>
        )
    }

}

export default Recipes;