import Head from 'next/head'
import * as React from 'react';
import ReactDOM from 'react-dom';
import { useRouter } from 'next/router'
import AdvancedSearch from '../components/AdvancedSearch';

function Advanced() {
    const router = useRouter()
    return(
        <AdvancedSearch callback={(query) => makeRequest(query, null, null, null, router)}></AdvancedSearch>
    )
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
    router.push(uri)
};

export default Advanced