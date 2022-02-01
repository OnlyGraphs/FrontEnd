import Head from 'next/head'
import * as React from 'react';
import ReactDOM from 'react-dom';
import { useRouter } from 'next/router'

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

    return (
        <div>
            <p>{uri}</p>
        </div>
      )
}

export default Search