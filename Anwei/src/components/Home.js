import React from 'react'
import { Component } from 'react'
import Display from './Display'
import { Container, Row, Col, Carousel} from 'react-bootstrap'
import banner from '../banner.png'

class Home extends Component {
    render (){
        return (
            <div>
                <br/>
                    <Container>
                    <Carousel>
                        <Carousel.Item>
                            <img className="d-block w-100"
                            src={banner}
                            alt="Banner"/>
                        </Carousel.Item>
                    </Carousel>
                    </Container> 
                <Row className='mx-5'>
                    <Col>
                    <Display
                        header="Diary"
                        title="💡 Let's Do a Mental Exercise💡"
                        text="We're in this together!"
                        theLink="/cbt-diary" />
                    </Col>
                    <Col>
                    <Display
                        header="Message Me"
                        title="📬 Let's text! 📬"
                        text="I'm here 24/7!"
                        theLink="/chat-app" />
                    </Col>
                    <Col>
                    <Display
                        header="Video Call"
                        title="📞 Click here to talk over a call! 📞"
                        text="I'm here 24/7!"
                        theLink="/video-call" />
                    </Col>
                </Row>
                <br/>
                <br/>
            </div>

        )
    }
}

export default Home