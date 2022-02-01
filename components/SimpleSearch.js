import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

/**
 * Simple component contains just a search box and a button to press
 * Expects to be passed a prop called 'callback' which it will call on click passing the query in the search box
 */
class SimpleSearch extends React.Component {
    constructor(props) {
      super(props);
      this.state = {query: ""};
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
        this.setState({query: event.target.value});
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
            <TextField fullWidth id="outlined-basic" variant="outlined" value={this.state.query} onChange={this.handleOnChange} onKeyPress={this.enterHunt}></TextField>
            <Button variant="contained" onClick={this.handleClick}>Search</Button>
        </div>
      );
    }
  }

  export default SimpleSearch;