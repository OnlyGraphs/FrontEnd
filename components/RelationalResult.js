import React from 'react';
import { CardContent, Typography, Card, Link, Button, Icon } from '@mui/material';


/**
 * Result component designed to display a single result in relational search (contains a subset of the functionality of the normal Result)
 * Expects to receive in props: 'title' and 'abstract' both strings
 */
class RelationalResult extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Card sx={{width: 1}}>
                <CardContent>
                    <Link variant="h5" target="_blank" rel="noopener">
                        {this.props.title}
                    </Link>
                    <p>
                        {this.props.abstract.substring(0,400) + "..."}
                    </p>
                </CardContent>
            </Card>
        )
    }

    /**
     * Returns feedback if the user click this and opens the page
     * @param {*} event 
     */
    handleClick = (event) => {
        this.props.feedbackCallback(this.props.title)
        window.open(this.state.wikiLink, '_blank')
    }
}
export default RelationalResult;
