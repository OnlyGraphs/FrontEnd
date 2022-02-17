import Head from 'next/head'
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useRouter } from 'next/router'
import SimpleSearch from '../components/SimpleSearch';
import ResultsWindow from '../components/ResultsWindow';

/**
 * This is the 'results' page, as in it takes as URI path parameters that contain the query,
 * this query is then sent to the API and the user hangs out waiting for that. Then when those results are back
 * they are displayed
 */
function Search() {
    const router = useRouter() //Gets up the router object to get the data about the URI parameter
    const { query, sortBy, page, resultsPerPage } = router.query //Gets parameter
    
    //The below line and 3 if statements take the parameters out of the URI and build them into a request for the backend
    var uri = process.env.NEXT_PUBLIC_BACKEND + "/api/v1/search?query=" + query

    if (typeof sortBy !== 'undefined') {
        uri = uri + "&sortBy=" + sortBy
    }
    if (typeof page !== 'undefined') {
        uri = uri + "&page=" + page
    }
    if (typeof resultsPerPage !== 'undefined') {
        uri = uri + "&resultsPerPage=" + resultsPerPage
    }

    //Sets variables for client side data fetching
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)
  
    //Gets data from backend
    useEffect(() => {
      setLoading(true)
      fetch(uri)
        .then((res) => res.text())
        .then((data) => {
          setData(data)
          setLoading(false)
        })
    }, [])
  
    //Loading Screen returned here (perhaps make this better)
    if (isLoading) return <p>Loading...</p>
    
    //Once the data has been fetched and populated into the data variable
    if (data != null) { //Checks if the data has been populated in the variable
        var docs = JSON.parse(data) //It's parses, sorted and rendered in the return
        docs.sort(sortDocuments)
        docs.reverse()
        return (
            <div>
                <SimpleSearch callback={(val) => {makeRequest(val, null, null, null, router);}} query={query}></SimpleSearch>
                <ResultsWindow 
                    docs={docs} 
                    page={1} 
                    sortby={"lastEdited"} 
                    resultsPerPage={"10"} 
                    callback={(sortBy, page, resultsPerPage) => {makeRequest(query, sortBy, page, resultsPerPage, router);}}
                />
            </div>
        )
    }
    
    //For some reason there seems to be a delay between the loading finishing and the data being ready so this is here to catch it
    return <p>Still Loading</p>
}

/**
 * This function is given as the callback for components on this page that might initalise a new search either with a new query 
 * or by changing the other parameters of the search it takes the query (and optionally othe details) and forms the search query and moves to that page
 * @param query Must be passed
 * @param sortBy Optional, null if not required
 * @todo Allow this to accept page, sortby and results per page
 */
function makeRequest(query, sortBy, page, resultsPerPage, router) {
    var uri = "/search?query=" + encodeURIComponent(query)
    //For each of the 3 optional elements they are checked and if not null they are added
    if (sortBy != null) {
        uri = uri + "&sortBy=" + sortBy
    }
    if (page != null) {
        uri = uri + "&page=" + page
    }
    if (resultsPerPage != null) {
        uri = uri + "&resultsPerPage=" + resultsPerPage
    }
    alert(uri)
    router.push(uri)
};

function sortDocuments(n1, n2) {
    return n1.score - n2.score;
}

//Example documents
var doc1 = {title: "Apple", score: 10, abstract: "Apple is the edible fruit of a number of trees, known for this juicy, green or red fruits. The tree (Malus spp.) is grown worldwide. Its fruit is low-cost, and is harvested all over the world. "}
var doc2 = {title: "Waterfall", score: 500, abstract: "A waterfall is a place where water rushes down a steep ledge. The water flows from higher land, then it falls down a big step of rock to lower land of softer rock where it will continue on its journey. Usually the lower land is in a gorge. Waterfalls are usually made when a river is young, in places where softer rock is underneath harder rock in the waterfalls "}
var doc3 = {title: "Venezuela", score: 50, abstract: "Venezuela is a country in northern South America. Its official name is República Bolivariana de Venezuela (Bolivarian Republic of Venezuela). The official language is Spanish, and the capital is Caracas."}

var testDocs = [doc2, doc1, doc3]

export default Search