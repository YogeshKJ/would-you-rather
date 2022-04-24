import React, { useEffect, useState } from "react";
import { connect } from "react-redux";


import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button'
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box'



function Questions({ users, question, questionList }) {
    const [qid, setQid] = useState('')

    useEffect(() => {
        qid && sessionStorage.setItem('qid', JSON.stringify(qid))
    }, [qid])

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
                                    onClick={() => setQid(key)}
                                    href={`/questions/${key}`}
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

function mapStateToProps({ users, question, authedUser }) {
    return {
        users,
        questionList: Object.keys(question)
            .sort((a, b) => question[b].timestamp - question[a].timestamp)
            .filter(key => !Object.keys(users[authedUser].answers).map(key => key).includes(key)),
        question
    }
}

export default connect(mapStateToProps)(Questions)