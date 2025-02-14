import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';

function AboutUs() {
    return (
        <Container className="my-5">
            <h1 className="text-center mb-4">About Us</h1>
            
            {/* Company Info Section */}
            <Row className="mb-5">
                <Col md={6} className="d-flex align-items-center">
                    <div>
                        <h2>Our Story</h2>
                        <p>
                            At <b>GroceriesNow</b> we are committed to providing the best products and services to our customers. 
                            Our journey began with a simple idea: to make high-quality products accessible to everyone. 
                            We believe in innovation, customer satisfaction, and excellence in everything we do.
                        </p>
                        <p>
                            Over the years, we have grown into a leading company in the industry, thanks to our dedicated team and loyal customers.
                        </p>
                    </div>
                </Col>
                <Col md={6}>
                    <Image 
                        // src="https://dummyimage.com/600x400/000/fff.png" 
                        src="https://t3.ftcdn.net/jpg/02/41/43/18/360_F_241431868_8DFQpCcmpEPVG0UvopdztOAd4a6Rqsoo.jpg"
                        alt="Company Overview"
                        fluid
                        className="rounded"
                    />
                </Col>
            </Row>
            
            {/* Team Members Section */}
            <h2 className="text-center mb-4">Meet Our Team</h2>
            <Row className="g-4">
                <Col md={4}>
                    <Card>
                        <Card.Img 
                            variant="top" 
                            // src="https://dummyimage.com/400x400/000/fff.png" 
                            src="https://as2.ftcdn.net/v2/jpg/06/10/64/65/1000_F_610646545_5zGCvt9fij2N2NiRLxb3T3gSpkw4e8q0.jpg"
                            alt="Team Member 1" 
                        />
                        <Card.Body className='text-center'>
                            <Card.Title>John Doe</Card.Title>
                            <Card.Text>CEO & Founder</Card.Text>
                            <Button variant="primary">View Profile</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Img 
                            variant="top" 
                            // src="https://dummyimage.com/400x400/000/fff.png" 
                            src='https://as2.ftcdn.net/v2/jpg/04/78/80/73/1000_F_478807332_5asqhM6oO3xsh8N8BW1lKIyH2P6OZWR9.jpg'
                            alt="Team Member 2" 
                        />
                        <Card.Body  className='text-center'>
                            <Card.Title>Jane Smith</Card.Title>
                            <Card.Text>CTO</Card.Text>
                            <Button variant="primary">View Profile</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Img 
                            variant="top" 
                            // src="https://dummyimage.com/400x400/000/fff.png" 
                            src='https://as1.ftcdn.net/v2/jpg/03/70/41/30/1000_F_370413071_7rCoCHoe04wYiygQ3Al1TaOSqSN2lVsi.jpg'
                            alt="Team Member 3" 
                        />
                        <Card.Body className='text-center'>
                            <Card.Title>Emily Johnson</Card.Title>
                            <Card.Text>Head of Marketing</Card.Text>
                            <Button variant="primary">View Profile</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            
            {/* Contact Section */}
            <Row className="mt-5">
                <Col md={12} className="text-center">
                    <h2>Contact Us</h2>
                    <p>
                        Have questions or want to get in touch? Feel free to contact us using the information below.
                    </p>
                    <Button variant="primary" href="mailto:info@example.com">Email Us</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default AboutUs;
