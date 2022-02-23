import React from 'react';
import {Button, ButtonGroup} from '@mui/material';
import { Graph } from "react-d3-graph";


const data = {
    nodes: [{ id: "Harry" }, { id: "Sally" }, { id: "Alice" }],
    links: [
      { source: "Harry", target: "Sally" },
      { source: "Harry", target: "Alice" },
    ],
  };

const graphConfig = {
    directed: true,
    width: 1000
}

/**
 * ResultsWindow component designed to display a list of results and to handle
 * changing the results page and the order in which results are listed
 * Expects to receive in props: 
 * 'docs' a list of Document objects
 * page a int containing the current page
 * sortby a string describing how the results are sorted
 * resultsPerPage containing how many results there are per page
 * @todo Work out how to do a callback
 */
 class RelationResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {page: this.props.page, sortby: this.props.sortby, resultsPerPage: this.props.resultsPerPage}
    }
    
    render() { //The map build the result for each document
        return(
            <div style={{borderStyle: 'solid'}}>
            <Graph
                id="graph-id" // id is mandatory
                data={data}
                config={graphConfig}
            />;
        </div>
        )
    }
}

export default RelationResults
