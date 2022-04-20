import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button'
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'



function Questions({ users, question, authedUser, type, handleClick }) {
    const questionList = Object.keys(question).filter(key => !Object.keys(users[authedUser].answers).map(key => key).includes(key))

    return (
        <Grid container direction='column' sx={{ rowGap: 2 }} >
            {questionList.map(key => {
                const userId = question[key].author
                return (
                    <Box key={key} sx={{ border: '1px solid  #D3D3D3' }}>
                        <b>{`${users[userId].name} asks:`}</b>
                        <Divider />

                        <Grid sx={{ padding: 1 }} container alignItems='center' spacing={4}>
                            <Grid item xs={2}>
                                <Avatar
                                    alt={users[userId].name}
                                    src={users[userId].avatarURL}
                                    sx={{ width: 60, height: 60 }} />
                            </Grid>

                            <Grid item alignItems='stretch'>
                                <b>Would You Rather</b>
                                <p>{question[key].optionOne.text}</p>
                                <Button
                                    variant="contained"
                                    size="small"
                                    onClick={() => handleClick(key, question[key].author)}
                                >
                                    View Poll
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                )
            })}
        </Grid>

    )
}

export default connect((state, type, handleClick) => ({
    users: state.users,
    question: state.question,
    authedUser: state.authedUser,
    ...type,
    ...handleClick
}))(Questions)