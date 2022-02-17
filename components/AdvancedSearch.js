import React from 'react';
import { MenuItem, Select, TextField, InputLabel, Typography, Stack } from '@mui/material';

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
          <Stack direction="row">
            <TextField sx={standardSX} id="standard-basic" label="These Words" variant="standard" />
            <Typography sx={{mt:4, ml:34.5}}>Will Search for Pages with ALL of these words (Equivalent to an AND operation)</Typography>
          </Stack>
          <Stack direction="row">
            <TextField sx={standardSX} id="standard-basic" label="This Exact Phrase" variant="standard" />
            <Typography sx={{mt:4, ml:34.5}}>Will Search for Pages with these words in this exact order</Typography>
          </Stack>    
          <Stack direction="row">      
            <TextField sx={standardSX} id="standard-basic" label="None of these words" variant="standard" />
            <Typography sx={{mt:4, ml:34.5}}>Will Search for Pages without any of these words</Typography>
          </Stack>
          <Stack direction="row">
            <TextField sx={standardSX} id="standard-basic" label="One of these words" variant="standard" />
            <Typography sx={{mt:4, ml:34.5}}>Will Search for Pages without one of these words (Equivalent to an OR operation)</Typography>
          </Stack>
          <Stack direction="row"> 
            <div>
              <TextField sx={{ mt: 1, mr: 1, width: 200 }} id="standard-basic" label="First Word" variant="standard" />
              <TextField sx={{ mt: 1, mr: 1, width: 200 }} id="standard-basic" label="Second Word" variant="standard" />
              <TextField sx={{ mt: 1, width: 100 }} id="standard-basic" label="Distance" variant="standard" type="number"/>
            </div>
            <Typography sx={{mt:4, ml:20}}>Will Search for these two words/phrases separated by the given distance</Typography>
          </Stack>
          <Stack direction="row">
            <div>
              <InputLabel sx={{mt: 1}} id="structLabel">Structural Element Search</InputLabel>
              <Select sx={{ mt: 2, width: 400 }} label="Structural Element" variant="standard" labelId='structLabel'>
                <MenuItem value={"Category"}>Category</MenuItem>
                <MenuItem value={"Citation"}>Citation</MenuItem>
                <MenuItem value={"Template (Info Box?)"}>Template (Info Box?)</MenuItem>
                <MenuItem value={"Title"}>Title</MenuItem>
              </Select>
              <TextField sx={{ mt: 0, ml: 1, width: 200 }} id="standard-basic" label="Search Term" variant="standard" />
            </div>
            <Typography sx={{mt:4, ml:8.5}}>Will Search within the selected structual elements for the given search term(s)</Typography>
          </Stack>
        </div>
      );
    }
  }

  export default AdvancedSearch;