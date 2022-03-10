import Head from 'next/head'
import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import RelationResultsWindow from '../components/RelationalResultsWindow';
import nodeConst from 'react-d3-graph/lib/components/node/node.const';
import RelationSearch from '../components/RelationSearch';

function relationSearch() {
  const router = useRouter() //Gets up the router object to get the data about the URI parameter
  const { root, hops, query, maxResults } = router.query //Gets parameters

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
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)

  //Gets data from backend
  useEffect(() => {
    if (router.isReady) { //If the URL parameters have been fetched
      console.log(uri)
      setLoading(true)
      fetch(uri)
        .then((res) => res.text())
        .then((data) => {
          setData(data)
          setLoading(false)
        })
    }
  }, [router.query])

  //Loading Screen returned here (perhaps make this better)
  
  //Once the data has been fetched and populated into the data variable
  if (data != null) { //Checks if the data has been populated in the variable
    let jsonObj = JSON.parse(data)
    let graphData = convertToFormat(jsonObj)
    let abstractMap = makeAbstractMap(jsonObj)
    return (
      <div>
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
        abstractMap={abstractMap}
        feedbackCallback={(title) => returnFeedback(query, title)}
      />
      </div>
    )
  } 
  //For some reason there seems to be a delay between the loading finishing and the data being ready so this is here to catch it
  
  return (
    <div>
      <Head>
        <style>{'body { background-color: #d2d2d2; }'}</style>
      </Head>
      <div style={{display: 'flex', justifyContent: 'center'}}>
          <video src='./static/loadingSpin.mp4' width='960' height={540} loop={true} autoPlay={true}></video>
      </div>
    </div>
)
}

/**
 * Convert the API's response to the format I want for the graph
 * @param apiJSON 
 */
function convertToFormat(apiJSON) {
  let graphNodes = apiJSON.documents.map(node => convertNode(node))
  let relations = apiJSON.relations.map(link => convertRelation(link))
  return {nodes: graphNodes, links: relations}

}

function convertNode(node) {
  return {id: node.title}
}

function convertRelation(relation) {
  return {source: relation.source, target: relation.destination}
}

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
  alert(uri)
  router.push(uri)
};

function returnFeedback(query, resultTitle) {
  var uri = process.env.NEXT_PUBLIC_BACKEND + "/api/v1/feedback?query=" + encodeURIComponent(query ? query : "relational") + "&resultPage=0"
  if (resultTitle != null) {
      uri = uri + "&choosenResult=" + resultTitle
  }
  fetch(uri)
}

function returnToSearchResults(root, router) {
  router.push("/search?query=" + root)
}

export default relationSearch