import Head from 'next/head'
import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import RelationResultsWindow from '../components/RelationalResultsWindow';
import nodeConst from 'react-d3-graph/lib/components/node/node.const';
import RelationSearch from '../components/RelationSearch';
import { Card, Typography, CardContent } from '@mui/material';

/**
 * The results page for relational searches
 */
function relationSearch() {
  const router = useRouter() //Gets up the router object to get the data about the URI parameter
  const { root, hops, query, maxResults } = router.query //Gets parameters

  //The below lines build the URI of the api request that will be made
  var uri = process.env.NEXT_PUBLIC_BACKEND + "/api/v1/relational?root=" +  encodeURIComponent(root)
  if (typeof hops !== 'undefined') {
      uri = uri + "&hops=" + hops
  }
  if (typeof query !== 'undefined') {
    uri = uri + "&query=" + query
  }
  if (typeof maxResults !== 'undefined') {
      uri = uri + "&maxResults=" + maxResults
  }
  

  //Sets variables for client side data fetching
  const [data, setData] = useState(null) //The search results
  const [loadingError, setLoadingError] = useState(false)
  const [loadTime, setLoadTime] = useState(-1) //The time it takes to get the response

  //Gets data from backend
  useEffect(() => {
    if (router.isReady) { //If the URL parameters have been fetched
      var start = Date.now()
      setData(null)
      fetch(uri)
        .then((res) => {
          if (res.status != 200) {
              setLoadingError(true)
              console.log(res.text())
          }
          return res.text()
        })        
        .then((data) => {
          setData(data)
          setLoadTime(Date.now()-start)
        })
        .catch((error) => {
          setLoadingError(true)
          console.log(error)
      })
    }
  }, [router.query])

  if (loadingError) {
    return(
        <div>
            <Head>
              <title>Only Graphs - Error Loading</title>
            </Head>
            <img onClick={() => goToIndex(router)} width={144} height={81} src='./static/coolLogo.png'/>
            <p>
                There has been an error attempting to fetch your request. You can find more details in the console.<br/>
                {data}
            </p>
        </div>
    )
  }
  
  //Once the data has been fetched and populated into the data variable
  if (data != null) { //Checks if the data has been populated in the variable
    let jsonObj = JSON.parse(data)
    let graphData = convertToFormat(jsonObj)
    let abstractMap = makeAbstractMap(jsonObj)
    console.log(graphData.nodes.length)
    if (graphData.nodes.length == 0) {
      return(
        <div>
          <Head>
            <title>Only Graphs - Relational Search Results</title>
          </Head>
        <RelationSearch 
          root={root} 
          hops={hops} 
          query={query} 
          maxResults={maxResults ? maxResults : 20}
          callback={(hops, query, maxResults) => makeRequest(root, hops, query, maxResults, router)}
          returnCallback={(root) => returnToSearchResults(root, router)}
        />
        <Card sx={{width: 1}}>
          <CardContent>
              <Typography sx={{color: 'red', textAlign: 'center'}} variant="h4">
                  No Results Found
              </Typography>
          </CardContent>
        </Card>
        </div>
      )
    } else {
      return (
        <div>
          <Head>
              <title>Only Graphs - Relational Search Results</title>
          </Head>
        <RelationSearch 
          root={root} 
          hops={hops} 
          query={query} 
          maxResults={maxResults ? maxResults : 20}
          callback={(hops, query, maxResults) => makeRequest(root, hops, query, maxResults, router)}
          returnCallback={(root) => returnToSearchResults(root, router)}
        />
        <RelationResultsWindow
          data={graphData}
          loadTime = {loadTime}
          abstractMap={abstractMap}
          domain = {jsonObj.domain}
          feedbackCallback={(title) => returnFeedback(query, title)}
        />
        </div>
      )
    }
  } else { //While still waiting for the data to arrive
    return (
      <div>
        <Head>
          <style>{'body { background-color: #d2d2d2; }'}</style>
          <title>Only Graphs - Loading</title>
        </Head>
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <video src='./static/loadingSpin.mp4' width='960' height={540} loop={true} autoPlay={true}></video>
        </div>
      </div>
    )
  }
}


/**
 * Convert the API's response to the format I need to pass to the graph in child components
 * @param apiJSON 
 */
function convertToFormat(apiJSON) {
  //console.log("Max Rank: " + maxScore)
  let graphNodes = apiJSON.documents.map(node => convertNode(node))
  let relations = apiJSON.relations.map(link => convertRelation(link))
  return {nodes: graphNodes, links: relations}

}

/**
 * Converts the node object from the API response to the node object for the graph
 * @param {*} node See API Docs for information on its structure
 * @returns 
 */
function convertNode(node) {
  var colour = "black"
  if (node.hops == 1) {
    colour = "#4691db"
  } else if(node.hops == 2) {
    colour = "#75ace4"
  } else if (node.hops == 3) {
    colour = "#a3c8ed"
  } else if (node.hops >= 4) {
    colour = "#d1e3f6"
  }

  return {
    id: node.title,
    color: colour,
    size: 100 + 600 * node.score
  }
}

/**
 * Converts the relation object from the API response to the relation object for the graph
 * @param {*} relation See API Docs for information on its structure
 * @returns 
 */
function convertRelation(relation) {
  return {source: relation.source, target: relation.destination}
}

/**
 * Builds a mapping between an article's title and its abstract, its used in child components to get the abstract for display
 * as the abstract is not part of the graph nodes
 * @param {*} apiJsonObj A Map from string to string
 * @returns 
 */
function makeAbstractMap(apiJsonObj) {
  var map = new Map()
  for (let i = 0; i < apiJsonObj.documents.length; i++) {
    map.set(apiJsonObj.documents[i].title, apiJsonObj.documents[i].abstract)
  }
  return map
}

/**
 * This function is given as the callback for components on this page that might initalise a new search either with a new query 
 * or by changing the other parameters of the search it takes the query (and optionally othe details) and forms the search query and moves to that page
 * @param query Must be passed
 * @param sortBy
 * @param page
 * @param resultsPerPage
 * @param router
 */
function makeRequest(root, hops, query, maxResults, router) {
  var uri = "/relationSearch?root=" + root
  //For each of the 3 optional elements they are checked and if not null they are added
  if (hops != null) {
      uri = uri + "&hops=" + hops
  } else {
    uri = uri + "&hops=1"
  }
  if (query != null) {
      uri = uri + "&query=" + encodeURIComponent(query)
  }
  if (maxResults != null) {
      uri = uri + "&maxResults=" + maxResults
  }
  router.push(uri)
};

/**
 * Method builds and sends user feedback to the API
 * @param {*} query The query being searched
 * @param {*} resultTitle The result that was selected
 */
function returnFeedback(query, resultTitle) {
  var uri = process.env.NEXT_PUBLIC_BACKEND + "/api/v1/feedback?query=" + encodeURIComponent(query ? query : "relational") + "&resultPage=0"
  if (resultTitle != null) {
      uri = uri + "&choosenResult=" + resultTitle
  }
  fetch(uri) //Note we do not care for the response, we are just sending data to the API
}

/**
 * Function that sends the user back to the search results for the chosen root node
 * @param {*} root The root node of the search
 * @param {*} router The Next JS router object
 */
function returnToSearchResults(root, router) {
  router.push("/search?query=" + root)
}

function goToIndex(router) {
  router.push("/")
}

export default relationSearch