import React from 'react';
import { MenuItem, Select, TextField, InputLabel, Typography, Stack, Button } from '@mui/material';

/**
 * Is the component to handle advanced searches, contains loads of boxes for stuff
 * Expects to be passed 'callback' via which it can send a query
 * @todo Add better validation so people can't put negative numbers in the distance box
 */
class AdvancedSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      andBox: "", //State element for each input
      phraseBox: "",
      noneBox: "",
      orBox: "",
      distWord1: "",
      distWord2: "",
      dist: "",
      structType: "",
      structQuery: "",
      finalResult: ""
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  /**
   * Handles the event in which the user presses the search button
   * @param {*} event 
   */
  handleClick(event) {
    this.props.callback(this.buildFinalResult())
  }

  /**
   * Handles changes to the inputs in order to update the state
   * @param {*} event 
   */
  handleChange(event) {
    if (event.target.name == "andBox") {
      this.setState({andBox: event.target.value})
    } else if (event.target.name == "phraseBox") {
      this.setState({phraseBox: event.target.value})
    } else if (event.target.name == "noneBox") {
      this.setState({noneBox: event.target.value})
    } else if (event.target.name == "orBox") {
      this.setState({orBox: event.target.value})
    } else if (event.target.name == "distWord1") {
      this.setState({distWord1: event.target.value})
    } else if (event.target.name == "distWord2") {
      this.setState({distWord2: event.target.value})
    } else if (event.target.name == "dist") {
      this.setState({dist: event.target.value})
    } else if (event.target.name == "structType") {
      this.setState({structType: event.target.value})
    } else if (event.target.name == "structQuery") {
      this.setState({structQuery: event.target.value})
    }
  }

  /**
   * Method that is run to take all the data in the state that represents the inputs and builds
   * it into an actual query that can be sent to the backend
   * @returns 
   */
  buildFinalResult() {
    var individualBoxResults = [] //Contains the queries for each individual input, these are combined at the end of the method

    if (this.state.andBox != "") { //First checks if any data has been entered into the input
      var validTerms = this.state.andBox.split(" ").filter(term => term != "" && term != " ") //Splits out values and removes any empty string/spaces
      var andString = this.arrayFold(validTerms, ",AND,") //Folds them with AND which is this inputs operator
      individualBoxResults.push(andString) //Adds the result to the individual array
    }

    if (this.state.phraseBox != "") {
      individualBoxResults.push("\"" + this.state.phraseBox + "\"")
    }

    if (this.state.noneBox != "") {
      var validTerms = this.state.noneBox.split(" ").filter(term => term != "" && term != " ")
      var validTerms = validTerms.map(term => "NOT," + term)
      var notString = this.arrayFold(validTerms, ",AND,")
      individualBoxResults.push(notString)
    }

    if (this.state.orBox != "") {
      var validTerms = this.state.orBox.split(" ").filter(term => term != "" && term != " ")
      var ORString = this.arrayFold(validTerms, ",OR,")
      individualBoxResults.push(ORString)
    }

    if (this.state.dist != "" && this.state.distWord1 != "" && this.state.distWord2 != "") {
      var distString = "#DIST," + this.state.dist + "," + this.state.distWord1 + "," + this.state.distWord2
      individualBoxResults.push(distString)
    }

    if (this.state.structType != "" && this.state.structQuery != "") {
      var structString = "#" + this.state.structType + "," + this.state.structQuery
      individualBoxResults.push(structString)
    }

    return this.arrayFold(individualBoxResults, ",AND,") //At the end all the individual inputs are ANDed together
  }

  /**
   * My own form of a fold over an array. Used when I need to combined multiple strings with an operator between them
   * @param {*} array An array of strings
   * @param {*} operator A string to be placed between each element of the array
   * @returns 
   */
  arrayFold(array, operator) {
    var result = ""
    if (array.length == 1) { //If the array is of length 1 then no operators need to be put in
      return array[0]
    }
    for (let i = 0; i < array.length - 1; i++) {
      result = result + array[i] + operator //For each element of the string its added with an operator behind it
    }
    return result + array[array.length - 1] //To prevent a trailing operator the last element is added at the end
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
                <MenuItem value={"CATEGORY"}>Category</MenuItem>
                <MenuItem value={"CITATION"}>Citation</MenuItem>
                <MenuItem value={"INFOBOX_TEMPLATE_NAME"}>Template (Info Box?)</MenuItem>
                <MenuItem value={"TITLE"}>Title</MenuItem>
              </Select>
              <TextField sx={{ mt: 0, ml: 1, width: 200 }} name="structQuery" value={this.state.structQuery} label="Search Term" variant="standard" onChange={this.handleChange}/>
            </div>
            <Typography sx={{mt:4, ml:8.5}}>Will Search within the selected structual elements for the given search term(s)</Typography>
          </Stack>
          <Button sx={{mt: 4, ml: 2}} variant="contained" onClick={this.handleClick}>Search</Button>
        </div>
      );
    }
  }

  export default AdvancedSearch;