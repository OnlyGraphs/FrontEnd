import Head from 'next/head'
import * as React from 'react';
import ReactDOM from 'react-dom';
import { Graph } from "react-d3-graph";
import RelationResults from '../components/RelationResults';

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


function relationSearch() {

    return (
        <RelationResults></RelationResults>
    )
}

export default relationSearch