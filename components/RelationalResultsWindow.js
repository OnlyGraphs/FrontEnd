import React from 'react';
import {Button, ButtonGroup} from '@mui/material';
import { Graph } from "react-d3-graph";


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
        this.state = {page: this.props.page, sortby: this.props.sortby, resultsPerPage: this.props.resultsPerPage, currentAbstract: ""}
        this.onHoverIn =  this.onHoverIn.bind(this)
        this.onHoverOut = this.onHoverOut.bind(this)
    }

    onClickNode = (title) => {
        window.open("https://simple.wikipedia.org/wiki/" + title, '_blank')
    };

    onHoverIn = (title) => {
        var abstract = this.props.abstractMap.get(title)
        this.setState({currentAbstract: abstract})
    }

    onHoverOut = (title) => {
        this.setState({currentAbstract: ""})
        
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
        <p>{this.state.currentAbstract}</p>
        </div>
        )
    }
}

export default RelationResultsWindow
