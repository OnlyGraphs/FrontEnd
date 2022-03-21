import React from 'react';
import Result from './Result';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import { Card, Typography, CardContent } from '@mui/material';
import Link from '@mui/material/Link'

/**
 * ResultsList component designed to display a list of results
 * Expects to receive in props: 'docs' a list of Document objects
 */
 class ResultsList extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this)
    }

    onClick = () => {
        this.props.suggestionCallback(this.props.suggestedQuery)
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
                        domain = {this.props.domain}
                        feedbackCallback={this.props.feedbackCallback}
                        relationSearchCallback = {this.props.relationSearchCallback}
                    />
                </ListItemButton>
                <Divider />
            </div>
        )
    }

    noResults() {
        return (
            <Card sx={{width: 1}}>
                <CardContent>
                    <Typography sx={{color: 'red', textAlign: 'center'}} variant="h4">
                        No Results Found
                    </Typography>
                </CardContent>
            </Card>
        )
    }

    suggestionBox(thing) {
        if (thing != "" && typeof thing != "undefined") {
            return (
                <ListItemButton onClick={this.onClick}>
                    <Card sx={{width: 1}}>
                        <CardContent>
                            <Typography sx={{color: 'black'}} variant="h5">
                                Did you mean: {thing}
                            </Typography>
                        </CardContent>
                    </Card>
                </ListItemButton>
            )
        } else {
            return <div></div>
        }
    }

    
    render() { //The map build the result for each document
        if (this.props.docs.length == 0) {
            return(
                <div>
                    {this.suggestionBox()}
                    {this.noResults()}
                </div>
            )
        } else {
            return(
                <List>
                    {this.suggestionBox(this.props.suggestedQuery)}
                    {this.props.docs.map((doc, i, _) => this.buildResult(doc, i))}
                </List>
            )
        }
    }

}
export default ResultsList;
