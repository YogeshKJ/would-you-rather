import React, { useState } from "react";
import { connect } from "react-redux";

import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Radio from '@mui/material/Radio';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';

import { handleSubmitAnswer } from '../../actions/question'

function Poll({ users, question, authedUser, qid, dispatch, optionOne, optionTwo }) {
    const [answer, setAnswer] = useState('optionOne')
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
                            <Grid item xs={3}>
                                <Avatar
                                    alt={users[userId].name}
                                    src={users[userId].avatarURL}
                                    sx={{ width: 70, height: 70 }}
                                />

                            </Grid>
                            <Grid container item direction='column' xs={9}>
                                <Grid item>
                                    <b>Results:</b>
                                </Grid>

                                <Grid container>
                                    <Box
                                        sx={{ padding: '2px', border: answer === 'optionOne' && 'solid', borderColor: answer === 'optionOne' && 'green' }}>
                                        <span>{optionOne.text}</span>
                                        <br />
                                        <span>{(optionOne.votes.length * 100) / (optionOne.votes.length + optionTwo.votes.length)}% voted</span>
                                        <br />
                                        <span><b>{optionOne.votes.length} out of {optionOne.votes.length + optionTwo.votes.length} votes</b></span>
                                    </Box>
                                    <Box
                                        sx={{ padding: '2px', border: answer === 'optionTwo' && 'solid', borderColor: answer === 'optionTwo' && 'green' }}>
                                        <span>{optionTwo.text}</span>
                                        <br />
                                        <span>{(optionTwo.votes.length * 100) / (optionOne.votes.length + optionTwo.votes.length)}% voted</span>
                                        <br />
                                        <span><b>{optionTwo.votes.length} out of {optionOne.votes.length + optionTwo.votes.length} votes</b></span>
                                    </Box>
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
                                            <FormControlLabel value="optionOne" control={<Radio />} label={optionOne.text} />
                                            <FormControlLabel value="optionTwo" control={<Radio />} label={optionTwo.text} />
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
        </Grid >
    )
}

function mapStateToProps({ users, question, authedUser, qid }) {
    return {
        users,
        question,
        authedUser,
        qid,
        optionOne: question[qid].optionOne,
        optionTwo: question[qid].optionTwo,
    }
}

export default connect(mapStateToProps)(Poll)