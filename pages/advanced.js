import Head from 'next/head'
import * as React from 'react';
import ReactDOM from 'react-dom';
import { useRouter } from 'next/router'
import AdvancedSearch from '../components/AdvancedSearch';

/**
 * The advanced search page, mostly just a page for the AdvancedSearch component which contains
 * the method for users to make advanced searches using AND, OR, NOT, structural searches etc.
 */
function Advanced() {
    const router = useRouter()
    return(
        <div>
        <Head>
            <title>OnlyGraphs - Advanced Search</title>
        </Head>
        <AdvancedSearch callback={(query) => makeRequest(query, null, null, null, router)}></AdvancedSearch>
        </div>
    )
}

/**
 * This function is given as the callback for components on this page that might initialise a new search either with a new query 
 * or by changing the other parameters of the search it takes the query (and optionally other details) and forms the search query and moves to that page
 * @param query The seach query, Must be passed
 * @param sortBy How to sort the results (either "relevance" or "lastEdited"). Optional, null if not required
 * @param page The page of results to show. Optional, null if not required
 * @param resultsPerPage How many results should be shown on a page. Optional, null if not required
 * @param router The Next JS router object, required
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