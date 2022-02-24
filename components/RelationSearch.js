import React from 'react';
import {Button, TextField, Select, MenuItem, InputLabel} from '@mui/material'

/**
 * Simple component contains just a search box and a button to press
 * Expects to be passed a prop called 'callback' which it will call on click passing the query in the search box
 * TODO: Potentially consider an way to ensure it wont run with no query in it
 */
class RelationSearch extends React.Component {
    constructor(props) {
      super(props);
      this.state = {root: this.props.root, hops: this.props.hops, query: this.props.query, maxResults: this.props.maxResults};
      this.handleOnChange = this.handleOnChange.bind(this)
      this.handleClick = this.handleClick.bind(this);
      this.enterHunt = this.enterHunt.bind(this)
    }

    /**
     * Handles the event in which the user presses the search button
     * @param {*} event 
     */
    handleClick(event) {
        this.props.callback(this.state.query)
    }

    /**
     * Handles changes to the query in the text box
     * @param {*} event 
     */
    handleOnChange(event) {
        this.setState({});
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
            <TextField disabled id="outlined-basic" variant="filled" label="Root" value={this.state.root} onChange={this.handleOnChange} onKeyPress={this.enterHunt}></TextField>
            <InputLabel sx={{mt: 1}} id="structLabel">Number of Hops</InputLabel>
            <Select sx={{ mt: 2, width: 100 }} name="structType" value={this.state.hops} label="Structural Element" variant="standard" labelId='structLabel' onChange={this.handleChange}>
              <MenuItem value={"1"}>1</MenuItem>
              <MenuItem value={"2"}>2</MenuItem>
              <MenuItem value={"3"}>3</MenuItem>
              <MenuItem value={"4"}>4</MenuItem>
            </Select>
            <TextField variant="outlined" value={this.state.query} onChange={this.handleOnChange} onKeyPress={this.enterHunt}></TextField>
            <Select value={this.state.maxResults}>
              <MenuItem disabled value="">
                  <em>Results Displayed per Page</em>
              </MenuItem>
              <MenuItem value={"5"}>5</MenuItem>
              <MenuItem value={"10"}>10</MenuItem>
              <MenuItem value={"20"}>20</MenuItem>
              <MenuItem value={"50"}>50</MenuItem>
              <MenuItem value={"100"}>100</MenuItem>
            </Select>

            <Button variant="contained" onClick={this.handleClick} style={{float: 'right'}}>Search</Button>
        </div>
      );
    }
  }

  export default RelationSearch;