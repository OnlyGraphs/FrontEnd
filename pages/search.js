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

    /*
    //Code that runs on the route change, thought to be useful to gather when moving away to another query
    //But this has several issues first being that it doesn't know if a result has been picked (hence a new query)
    //Also it seems to trigger twice once with a new window being null
    useEffect(() => {
        const handleRouteChange = (url, { shallow }) => {
            var newQuery = new URLSearchParams(url).get("query")
            var currentQuery = new URLSearchParams(window.location.href).get("query")
            if (newQuery != currentQuery) {
                console.log("New Query: " + currentQuery + "->" + newQuery)
            } else {
                console.log("Same Query" + currentQuery + "->" + newQuery)
            }
        }
    
        router.events.on('routeChangeStart', handleRouteChange)
      }, [])
      */
    

    const { query, sortBy, page, resultsPerPage } = router.query //Gets parameters
    
    //The below line and 3 if statements take the parameters out of the URI and build them into a request for the backend
    var uri = process.env.NEXT_PUBLIC_BACKEND + "/api/v1/search?query=" +  encodeURIComponent(query)

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
    const [loadTime, setLoadTime] = useState(-1)
    const [isLoading, setLoading] = useState(false)
  
    //Gets data from backend
    useEffect(() => {
      if (router.isReady) { //If the URL parameters have been fetched
        var start = Date.now()
        console.log(uri)
        setLoading(true)
        fetch(uri)
        .then((res) => res.text())
        .then((data) => {
            setData(data)
            setLoading(false)
            setLoadTime(Date.now()-start)
        })
      }
    }, [router.query])

    //Sets variables for client side data fetching
    const [titles, setTitles] = useState(null)
    const [alsoLoading, setAlsoLoading] = useState(false)

    //Gets title data
    useEffect(() => {
        setAlsoLoading(true)
        fetch(process.env.NEXT_PUBLIC_BACKEND + "/static/articleTitles.txt")
        .then((res) => res.text())
        .then((data) => {
            setTitles(data.split("\n"))
            setAlsoLoading(false)
        })
    }, [])
    
    //Once the data has been fetched and populated into the data variable
    if (data != null && titles != null) { //Checks if the data has been populated in the variable
        var docs = JSON.parse(data) //It's parses, sorted and rendered in the return
        docs.sort(sortDocuments)
        docs.reverse()
        return (
            <div>
                <SimpleSearch 
                    callback={(val) => {makeRequest(val, null, null, null, router);}} 
                    advancedCallback = {() => goToAdvanced(router)}
                    query={query}
                    titles={titles}
                />
                <ResultsWindow 
                    docs={docs}
                    page={page ? page : 1}
                    sortby={sortBy ? sortBy : "relevance"}
                    resultsPerPage={resultsPerPage ? resultsPerPage : "20"}
                    loadTime = {loadTime}
                    queryChangeCallback={(sortBy, page, resultsPerPage) => {makeRequest(query, sortBy, page, resultsPerPage, router);}}
                    feedbackCallback={(pageOfResult, resultTitle) => returnFeedback(query, pageOfResult, resultTitle)}
                    relationSearchCallback={(root) => startRelationalSearch(root, router)}
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
 * This function is given as the callback for components on this page that might initalise a new search either with a new query 
 * or by changing the other parameters of the search it takes the query (and optionally othe details) and forms the search query and moves to that page
 * @param query Must be passed
 * @param sortBy
 * @param page
 * @param resultsPerPage
 * @param router
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
    router.push(uri)
};

/**
 * This function is given as the callback for components on this page that might return feedback after a result is selected 
 * @param query Must be passed
 * @param pageOfResult 
 * @param resultTitle 
 */
function returnFeedback(query, pageOfResult, resultTitle) {
    var uri = process.env.NEXT_PUBLIC_BACKEND + "/api/v1/feedback?query=" + encodeURIComponent(query) + "&resultPage=" + pageOfResult
    if (resultTitle != null) {
        uri = uri + "&choosenResult=" + resultTitle
    }
    console.log(uri)
    fetch(uri)
}

function startRelationalSearch(root, router) {
    router.push("/relationSearch?root=" + root + "&hops=1")
}

function goToAdvanced(router) {
    router.push("/advanced")
  }

function sortDocuments(n1, n2) {
    return n1.score - n2.score;
}

export default Search