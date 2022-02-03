import React from 'react';
import { MenuItem, Select, TextField, InputLabel } from '@mui/material';

/**
 * Is the component to handle advanced searches, contains loads of boxes for stuff
 * @todo Add better validation so people can't put negative numbers in the distance box
 */
class AdvancedSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {query: ""}
  }

  /**
   * Handles the event in which the user presses the search button
   * @param {*} event 
   */
    handleClick(event) {
    if (this.state.query !== "") { //Doesn't allow the search to be done when nothing has been entered
      this.props.callback(this.state.query)
    }
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
      const standardSX = { mt: 1, width: 400 }
      return (
        <div>
          <TextField sx={standardSX} id="standard-basic" label="These Words" variant="standard" />
          <br></br>
          <TextField sx={standardSX} id="standard-basic" label="This Exact Phrase" variant="standard" />
          <br></br>
          <TextField sx={standardSX} id="standard-basic" label="None of these words" variant="standard" />
          <br></br>
          <TextField sx={standardSX} id="standard-basic" label="One of these words" variant="standard" />
          <br></br>
          <TextField sx={{ mt: 1, mr: 1, width: 200 }} id="standard-basic" label="First Word" variant="standard" />
          <TextField sx={{ mt: 1, mr: 1, width: 200 }} id="standard-basic" label="Second Word" variant="standard" />
          <TextField sx={{ mt: 1, width: 100 }} id="standard-basic" label="Distance" variant="standard" type="number"/>
          <br></br>
          <InputLabel sx={{mt: 1}} id="structLabel">Structural Element Search</InputLabel>
          <Select sx={{ mt: 2, width: 400 }} label="Structural Element" variant="standard" labelId='structLabel'>
            <MenuItem value={"Category"}>Category</MenuItem>
            <MenuItem value={"Citation"}>Citation</MenuItem>
            <MenuItem value={"Template (Info Box?)"}>Template (Info Box?)</MenuItem>
            <MenuItem value={"Title"}>Title</MenuItem>
          </Select>
          <TextField sx={{ mt: 0, ml: 1, width: 200 }} id="standard-basic" label="Search Term" variant="standard" />
        </div>
      );
    }
  }

  export default AdvancedSearch;