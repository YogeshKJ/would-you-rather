import React, { useState } from 'react'

//MUI
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import UnansweredQuestions from './UnansweredQuestions'
import AnsweredQuestions from './AnsweredQuestions'

export default function Home() {
    const [value, setValue] = useState('1');

    const handleChange = (event, value) => {
        setValue(value)
    }

    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
            <Paper variant="outlined">
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="tabs">
                            <Tab
                                label="Unanswered Questions"
                                value="1"
                            />
                            <Tab
                                label="Answered Questions"
                                value="2"
                            />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <UnansweredQuestions />
                    </TabPanel>
                    <TabPanel value="2">
                        <AnsweredQuestions />
                    </TabPanel>
                </TabContext>
            </Paper>
        </Grid>
    );
}