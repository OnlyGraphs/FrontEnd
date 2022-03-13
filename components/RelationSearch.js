import React from 'react';
import {Button, TextField, Select, MenuItem, InputLabel, Stack} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

/**
 * Simple component contains just a search box and a button to press
 * Expects to be passed a prop called 'callback' which it will call on click passing the query in the search box
 * TODO: Potentially consider an way to ensure it wont run with no query in it
 */
class RelationSearch extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        root: this.props.root,
        hops: this.props.hops,
        query: this.props.query,
        maxResults: this.props.maxResults
      };
      this.handleOnChange = this.handleOnChange.bind(this)
      this.handleClick = this.handleClick.bind(this);
      this.enterHunt = this.enterHunt.bind(this)
      this.handleReturn = this.handleReturn.bind(this)
    }

    /**
     * Handles the event in which the user presses the search button
     * @param {*} event 
     */
    handleClick(event) {
        this.props.callback(
          this.state.hops,
          this.state.query,
          this.state.maxResults
        )
    }

    /**
     * Handles changes to the inputs
     * @param {*} event 
     */
    handleOnChange(event) {
        if (event.target.name == "hops") {
          this.setState({hops: event.target.value})
        } else if (event.target.name == "query") {
          this.setState({query: event.target.value})
        } else {
          this.setState({maxResults: event.target.value})
        }
    }

    /**
     * Method designed to handle the user returning from relational search to the normal search results
     * @param {} event 
     */
    handleReturn(event) {
      this.props.returnCallback(this.state.root)
    }

    /**
     * Watches the keystrokes the user uses, if they use the Enter key this should be equivalent to pressing the search button
     * @param {*} event 
     */
    enterHunt(event) {
        if (event.key == "Enter") {
            this.handleClick(event) //Just calls the same method as pressing the button would
        }
    }
    
    render() {
      return (
        <div>
            <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={this.handleReturn}>
              Return to results
            </Button>
            <Stack direction="row" spacing={2} sx={{mb: 1, mt: 1}}>
              <Stack>
                <InputLabel id="coolLabel2">Root</InputLabel>
                <TextField disabled labelId='coolLabel2' variant="outlined" value={this.state.root} onChange={this.handleOnChange} onKeyPress={this.enterHunt}></TextField>
              </Stack>
              <Stack>
                <InputLabel id="coolLabel">Hops</InputLabel>
                <Select name="hops" labelId='coolLabel' value={this.state.hops} onChange={this.handleOnChange}>
                  <MenuItem value={"1"}>1</MenuItem>
                  <MenuItem value={"2"}>2</MenuItem>
                  <MenuItem value={"3"}>3</MenuItem>
                  <MenuItem value={"4"}>4</MenuItem>
                </Select>
              </Stack>
              <Stack>
                <InputLabel id="coolLabel7">Query</InputLabel>
                <TextField labelId='coolLabel7' name="query" variant="outlined" value={this.state.query} onChange={this.handleOnChange} onKeyPress={this.enterHunt}></TextField>
              </Stack>
              <Stack>
                <InputLabel id="coolLabel1">Max Results</InputLabel>
                <Select name="maxResults" labelId='coolLabel1' value={this.state.maxResults} onChange={this.handleOnChange}>
                  <MenuItem value={"5"}>5</MenuItem>
                  <MenuItem value={"10"}>10</MenuItem>
                  <MenuItem value={"20"}>20</MenuItem>
                  <MenuItem value={"50"}>50</MenuItem>
                  <MenuItem value={"100"}>100</MenuItem>
                </Select>
              </Stack>
            </Stack>
            <Button variant="contained" onClick={this.handleClick} sx={{mb:2}}>Search</Button>
        </div>
      );
    }
  }

  export default RelationSearch;