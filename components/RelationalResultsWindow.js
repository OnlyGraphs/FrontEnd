import React from 'react';
import {Button, ButtonGroup} from '@mui/material';
import { Graph } from "react-d3-graph";
import RelationalResult from './RelationalResult';


const graphConfig = {
    directed: true,
    width: 1000
}

/**
 * Write this
 */
 class RelationResultsWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentAbstract: "Hover over a node to see the abstract, click on a node to open the page",
            currentTitle: ""
        }
        this.onHoverIn =  this.onHoverIn.bind(this)
        this.onHoverOut = this.onHoverOut.bind(this)
    }

    onClickNode = (title) => {
        this.props.feedbackCallback(title)
        window.open("https://simple.wikipedia.org/wiki/" + title, '_blank')
    };

    onHoverIn = (title) => {
        var abstract = this.props.abstractMap.get(title)
        this.setState({currentAbstract: abstract, currentTitle: title})
    }

    onHoverOut = (title) => {
        this.setState({currentAbstract: "Hover over a node to see the abstract, click on a node to open the linked page", currentTitle: ""})
        
    }
    
    render() { //The map build the result for each document
        return(
            <div>
            <div style={{borderStyle: 'solid'}}>
            <Graph
                id="graph-id" // id is mandatory
                data={this.props.data}
                config={graphConfig}
                onClickNode = {this.onClickNode}
                onMouseOverNode={this.onHoverIn}
                onMouseOutNode={this.onHoverOut}
            />
        </div>
        <RelationalResult title={this.state.currentTitle} abstract={this.state.currentAbstract} />
        </div>
        )
    }
}

export default RelationResultsWindow
