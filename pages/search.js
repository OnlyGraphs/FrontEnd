import Head from 'next/head'
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useRouter } from 'next/router'
import SimpleSearch from '../components/SimpleSearch';
import ResultsWindow from '../components/ResultsWindow';
import { Link } from '@mui/material';

/**
 * This is the 'results' page, as in it takes as URI path parameters that contain the query,
 * this query is then sent to the API and the user hangs out waiting for that. Then when those results are back
 * they are displayed
 */
function Search() {
    const router = useRouter() //Gets up the router object to get the data about the URI parameter    

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
    const [loadingError, setLoadingError] = useState(false)
  
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

    //Sets variables for client side data fetching
    const [titles, setTitles] = useState(null)

    //Gets title data
    useEffect(() => {
        setData(null)
        fetch(process.env.NEXT_PUBLIC_BACKEND + "/static/articleTitles.txt")
        .then((res) => {
            if (res.status != 200) {
                setLoadingError(true)
                console.log(res.text())
            }
            return res.text()
        })
        .then((data) => {
            setTitles(data.split("\n"))
        })
        .catch((error) => {
            setLoadingError(true)
            console.log(error)
        })
    }, [])

    if (loadingError) {
        return(
            <div>
                <Head>
                    <title>OnlyGraphs - Error Loading</title>
                </Head>
                <Link href="/">
                    <img width={144} height={81} src='./static/coolLogo.png'/>
                </Link>
                <p>
                    There has been an error attempting to fetch your request. You can find more details in the console. You can return to the main page by clicking the logo above.
                    {data}
                </p>
            </div>
        )
    }
    
    //Once the data has been fetched and populated into the data variable
    if (data != null && titles != null) { //Checks if the data has been populated in the variable
        var jsonObj = JSON.parse(data) //It's parses, sorted and rendered in the return
        var docs = jsonObj.documents
        docs.sort(sortDocuments)
        docs.reverse()
        return (
            <div>
                <Head>
                    <title>OnlyGraphs - Results</title>
                </Head>
                <img onClick={() => goToIndex(router)} width={144} height={81} src='./static/coolLogo.png'/>
                <SimpleSearch 
                    callback={(val) => {makeRequest(val, null, null, null, router);}}
                    advancedCallback = {() => goToAdvanced(router)}
                    query={query}
                    titles={titles}
                    maxResultsShown={3}
                />
                <ResultsWindow 
                    docs={docs}
                    page={page ? page : 1}
                    sortby={sortBy ? sortBy : "relevance"}
                    resultsPerPage={resultsPerPage ? resultsPerPage : "20"}
                    loadTime = {loadTime}
                    domain = {jsonObj.domain}
                    suggestedQuery={jsonObj.suggested_query}
                    suggestionCallback={(query) => suggestionCallback(query, router)}
                    queryChangeCallback={(sortBy, page, resultsPerPage) => {makeRequest(query, sortBy, page, resultsPerPage, router);}}
                    feedbackCallback={(pageOfResult, resultTitle) => returnFeedback(query, pageOfResult, resultTitle)}
                    relationSearchCallback={(root) => startRelationalSearch(root, router)}
                />
            </div>
        )
    } else { //If the data has not yet arrived
        return (
            <div>
            <Head>
            <style>{'body { background-color: #d2d2d2; }'}</style>
            <title>Loading Results</title>
            </Head>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <video src='./static/loadingSpin.mp4' width='960' height={540} loop={true} autoPlay={true}></video>
            </div>
        </div>
        )
    }
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
    fetch(uri)
}

/**
 * Method called when the user selects relational search on a search result
 * @param {*} root The result for which the relation search was selected
 * @param {*} router The Next JS router object
 */
function startRelationalSearch(root, router) {
    router.push("/relationSearch?root=" + root + "&hops=1")
}

/**
 * Method called to move the user to the advanced search page
 * @param {*} router The Next JS router object
 */
function goToAdvanced(router) {
    router.push("/advanced")
  }

function goToIndex(router) {
    router.push("/")
}

/**
 * Comparison method that can be used to sort the results, standard method
 * @param {*} n1 First document
 * @param {*} n2 Second Document
 * @returns If >0 first document is before second, <0 second document is before first, =0 both documents are equal in place
 */
function sortDocuments(n1, n2) {
    return n1.score - n2.score;
}

function suggestionCallback(query, router){
    router.push("/search?query=" + encodeURIComponent(query))
}

export default Search