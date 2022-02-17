import React from 'react';
import { MenuItem, Select, TextField, InputLabel, Typography, Stack } from '@mui/material';

/**
 * Is the component to handle advanced searches, contains loads of boxes for stuff
 * @todo Add better validation so people can't put negative numbers in the distance box
 */
class AdvancedSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {andBox: "", phraseBox: "", noneBox: "", orBox: "", distWord1: "", distWord2: "", dist: "", structType: "", structQuery: "", finalResult: ""}
    this.handleChange = this.handleChange.bind(this)
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

  handleChange(event) {
    if (event.target.name == "andBox") {
      this.setState({andBox: event.target.value}, this.buildFinalResult)
    } else if (event.target.name == "phraseBox") {
      this.setState({phraseBox: event.target.value}, this.buildFinalResult)
    } else if (event.target.name == "noneBox") {
      this.setState({noneBox: event.target.value}, this.buildFinalResult)
    } else if (event.target.name == "orBox") {
      this.setState({orBox: event.target.value}, this.buildFinalResult)
    } else if (event.target.name == "distWord1") {
      this.setState({distWord1: event.target.value}, this.buildFinalResult)
    } else if (event.target.name == "distWord2") {
      this.setState({distWord2: event.target.value}, this.buildFinalResult)
    } else if (event.target.name == "dist") {
      this.setState({dist: event.target.value}, this.buildFinalResult)
    } else if (event.target.name == "structType") {
      this.setState({structType: event.target.value}, this.buildFinalResult)
    } else if (event.target.name == "structQuery") {
      this.setState({structQuery: event.target.value}, this.buildFinalResult)
    }
  }

  buildFinalResult() {
    return ""
  }
    
    render() {
      const standardSX = { mt: 1, width: 400 }
      return (
        <div>
          <Stack direction="row">
            <TextField sx={standardSX} name="andBox" value={this.state.andBox} label="These Words" variant="standard" onChange={this.handleChange}/>
            <Typography sx={{mt:4, ml:34.5}}>Will Search for Pages with ALL of these words (Equivalent to an AND operation)</Typography>
          </Stack>
          <Stack direction="row">
            <TextField sx={standardSX} name="phraseBox" value={this.state.phraseBox} label="This Exact Phrase" variant="standard" onChange={this.handleChange}/>
            <Typography sx={{mt:4, ml:34.5}}>Will Search for Pages with these words in this exact order</Typography>
          </Stack>    
          <Stack direction="row">      
            <TextField sx={standardSX} name="noneBox" value={this.state.noneBox} label="None of these words" variant="standard" onChange={this.handleChange}/>
            <Typography sx={{mt:4, ml:34.5}}>Will Search for Pages without any of these words</Typography>
          </Stack>
          <Stack direction="row">
            <TextField sx={standardSX} name="orBox" value={this.state.orBox} label="One of these words" variant="standard" onChange={this.handleChange}/>
            <Typography sx={{mt:4, ml:34.5}}>Will Search for Pages without one of these words (Equivalent to an OR operation)</Typography>
          </Stack>
          <Stack direction="row"> 
            <div>
              <TextField sx={{ mt: 1, mr: 1, width: 200 }} name="distWord1" value={this.state.distWord1} label="First Word" variant="standard" onChange={this.handleChange}/>
              <TextField sx={{ mt: 1, mr: 1, width: 200 }} name="distWord2" value={this.state.distWord2} label="Second Word" variant="standard" onChange={this.handleChange}/>
              <TextField sx={{ mt: 1, width: 100 }} name="dist" value={this.state.dist} label="Distance" variant="standard" type="number" onChange={this.handleChange}/>
            </div>
            <Typography sx={{mt:4, ml:20}}>Will Search for these two words/phrases separated by the given distance</Typography>
          </Stack>
          <Stack direction="row">
            <div>
              <InputLabel sx={{mt: 1}} id="structLabel">Structural Element Search</InputLabel>
              <Select sx={{ mt: 2, width: 400 }} name="structType" value={this.state.structType} label="Structural Element" variant="standard" labelId='structLabel' onChange={this.handleChange}>
                <MenuItem value={"Category"}>Category</MenuItem>
                <MenuItem value={"Citation"}>Citation</MenuItem>
                <MenuItem value={"Template (Info Box?)"}>Template (Info Box?)</MenuItem>
                <MenuItem value={"Title"}>Title</MenuItem>
              </Select>
              <TextField sx={{ mt: 0, ml: 1, width: 200 }} name="structQuery" value={this.state.structQuery} label="Search Term" variant="standard" onChange={this.handleChange}/>
            </div>
            <Typography sx={{mt:4, ml:8.5}}>Will Search within the selected structual elements for the given search term(s)</Typography>
          </Stack>
        </div>
      );
    }
  }

  export default AdvancedSearch;