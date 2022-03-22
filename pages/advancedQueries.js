import Head from 'next/head'
import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';

function advancedQueries() {


    return (
        <div>
            <Head>
              <title>Only Graphs - Advanced Query Writing</title>
            </Head>
            <h3>A simple guide to using advanced queries</h3>
                
                <p>Instead of just searching for single words and phrases, OnlyGraphs allows users to compose advanced queries that allow users to narrow down and improve their search results.These advanced queries include binary and unary queries, relational queries, structural queries and linked queries. Subqueries can be simple terms, or complex queries. </p>
                    
                <p>Binary Queries A binary query is a query composed of two or more subqueries, connected using the terms AND or OR.</p>

            <p style={{outlineStyle: 'solid', textAlign: 'center'}}>
                White House,AND,President [1]    <br/>
                Dog,OR,cat [2]  <br/>
                99,AND,Balloons,OR,Fighter Jets [3]
            </p>

            <p>Figure 1: Examples of binary queries</p>

            <p>The binary query in [1] will search for articles that contain both &ldquo;White House&rdquo; and &ldquo;President&rdquo;, while [2] will search for articles that contain either &ldquo;Dog&rdquo; or &ldquo;cat&rdquo;, or both. Example [3] shows a more complex binary query that searches for articles containing &ldquo;99&rdquo; and either &ldquo;Balloons&rdquo; or &ldquo;Fighter Jets&rdquo;, or both. Thus, in [3], the query is evaluated from the right hand side to the left hand side. Unary Queries Unary queries search for articles that do not correspond to the subquery.</p>

            <p style={{outlineStyle: 'solid', textAlign: 'center'}}>
                NOT,White House [4]    <br/>
                NOT,Ketchup OR Mayo [5]     <br/>
                NOT,Ketchup AND Mayo [6]</p>

            <p>Figure 2: Examples of unary queries</p>

            <p>Query [4] returns all those documents that do not contain the phrase &ldquo;White House&rdquo;. To resolve queries [5] and [6], the subqueries are resolved first. Thus, query [5] returns all documents that contain neither &ldquo;Ketchup&rdquo; nor &ldquo;Mayo&rdquo;. Query [6] returns all documents that do not contain both &ldquo;Ketchup&rdquo; and &ldquo;Mayo&rdquo;, but may contain &ldquo;Ketchup&rdquo; or &ldquo;Mayo&rdquo;. Relational Queries Note: The system does not currently support relational queries being entered into the search bar. Relational queries can be accessed by clicking the graph icon under article suggestions. Also note that the relational search currently expects article IDs instead of article titles. This is to prevent searches for missing articles.</p>

            <p>Relational queries allow users to search for articles connected to a root article. This gives users more context with regards to different topics.</p>

            <p style={{outlineStyle: 'solid', textAlign: 'center'}}>
                #LINKEDTO, Hamsters, 4, Pumpkin Seed [7] <br/>
                #LINKEDTO, Hamsters, 4, Pumpkin Seed,OR,Sunflower Seed [8]</p>

            <p>Figure 3: Examples of relational queries</p>

            <p>Query [7] returns pages containing the term &ldquo;Pumpkin Seed&rdquo; and are within four hops (that is, reachable by clicking on four links) from the page titled &ldquo;Hamsters&rdquo;. Query [8] shows the use of subqueries within a relational query: the query returns all documents within four hops of the page titled &ldquo;Hamsters&rdquo; that either contain &ldquo;Pumpkin Seed&rdquo; or &ldquo;Sunflower Seed&rdquo;, or both. Structural Queries Structural queries allow users to filter pages depending on different parts of an article, such as the title, citations, or info box. In addition, structural queries allow users to search for articles in specific categories</p>

            <p style={{outlineStyle: 'solid', textAlign: 'center'}}>
                 #CITATION,Douglas Harper The Online Etymology Dictionary [11] <br/>
                 #CELEBRITY,Keanu Reeves [12]
            </p>

            <p>Figure 4: Examples of structural queries</p>

            <p>Query [10] filters for articles belonging to the categories &ldquo;Hamsters&rdquo; or &ldquo;Rodents&rdquo;, or both. This query shows the use of subqueries within a structural query. These subqueries can be much more complex. Example [11] searches for articles that cite &ldquo;Douglas Harper, The Online Etymology Dictionary&rdquo;. Query [12] filters out articles whose info box is not of type celebrity or whose celebrity-type info box does not contain &ldquo;Keanu Reeves&rdquo;. Distance Queries Distance queries search for terms that are exactly n terms apart, where n is a positive integer.</p>

            <p style={{outlineStyle: 'solid', textAlign: 'center'}}> #DIST, 2,Hamster,Pouch [13]</p>

            <p>Figure 5: Example of a distance query</p>

            <p>Query [13] retrieves documents that contain &ldquo;Hamster&rdquo; and &ldquo;Pouch&rdquo; and are exactly two words apart. That is, the document may contain the phrase &ldquo;the hamster fills its pouch&rdquo;. The document containing the term &ldquo;hamster pouch&rdquo;, however, will not be retrieved.</p>

            <p></p>

        </div>
    )
}

export default advancedQueries