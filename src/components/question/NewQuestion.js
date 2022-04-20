import React from "react";

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { connect } from "react-redux";
import { handleSubmitQuestion } from "../../actions/question";

function NewQuestion({ dispatch, authedUser }) {
    const handleSubmit = event => {
        event.preventDefault()
        dispatch(handleSubmitQuestion(authedUser, event.target['0'].value, event.target['1'].value))
        event.target['0'].value = ''
        event.target['1'].value = ''
    }

    return (
        <Container>
            <Card>
                <Card.Header as="h5">
                    <Row>
                        <Col md={{ offset: 5 }}>
                            Create New Question
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body>
                    <Card.Text>Complete the question:</Card.Text>
                    <Card.Title>Would You Rather ...</Card.Title>

                    <Form
                        onSubmit={event => handleSubmit(event)}
                    >
                        <Form.Group className="mb-3" controlId="questionOne">
                            <Form.Control placeholder="Enter Option One Text Here" />
                        </Form.Group>
                        <Row>
                            <Col md={{ offset: 5 }}>
                                <Card.Title>OR</Card.Title>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3" controlId="questionTwo">
                            <Form.Control placeholder="Enter Option Two Text Here" />
                        </Form.Group>


                        <Row>
                            <Col md={{ offset: 5 }}>
                                <Button
                                    variant="primary"
                                    type="submit"
                                >
                                    Submit
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default connect(state => ({
    authedUser: state.authedUser
}))(NewQuestion)