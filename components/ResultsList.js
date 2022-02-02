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
    buildResult(doc) {
        return(
            <div>
                <Link href={"https://simple.wikipedia.org/wiki/" + doc.title} underline="none" target="_blank" rel="noopener">
                <ListItemButton>
                    <Result title={doc.title} abstract={doc.abstract}></Result>
                </ListItemButton>
                </Link>
                <Divider />
            </div>
        )
    }
    
    render() { //The map build the result for each document
        return(
            <List>
                {this.props.docs.map(doc => this.buildResult(doc))}
            </List>
        )
    }

}
export default ResultsList;
