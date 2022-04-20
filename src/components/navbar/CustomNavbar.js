import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'


//bootstrap
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import { setAuthedUser } from '../../actions/authedUser'

//MUI
import Avatar from '@mui/material/Avatar'

function CustomNavbar({ authedUser, users, dispatch }) {
    const [logout, setLogout] = useState(false)

    useEffect(() => {
        if (logout) {
            localStorage.removeItem('authedUser')
            dispatch(setAuthedUser(''))
            setLogout(false)
        }

    }, [logout, dispatch])

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/newquestion">New Question</Nav.Link>
                        <Nav.Link href="/leaderboard">Leader Board</Nav.Link>
                    </Nav>
                    <Nav>
                        {
                            authedUser && (
                                <>
                                    <Nav.Link>Hello {users[authedUser].name}</Nav.Link>
                                    <Avatar src={users[authedUser].avatarURL} alt={authedUser} />
                                    <Nav.Link onClick={() => setLogout(true)}>Logout</Nav.Link>
                                </>
                            )
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default connect(state => ({
    authedUser: state.authedUser,
    users: state.users
}))(CustomNavbar) 