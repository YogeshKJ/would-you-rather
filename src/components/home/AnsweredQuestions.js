import React from "react";
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

function AnsweredQuestions({ users, question, authedUser }) {
    const questionList = Object.keys(question).filter(key => Object.keys(users[authedUser].answers).map(key => key).includes(key))

    return (
        <Grid container direction='column' sx={{ rowGap: 2 }} >
            {questionList.map(qid => {
                const userId = question[qid].author
                return (
                    <Box key={qid} sx={{ border: '1px solid  #D3D3D3' }}>
                        <b>{`Asked by ${users[userId].name}`}</b>
                        <Divider />
                        <Grid sx={{ padding: 1 }} container alignItems='center' spacing={4}>
                            <Grid item xs={2}>
                                <Avatar
                                    alt={users[userId].name}
                                    src={users[userId].avatarURL}
                                    sx={{ width: 60, height: 60 }}
                                />
                            </Grid>
                            
                            <Grid container item xs={10}>
                                <Grid item>
                                    <b>Results:</b>
                                </Grid>

                                <Grid container item direction='column'>
                                    <Grid item>
                                        <span>{question[qid].optionOne.text}</span>
                                        <br />
                                        <span><b>{question[qid].optionOne.votes.length} out of {question[qid].optionOne.votes.length + question[qid].optionTwo.votes.length} votes</b></span>
                                    </Grid>
                                    <Grid item>
                                        <span>{question[qid].optionTwo.text}</span>
                                        <br />
                                        <span><b>{question[qid].optionTwo.votes.length} out of {question[qid].optionOne.votes.length + question[qid].optionTwo.votes.length} votes</b></span>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                )
            })
            }
        </Grid>
    )
}

export default connect((state) => ({
    users: state.users,
    authedUser: state.authedUser,
    question: state.question
}))(AnsweredQuestions)