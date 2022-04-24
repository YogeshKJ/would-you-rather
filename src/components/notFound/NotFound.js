import React from "react";
import { connect } from "react-redux";

import { setAuthedUser } from "../../actions/authedUser";
import { Button } from "@mui/material";

function NotFound({ dispatch }) {
    const handleClick = () => {
        sessionStorage.removeItem('authedUser')
        sessionStorage.removeItem('qid')
        dispatch(setAuthedUser(''))
    }
    return (
        <div>
            <b>Page Not Found! Please login Again!!</b>
            <br />
            <Button
                onClick={handleClick}
                href='/'
                variant="contained">
                Login
            </Button>
        </div>
    )
}

export default connect()(NotFound)