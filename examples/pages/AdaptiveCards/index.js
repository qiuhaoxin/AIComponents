
import React from 'react';
import { AdaptiveCard } from 'aicomponents';
import { tripOne, cwzb, multiPage } from '../../common/adaptiveCardData';

//const str = JSON.parse(multiPage);
// console.log("str is ", multiPage[0]);
class AdaptiveCardPage extends React.Component {
    constructor(props) {
        super(props);
    }
    handleAction = (action) => {
        console.log('action is ', JSON.stringify(action));
    }
    render() {
        return <div>
            <AdaptiveCard style={{ width: 315, marginLeft: 20 }} cardData={multiPage} onExecuteAction={this.handleAction} />
            <AdaptiveCard style={{ width: 315, marginLeft: 20 }} cardData={tripOne} onExecuteAction={this.handleAction} />
        </div>
    }
}

export default AdaptiveCardPage;