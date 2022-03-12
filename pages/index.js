import Head from 'next/head'
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useRouter, withRouter } from 'next/router'
import SimpleSearch from '../components/SimpleSearch';

/**
 * Displays the basic homepage that contains just a simple search
 */
function Home() {
  const router = useRouter()

    //Sets variables for client side data fetching, fetches the data to be used in the autocomplete
    const [titles, setTitles] = useState(null)
    const [isLoading, setLoading] = useState(false)

    //Gets title data
    useEffect(() => {
      setLoading(true)
        fetch(process.env.NEXT_PUBLIC_BACKEND + "/static/articleTitles.txt")
        .then((res) => res.text())
        .then((data) => {
            setTitles(data.split("\n"))
            setLoading(false)
        })
    }, [])

  if (!isLoading && titles !=null) { //Once the client side fetching is complete the main welcome page can be displayed
    return (
      <div style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}>
        <video src='./static/output.mp4' width='960' height={540} loop={false} autoPlay={true}></video>
        <br></br>
        <SimpleSearch 
          callback={(val) => {makeRequest(val, router);} }
          advancedCallback={() => goToAdvanced(router)}
          titles={titles}
        />
      </div>
    )
  } else { //If the client side has not yet loaded a loading screen is shown
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
}

/**
 * This function is given as the callback for the simple search, it is given the query and moves to the search page
 * @param simpleQuery The search query to be made
 * @param router The Next JS router object
 */
 function makeRequest(simpleQuery, router) {
  var pathVariable = "/search?query=" + encodeURIComponent(simpleQuery)
  router.push(pathVariable) //Sends the user to the search page
}

/**
 * Call back used to send the user to the advanced page when they click the advanced search button
 * @param {} router 
 */
function goToAdvanced(router) {
  router.push("/advanced")
}

export default Home