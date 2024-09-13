import React, { useState } from 'react'
import { Component } from 'react'
import logo from '../home.png'
import v from '../video.mp4'
import axios from "axios" 
const backend_url = "http://localhost:3010"

const styles = {
    chatContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: "30px"
    },
    messageContainer: {
      width: "50%",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      marginTop: "20px",
      padding: "20px",
      borderRadius: "10px",
      backgroundColor: "#f2f2f2"
    },
    inputContainer: {
      width: "250px",
      display: "flex",
    //   alignItems: "center",
    //   marginTop: "20px"
    },
    inputBox: {
      width: "200px",
      padding: "10px",
      backgroundColor: "#dcf0ff",
      fontSize: "16px",
      borderRadius: "10px",
      border: "none"
    },
    submitButton: {
      padding: "10px",
      marginLeft: "10px",
      fontSize: "16px",
      backgroundColor: "#4CAF50",
      color: "#ffffff",
      borderRadius: "10px",
      border: "none",
      width:'80px'
    }
  };




function VideoCall() {
    const [query, setQuery] = useState("");
    const [texts, setTexts] = useState([]);

    const pairs = texts.map(([q,r]) => "User:" + q + "\nJOY:" + r + "\n\n")
    const input = pairs.reduce((acc, val) => acc + val, "")

     return (
        <div>
            <center><h1> Let's chat! </h1>
            <video controls key={v} width="300px">
                <source src={v} type="video/mp4"></source>
            </video>
            


            <br/>
            <label>
                Message:
                <input  style={styles.inputContainer} type="text" value={query} onChange={(e)=>{setQuery(e.target.value) }}/>
                
            </label> 

            <input style={styles.submitButton} type="button" value="Submit" onClick={async (e)=>{
                    e.preventDefault()
                
                const input_fr = input + "\n\nUser:"+query + "\nJOY:"
                // console.log("Sending query", input_fr)
                const response = await axios.get(backend_url + "/talking", {params: {input: input_fr}})

                console.log(response)
                setTexts([...texts, [query, response.data]])

            }}/>

        </center>
        </div>
        
        ) 
} 
export default VideoCall