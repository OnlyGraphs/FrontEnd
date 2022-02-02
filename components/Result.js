import React from 'react';
import Card from '@mui/material/Card';
import { CardContent } from '@mui/material';
import Typography from '@mui/material/Typography';

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
            <Card sx={{width: 1}}>
                <CardContent>
                    <Typography variant="h4">
                        <a href={link} target="_blank" rel="noopener">{this.props.title}</a>
                    </Typography>
                    <p>
                        {this.props.abstract}
                    </p>
                </CardContent>
            </Card>
        )
    }

}
export default Result;
