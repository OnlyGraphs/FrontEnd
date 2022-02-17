import React from 'react';
import { CardContent, Typography, Card, Link } from '@mui/material';

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
                </CardContent>
            </Card>
        )
    }

    handleClick = () => {
        this.props.onClickCallback(this.props.title)
    }
}
export default Result;
