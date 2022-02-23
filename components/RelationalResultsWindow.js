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
        this.state = {page: this.props.page, sortby: this.props.sortby, resultsPerPage: this.props.resultsPerPage}
    }
    
    render() { //The map build the result for each document
        return(
            <div style={{borderStyle: 'solid'}}>
            <Graph
                id="graph-id" // id is mandatory
                data={this.props.data}
                config={graphConfig}
            />;
        </div>
        )
    }
}

export default RelationResultsWindow
