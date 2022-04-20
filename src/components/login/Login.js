import React, { useEffect } from "react";
import { connect } from "react-redux";
import logo from '../../logo.svg';

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { setAuthedUser } from "../../actions/authedUser";


function Login({ users, dispatch}) {
    const [id, setId] = React.useState('');
    const [isDisabled, setIsDisabled] = React.useState(true)

    useEffect(() => {
        id && window.localStorage.setItem('authedUser', JSON.stringify(id))
    }, [id])

    const handleSelection = event => {
        setId(event.target.value)
        setIsDisabled(false)
    }

    return (
        <Container>
            <Card>
                <Card.Header>
                    <Row>
                        <Col md={{ offset: 4 }}>
                            <h5>Welcome to the Would You Rather App!</h5>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{ offset: 5 }}>
                            Please sign in to continue
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body>
                    <Card.Img variant="top" src={logo} style={{ height: '40vmin' }} />

                    <Row>
                        <Col md={{ offset: 5}}>
                            <Card.Title>Sign In</Card.Title>
                        </Col>
                    </Row>

                    <Form.Select aria-label="Select User" value={id} onChange={handleSelection}>
                        <option value='' hidden disabled>Select User</option>

                        {
                            Object.keys(users).map(key => (
                                <option key={users[key].id} value={users[key].id}>
                                    {users[key].name}
                                </option>
                            ))
                        }
                    </Form.Select>

                    <Row>
                        <Col md={{ offset: 5 }}>
                            <Button
                                variant="primary"
                                onClick={!isDisabled ? () => dispatch(setAuthedUser(id)) : null}
                                disabled={isDisabled}
                            >
                                Sign In
                            </Button>
                        </Col>
                    </Row>

                </Card.Body>
            </Card>
        </Container>
    )
}

export default connect(state => ({
    users: state.users,
}))(Login)