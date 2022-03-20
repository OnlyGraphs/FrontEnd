import React from 'react';
import { CardContent, Typography, Card, Link, Button, Icon } from '@mui/material';


/**
 * Result component designed to display a single result
 * Expects to receive in props: 'title' and 'abstract' both strings
 */
class Result extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Card sx={{width: 1}} onClick={this.handleClick}>
                <CardContent>
                    <Typography sx={{textDecoration: 'underline', color: 'blue'}} variant="h5">
                        {this.props.title}
                    </Typography>
                    <p>
                        {this.props.abstract.substring(0,400) + "..."}
                    </p>
                    <div style={{display: "flex", align: "center"}}>
                        <Icon name="graphIcon" fontSize='large'><img name="graphIcon" src="./static/relational.svg" onClick={this.handleClick}></img></Icon>
                        <Button name="graphButton" onClick={this.handleClick}>Graph Search</Button>
                    </div>
                </CardContent>
            </Card>
        )
    }

    /**
     * Handles a user clicking any of the buttons on the result
     * @param {} event 
     */
    handleClick = (event) => {
        console.log(event)
        if (event.target.name === "graphIcon" || event.target.name === "graphButton") { //If its the one that sets off a relational search
            this.props.relationSearchCallback(this.props.title)
        } else { //Otherwise its presumed to be trying to open the search result
            this.props.feedbackCallback(this.props.title)
            window.open("https://" + this.props.domain + ".wikipedia.org/wiki/" + this.props.title, '_blank')
        }
    }
}
export default Result;
