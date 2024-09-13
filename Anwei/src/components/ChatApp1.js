import React, { useState } from 'react'
import axios from "axios"

const backend_url = "http://localhost:3010"


function ChatApp() {
    const [query, setQuery] = useState("");
    const [texts, setTexts] = useState([]);

    const pairs = texts.map(([q,r]) => "User:" + q + "\nJOY:" + r + "\n\n")
    const input = pairs.reduce((acc, val) => acc + val, "")
   
    return (
        <div style={{textAlign: 'center'}}>
            <br/>
            <center><h2> What's on your mind? </h2></center>
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
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '50%', margin: 'auto'}}>
                {texts.map(([q,r]) => (
                    <div style={{display: 'flex', flexDirection: 'row', margin: '10px 0'}}>
                        <div style={{backgroundColor: 'lightblue', padding: '10px', borderRadius: '10px', marginRight: '10px'}}>
                            <p>{q}</p>
                        </div>
                        <div style={{backgroundColor: 'lightgray', padding: '10px', borderRadius: '10px'}}>
                            <p>{r}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ChatApp
