import Head from 'next/head'
import * as React from 'react';
import ReactDOM from 'react-dom';
import { useRouter, withRouter } from 'next/router'
import SimpleSearch from '../components/SimpleSearch';

/**
 * This function is given as the callback for the simple search, it takes the query and forms the search query and moves to that page
 */
function makeRequest(simpleQuery, router) {
  var pathVariable = "/search?query=" + encodeURIComponent(simpleQuery)
  alert(pathVariable)
  router.push(pathVariable) //Sends the user to the 'results' page
}

/**
 * Displays the basic homepage that contains just a simple search
 */
function Home() {
  const router = useRouter()
  return (
    <div style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}>
      <img src='./static/tempLogo.jpg'width='500' height={456}></img>
      <br></br>
      <SimpleSearch callback={(val) => {makeRequest(val, router);}}></SimpleSearch>
    </div>
  )
}

export default Home