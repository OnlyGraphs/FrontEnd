import React from 'react';
import Result from './Result';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import Link from '@mui/material/Link'

/**
 * ResultsList component designed to display a list of results
 * Expects to receive in props: 'docs' a list of Document objects
 */
 class ResultsList extends React.Component {
    constructor(props) {
        super(props);
    }

    //Takes in one document object and then builds the relevant components to display that document
    buildResult(doc, id) {
        return(
            <div>
                <ListItemButton>
                    <Result 
                        id={id} 
                        title={doc.title} 
                        abstract={doc.abstract} 
                        feedbackCallback={this.props.feedbackCallback}
                        relationSearchCallback = {this.props.relationSearchCallback}
                    />
                </ListItemButton>
                <Divider />
            </div>
        )
    }
    
    render() { //The map build the result for each document
        if (this.props.docs.length == 0) {
            return(
                <div>
                    <p>Not Results Found</p>
                </div>
            )
        } else {
            return(
                <List>
                    {this.props.docs.map((doc, i, _) => this.buildResult(doc, i))}
                </List>
            )
        }
    }

}
export default ResultsList;
