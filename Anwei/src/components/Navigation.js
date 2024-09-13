import React from 'react'
import logo from '../home.png'
import { Component } from 'react'

import 'bootstrap/dist/css/bootstrap.css'
import { Nav, Navbar, NavBar} from 'react-bootstrap'

class Navigation extends Component {
    render() {
        return ( 
            <div>
                <Navbar bg = "dark" variant = "dark" sticky = "top" expand = "md" collapseOnSelect>
                <Navbar.Brand href = "/">
                    <img src={logo} width = "50px"/> 
                    Home
                </Navbar.Brand>

                <Navbar.Collapse>
                    <Nav>
                    <Nav.Link href="introduction">Get to know me</Nav.Link>
                    <Nav.Link href="chat-app">Chat with me on ChatApp</Nav.Link>
                    <Nav.Link href="video-call">Visit my virtual office</Nav.Link>
                    <Nav.Link href="diary">Mental Exercise</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
            </div>  
                
        )
        }
    }
export default Navigation