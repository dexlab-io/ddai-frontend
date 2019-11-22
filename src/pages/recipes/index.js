import React from 'react';
import { PageHeading, CardOneButton, IF } from "../../components";
import ActionCardContainer from "../../containers/ActionCardContainer";

class Recipes extends React.Component {
    componentDidMount() {
        window.scrollTo(0, 0);
    }
    
    render() {
        return(
            <div>
                <PageHeading subheading={`Select your investment strategy for the interest you earn on dDAI`} />
                <ActionCardContainer/>
            </div>
        )
    }

}

export default Recipes;