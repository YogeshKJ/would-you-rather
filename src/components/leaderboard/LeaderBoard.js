import React from "react";
import { connect } from "react-redux";

import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'

function LeaderBoard({ users, keys }) {
    return (
        <Grid
            container
            direction='column'
            sx={{ rowGap: 2 }}
            justifyContent="center"
            alignItems="center" >
            {keys.map(key => {
                const score = users[key].questions.length + Object.keys(users[key].answers).length
                return (
                    <Box key={key} width='20%' sx={{ border: '1px solid  #D3D3D3' }}>
                        <b>{`${users[key].name} asks:`}</b>
                        <Divider />

                        <Grid
                            sx={{ padding: 1 }}
                            container
                            direction='row'
                            alignItems='center'
                            justifyContent='center'
                        >
                            <Grid item xs={3}>
                                <Grid item >
                                    <Avatar
                                        alt={users[key].name}
                                        src={users[key].avatarURL}
                                        sx={{ width: 60, height: 60 }} />
                                </Grid>
                            </Grid>

                            <Grid container item direction='column' xs={6}>
                                <Grid item>
                                    <b>{users[key].name}</b>
                                </Grid>
                                <Grid item>
                                    <p>Answered questions   {Object.keys(users[key].answers).length}</p>
                                    <p>Created questions    {users[key].questions.length}</p>
                                </Grid>
                            </Grid>

                            <Grid container item direction='column' xs={3}>
                                <Box sx={{ width: '75%', border: '1px solid  #D3D3D3' }}>
                                    <b>Score</b>
                                    <Divider />
                                    <Chip label={score} color="success" />
                                </Box>
                            </Grid>

                        </Grid>
                    </Box>
                )
            })
            }
        </Grid >
    )
}

function mapStateToProps({ users }) {
    return {
        users,
        keys: Object.keys(users)
            .sort((a, b) => (users[b].questions.length + Object.keys(users[b].answers).length) -
                (users[a].questions.length + Object.keys(users[a].answers).length))
    }
}

export default connect(mapStateToProps)(LeaderBoard)