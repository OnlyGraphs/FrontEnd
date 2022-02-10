import Head from 'next/head'
import * as React from 'react';
import ReactDOM from 'react-dom';
import { Graph } from "react-d3-graph";

const data = {
    nodes: [{ id: "Harry" }, { id: "Sally" }, { id: "Alice" }],
    links: [
      { source: "Harry", target: "Sally" },
      { source: "Harry", target: "Alice" },
    ],
  };
  
const graphConfig = {
    directed: true,
    width: 1000
}


function relationTest() {

    return (
        <div style={{borderStyle: 'solid'}}>
            <Graph
                id="graph-id" // id is mandatory
                data={data}
                config={graphConfig}
            />;
        </div>
    )
}

export default relationTest