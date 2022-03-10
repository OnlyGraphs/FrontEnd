import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';

/**
 * Simple component contains just a search box and a button to press
 * Expects to be passed a prop called 'callback' which it will call on click passing the query in the search box
 * TODO: Potentially consider an way to ensure it wont run with no query in it
 */
class SimpleSearch extends React.Component {
    constructor(props) {
      super(props);
      this.state = {query: this.props.query, currentTitles: this.props.titles};
      this.handleOnChange = this.handleOnChange.bind(this)
      this.handleClick = this.handleClick.bind(this);
      this.enterHunt = this.enterHunt.bind(this)
      this.filterTitles = this.filterTitles.bind(this)
      this.autocompleteOnChange = this.autocompleteOnChange.bind(this)
    }

    componentDidMount() {
      this.filterTitles(this.state.query) //Filters the titles down to the relevant ones once the component has loaded
    } //Otherwise it shows the default list

    /**
     * Handles the event in which the user presses the search button
     * @param {*} event 
     */
    handleClick(event) {
        if (this.state.query !== "" && typeof this.state.query !== "undefined") { //Doesn't allow the search to be done when nothing has been entered
          this.props.callback(this.state.query)
        }
    }

    /**
     * Handles changes to the query in the text box
     * @param {*} event 
     */
    handleOnChange(event) {
        this.setState({query: event.target.value}, this.filterTitles(event.target.value));
    }

    autocompleteOnChange(event, value) {
      this.setState({query: value}, this.handleClick)
    }

    /**
     * DOESN'T SEEM TO BE NEEDED
     * Watches the keystrokes the user uses, if they use the Enter key this should be equivalent to pressing the search button
     * @param {*} event 
     */
    enterHunt(event) {
        if (event.key == "Enter") {
            this.handleClick(event) //Just calls the same method as pressing the button would
        }
    }

    filterTitles(newQuery) {
      this.setState({currentTitles: this.props.titles.filter(title => title.includes(newQuery))})
    }
    
    render() {

      if (this.props.titles == null) {
        return(<p>Loading</p>)
      }

      return (
        <div>
          <Autocomplete
            freeSolo
            fullWidth
            value={this.state.query}
            id="combo-box-demo"
            options={this.state.currentTitles.slice(0,20)}
            onChange={this.autocompleteOnChange}
            onKeyUp={this.enterHunt} //Uses on key up to allow the autocomplete to fire first (hacky fix but whatever)
            renderInput={
              (params) => 
              <TextField 
                {...params}
                variant="outlined"
                value={this.state.query}
                onChange={this.handleOnChange}
              />
            }
          />
          <div style={{float: 'right'}}>
            <Button sx={{mr: 1}} variant="outlined" onClick={this.props.advancedCallback}>Advanced Search</Button>
            <Button variant="contained" onClick={this.handleClick} >Search</Button>
          </div>
        </div>
      );
    }
  }

  export default SimpleSearch;