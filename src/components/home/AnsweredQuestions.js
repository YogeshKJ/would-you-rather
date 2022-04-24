import React from "react";
import { connect } from "react-redux";

import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';

function AnsweredQuestions({ users, question, questionList }) {
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

function mapStateToProps({ users, authedUser, question }) {
    Object.keys(question).sort((a, b) => question[b].timestamp - question[a].timestamp)
    return {
        users,
        questionList: Object.keys(question)
            .sort((a, b) => question[b].timestamp - question[a].timestamp)
            .filter(key => Object.keys(users[authedUser].answers).map(key => key).includes(key)),
        question
    }
}

export default connect(mapStateToProps)(AnsweredQuestions)