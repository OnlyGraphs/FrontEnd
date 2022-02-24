import React from 'react';
import ResultsList from './ResultsList';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { IconButton, Button, ButtonGroup, Select, MenuItem } from '@mui/material';

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
 class ResultsWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {page: this.props.page, sortby: this.props.sortby, resultsPerPage: this.props.resultsPerPage}
        this.handleBackClick = this.handleBackClick.bind(this)
        this.handleForwardClick = this.handleForwardClick.bind(this)
        this.handleOrderChange = this.handleOrderChange.bind(this)
        this.handlePerPageChange = this.handlePerPageChange.bind(this)
    }
    
    render() { //The map build the result for each document
        return(
            <div>
                <div style={{display: "flex", align: "center"}}>
                    <ButtonGroup sx={{mt: 2}}>
                        <IconButton onClick={this.handleBackClick}>
                            <ArrowBackIcon />
                        </IconButton>
                        <Button variant="contained">
                            {this.state.page}
                        </Button>
                        <IconButton onClick={this.handleForwardClick}>
                            <ArrowForwardIcon />
                        </IconButton>
                    </ButtonGroup>
                    
                    <Select value={this.state.sortby} sx={{mt: 2}} onChange={this.handleOrderChange}>
                        <MenuItem disabled value="">
                            <em>Sort By</em>
                        </MenuItem>
                        <MenuItem value={"relevance"}>Relevance</MenuItem>
                        <MenuItem value={"lastEdited"}>Last Edited</MenuItem>
                    </Select>
                </div>
                <ResultsList docs={this.props.docs} feedbackCallback={(resultTitle) => this.props.feedbackCallback(this.state.page, resultTitle)}></ResultsList>

                <Select value={this.state.resultsPerPage} onChange={this.handlePerPageChange}>
                    <MenuItem disabled value="">
                        <em>Results Displayed per Page</em>
                    </MenuItem>
                    <MenuItem value={"5"}>5</MenuItem>
                    <MenuItem value={"10"}>10</MenuItem>
                    <MenuItem value={"20"}>20</MenuItem>
                    <MenuItem value={"50"}>50</MenuItem>
                    <MenuItem value={"100"}>100</MenuItem>
                </Select>
                <div><p style={{fontSize: 10}}>Relational Graph Icon made from <a href="http://www.onlinewebfonts.com/icon">Icon Fonts</a> is licensed by CC BY 3.0</p></div>
            </div>
        )
    }

    handleBackClick = () => {
        if (this.state.page !== "1") {
            var newPage = (Number(this.state.page) - 1).toString()
            this.setState({page: newPage}, this.props.queryChangeCallback(this.state.sortby, newPage, this.state.resultsPerPage))
        }
    }

    handleForwardClick = () => {
        if (this.state.page !== "0") {
            var newPage = (Number(this.state.page) + 1).toString()
            this.setState({page: newPage}, this.props.queryChangeCallback(this.state.sortby, newPage, this.state.resultsPerPage))
        }
    }

    handleOrderChange = (event) => {
        this.setState({sortby: event.target.value}, this.props.queryChangeCallback(event.target.value, this.state.page, this.state.resultsPerPage))
    }

    handlePerPageChange = (event) => {
        this.setState({resultsPerPage: event.target.value}, this.props.queryChangeCallback(this.state.sortby, this.state.page, event.target.value))
    }

}
export default ResultsWindow;
