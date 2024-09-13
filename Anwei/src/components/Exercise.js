import React, { useState } from 'react'
import { Component } from 'react'
import axios from "axios"

const backend_url = "http://localhost:3010"




function Exercise() {
    const [query, setQuery] = useState("");
    const [texts, setTexts] = useState([]);

    const pairs = texts.map(([q,r]) => "User:" + q + "\nJOY:" + r + "\n\n")
    const input = pairs.reduce((acc, val) => acc + val, "")
   
    return (
        <div>
            <h1> Let's chat </h1>
            <label>
                Message:
                <input type="text" value={query} onChange={(e)=>{setQuery(e.target.value) }}/>
                
            </label>
            <input type="button" value="Submit" onClick={async (e)=>{
                    e.preventDefault()
                
                const input_fr = input + "\n\nUser:"+query + "\nJOY:"
                console.log("Sending query", input_fr)
                const response = await axios.get(backend_url + "/webhook", {params: {input: input_fr}})

                console.log(response)
                setTexts([...texts, [query, response.data]])

            }}/>
            {texts.map(([q,r]) => <><p>{q}</p><br/><p>{r}</p></>)}
        </div>
        )
        


    
}

export default Exercise