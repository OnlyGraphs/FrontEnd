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
        var link = "https://simple.wikipedia.org/wiki/" + this.props.title
        return(
            <Card sx={{width: 1}} onClick={this.handleClick}>
                <CardContent>
                    <Link variant="h5" href={link} target="_blank" rel="noopener">
                        {this.props.title}
                    </Link>
                    <p>
                        {this.props.abstract}
                    </p>
                    <div style={{display: "flex", align: "center"}}>
                        <Icon name="graphIcon" fontSize='large'><img src="./static/relational.svg" onClick={this.handleClick}></img></Icon>
                        <Button name="graphButton" onClick={this.handleClick}>Graph Search</Button>
                    </div>
                </CardContent>
            </Card>
        )
    }

    handleClick = (event) => {
        console.log(event)
        if (event.target.name === "graphIcon" || event.target.name === "graphButton") {
            alert("Relation Search")
        } else {
            console.log("A")
            this.props.feedbackCallback(this.props.title)
            window.open("https://simple.wikipedia.org/wiki/" + this.props.title, '_blank')
        }
    }
}
export default Result;
