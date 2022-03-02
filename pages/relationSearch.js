import Head from 'next/head'
import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import RelationResults from '../components/RelationalResultsWindow';
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
  if (isLoading) return <p>Loading...</p>
  
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
      />
      <RelationResults 
        data={graphData} 
        abstractMap={abstractMap}
      />
      </div>
    )
  } 
  //For some reason there seems to be a delay between the loading finishing and the data being ready so this is here to catch it
  return <p>Still Loading</p>
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

export default relationSearch