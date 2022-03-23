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
    const [loadingError, setLoadingError] = useState(false)

    //Gets title data
    useEffect(() => {
      setLoading(true)
      setLoadingError(false)
      setTitles(null)
        fetch(process.env.NEXT_PUBLIC_BACKEND + "/static/articleTitles.txt")
        .then((res) => {
          if (res.status != 200) {
              setLoadingError(true)
          }
          return res.text()
        })
        .then((data) => {
            setTitles(data.split("\n"))
            setLoading(false)
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
              <br/> 
              <h4>Error:</h4>
              {data}
              <br/><br/>
              If the error is a parsing error ensure you're request is correctly formatted, you can see <a href="/advancedQueries" target="_blank" rel="noopener">here</a> for details on how to format queries.
          </p>
      </div>
  )
  }

  if (!isLoading && titles !=null) { //Once the client side fetching is complete the main welcome page can be displayed //Colour: #dfdfdf
    return (
      <div style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}>
        <video src='./static/transparent.webm' width='960' height={540} loop={false} autoPlay={true}></video>
        <br></br>
        <Head>
          <style>{'body { background-color: white; }'}</style>
          <title>OnlyGraphs</title>
        </Head>
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
        <title>Only Graphs - Loading</title>
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