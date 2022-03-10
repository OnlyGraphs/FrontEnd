import Head from 'next/head'
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useRouter, withRouter } from 'next/router'
import SimpleSearch from '../components/SimpleSearch';

/**
 * This function is given as the callback for the simple search, it takes the query and forms the search query and moves to that page
 */
function makeRequest(simpleQuery, router) {
  var pathVariable = "/search?query=" + encodeURIComponent(simpleQuery)
  //alert(pathVariable)
  router.push(pathVariable) //Sends the user to the 'results' page
}

function goToAdvanced(router) {
  router.push("/advanced")
}

/**
 * Displays the basic homepage that contains just a simple search
 */
function Home() {
  const router = useRouter()

    //Sets variables for client side data fetching
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

  if (!isLoading && titles !=null) {
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
  } else {
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
//style={{backgroundColor: "#283a3f"}}
export default Home