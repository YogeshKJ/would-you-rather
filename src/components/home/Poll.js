import React, { useState } from "react";
import { connect } from "react-redux";

import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Radio from '@mui/material/Radio';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';

import { handleSubmitAnswer } from '../../actions/question'

function Poll({ users, question, authedUser, qid, dispatch }) {
    const [answer, setAnswer] = useState('optionTwo')
    const [answered, setAnswered] = useState(false)

    const userId = question[qid].author

    const handleClick = () => {
        dispatch(handleSubmitAnswer({ authedUser, qid, answer }))
        setAnswered(true)
    }

    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
            {
                answered ? (
                    <Box sx={{ border: '1px solid  #D3D3D3' }}>
                        <b>{`Asked by ${users[userId].name}`}</b>
                        <Divider />
                        <Grid container direction='row' sx={{ padding: 1 }} alignItems='center'>
                            <Grid item xs={4}>
                                <Avatar
                                    alt={users[userId].name}
                                    src={users[userId].avatarURL}
                                    sx={{ width: 60, height: 60 }}
                                />

                            </Grid>
                            <Grid container item direction='column' xs={8}>
                                <Grid item>
                                    <b>Results:</b>
                                </Grid>

                                <Grid container>
                                    <Grid item>
                                        <span>{question[qid].optionOne.text}</span>
                                        <br />
                                        <span><b>{question[qid].optionOne.votes.length} out of {question[qid].optionOne.votes.length + question[qid].optionTwo.votes.length} votes</b></span>
                                    </Grid>
                                    <Grid>
                                        <span>{question[qid].optionTwo.text}</span>
                                        <br />
                                        <span><b>{question[qid].optionTwo.votes.length} out of {question[qid].optionOne.votes.length + question[qid].optionTwo.votes.length} votes</b></span>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                ) : (
                    <Box sx={{ border: '1px solid  #D3D3D3' }}>
                        <b>{`${users[userId].name} asks:`}</b>
                        <Divider />

                        <Grid container direction='row' sx={{ padding: 1 }} alignItems='center'>
                            <Grid item xs={4}>
                                <Avatar
                                    alt={users[userId].name}
                                    src={users[userId].avatarURL}
                                    sx={{ width: 60, height: 60 }}
                                />

                            </Grid>
                            <Grid container item alignItems='stretch' direction='column' xs={8}>
                                <Grid item>
                                    <b>Would You Rather</b>
                                </Grid>
                                <Grid item>
                                    <FormControl>
                                        <RadioGroup
                                            aria-labelledby="radio button"
                                            name="controlled-radio-buttons-group"
                                            value={answer}
                                            onChange={(event) => setAnswer(event.target.value)}
                                        >
                                            <FormControlLabel value="optionOne" control={<Radio />} label={question[qid].optionOne.text} />
                                            <FormControlLabel value="optionTwo" control={<Radio />} label={question[qid].optionTwo.text} />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        onClick={handleClick}
                                    >
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid >
                        </Grid >
                    </Box>
                )
            }
        </Grid>
    )
}

export default connect((state, qid) => ({
    users: state.users,
    question: state.question,
    authedUser: state.authedUser,
    ...qid
}))(Poll)