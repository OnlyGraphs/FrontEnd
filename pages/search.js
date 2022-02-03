import Head from 'next/head'
import * as React from 'react';
import ReactDOM from 'react-dom';
import { useRouter } from 'next/router'
import SimpleSearch from '../components/SimpleSearch';
import ResultsList from '../components/ResultsList';

/**
 * This is the 'results' page, as in it takes as URI path parameters that contain the query,
 * this query is then sent to the API and the user hangs out waiting for that. Then when those results are back
 * they are displayed
 */
function Search() {
    const router = useRouter()
    const { query, sortBy, page, resultsPerPage } = router.query
    //NEED TO CHANGE WHAT THE BELOW URI ROOT IS (Something about .env but that's not working for me)
    var uri = "reallyCoolExample.com/api/v1/search?query=" + query

    if (typeof sortBy !== 'undefined') {
        uri = uri + "?sortBy=" + sortBy
    }
    if (typeof page !== 'undefined') {
        uri = uri + "?page=" + page
    }
    if (typeof resultsPerPage !== 'undefined') {
        uri = uri + "?resultsPerPage=" + resultsPerPage
    }

    //results = fetch(uri)
    //Take those results and push them into a results component

    //Sort the results
    docs.sort(sortDocuments)
    docs.reverse()

    return (
        <div>
            <SimpleSearch callback={(val) => {makeRequest(val, router);}} query={query}></SimpleSearch>
            <ResultsList docs={docs}></ResultsList>
        </div>
    )
}

/**
 * This function is given as the callback for the simple search, it takes the query and forms the search query and moves to that page
 */
function makeRequest(simpleQuery, router) {
    var pathVariable = "/search?query=" + encodeURIComponent(simpleQuery)
    //alert(pathVariable)
    router.push(pathVariable) //Sends the user to the 'results' page
};

function sortDocuments(n1, n2) {
    return n1.score - n2.score;
}

//Example documents
var doc1 = {title: "Apple", score: 10, abstract: "Apple is the edible fruit of a number of trees, known for this juicy, green or red fruits. The tree (Malus spp.) is grown worldwide. Its fruit is low-cost, and is harvested all over the world. "}
var doc2 = {title: "Waterfall", score: 500, abstract: "A waterfall is a place where water rushes down a steep ledge. The water flows from higher land, then it falls down a big step of rock to lower land of softer rock where it will continue on its journey. Usually the lower land is in a gorge. Waterfalls are usually made when a river is young, in places where softer rock is underneath harder rock in the waterfalls "}
var doc3 = {title: "Venezuela", score: 50, abstract: "Venezuela is a country in northern South America. Its official name is República Bolivariana de Venezuela (Bolivarian Republic of Venezuela). The official language is Spanish, and the capital is Caracas."}

var docs = [doc2, doc1, doc3]

export default Search