import React from 'react';
import {Button, ButtonGroup} from '@mui/material';
import { Graph } from "react-d3-graph";
import RelationalResult from './RelationalResult';


const graphConfig = {
    directed: true,
    width: 1900,
    height: 600,
    nodeHighlightBehavior: true,
    linkHighlightBehavior: true,
    highlightDegree: 2,
    d3: {
        linkLength: 400,
        gravity: -300
    },
    node: {
        color: "lightgray",
        labelPosition: "top",
        highlightStrokeColor: "black",
        highlightColor: "lightblue",
        labelProperty: "Dave"
    },
    link: {
        highlightColor: "blue",
    }
}

/**
 * Displays the results of a relational search in a graph
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

    /**
     * Method called when a use clicks on a node, sends feedback and then opens the article
     * @param {*} title The id of the node (i.e. the title of the article)
     */
    onClickNode = (title) => {
        this.props.feedbackCallback(title)
        window.open("https://simple.wikipedia.org/wiki/" + title, '_blank')
    };

    /**
     * Method called when a user hovers over a node, displays the articles abstract below the graph
     * @param {*} title The id of the node (i.e. the title of the article)
     */
    onHoverIn = (title) => {
        var abstract = this.props.abstractMap.get(title)
        this.setState({currentAbstract: abstract, currentTitle: title})
    }

    /**
     * Method called when a user stops hovering over a node, sets the default text in the result section
     * @param {*} title The id of the node (i.e. the title of the article)
     */
    onHoverOut = (title) => {
        this.setState({currentAbstract: "Hover over a node to see the abstract, click on a node to open the linked page", currentTitle: ""})
        
    }
    
    render() {
        return(
            <div sx={{width: 1800}}>
            <div style={{borderStyle: 'solid'}}>
            <Graph
                id="graph-id" // id is mandatory
                data={this.props.data}
                config={graphConfig}
                onClickNode = {this.onClickNode}
                //onMouseOverNode={this.onHoverIn}
                //onMouseOutNode={this.onHoverOut}
            />
        </div>
        <RelationalResult title={this.state.currentTitle} abstract={this.state.currentAbstract} />
        </div>
        )
    }
}

export default RelationResultsWindow
