import React from 'react';
import styles from './Metronome.module.scss';
import Display from "../Display/Display";
import Buttons from "../Buttons/Buttons";
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import {AppBar, Box, Container, IconButton, Toolbar, Typography} from "@material-ui/core";
import SpeedIcon from '@material-ui/icons/Speed';

class Metronome extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Container maxWidth="sm" className={styles.Metronome}>
                    <Box boxShadow={1}>
                        <AppBar position="static">
                            <Toolbar>
                                <IconButton color="inherit" aria-label="menu">
                                    <SpeedIcon />
                                </IconButton>
                                <Typography variant="h6">
                                    Metronome
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <Box mt={2} p={2}>
                            <Buttons />
                        </Box>
                        <Box mt={1}>
                            <Display />
                        </Box>
                    </Box>
                    <AudioPlayer />
                </Container>

                <Container className={styles.FooterBar}>
                    <Typography variant="body1">
                        Designed and developed by <a href="https://shayanys.com">Shayan Ys</a> 2020
                    </Typography>
                </Container>
            </React.Fragment>
        );
    }
}

export default Metronome;
