import React from 'react';
import styles from './Buttons.module.scss';
import {SpeedStore} from "../Metronome/speed/store";
import {decSpeed, incSpeed, playMetro, setNote, setSpeed, setTone, stopMetro} from "../Metronome/speed/actions";
import {
    AUDIO_URL,
    AUDIO_URL_DEFAULT_KEY,
    MAX_BPM,
    MIN_BPM,
    NOTES,
    NOTES_DEFAULT_KEY
} from "../../metrics";

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import {
    FormControlLabel,
    Radio,
    RadioGroup,
    TextField,
    Select,
    Button,
    FormControl,
    InputLabel, Fab, Grid, FormLabel, Box, Divider
} from "@material-ui/core";
import Slider from "../Slider/Slider";

interface ButtonsState {
    speed: number,
    enablePlus: boolean,
    enableMinus: boolean
}

class Buttons extends React.Component<{}, ButtonsState> {

    constructor(props: {}) {
        super(props);

        this.state = Buttons.speedState(
            SpeedStore.getState().speed
        );

        this.handleToneChange = this.handleToneChange.bind(this);
        this.handleNoteChange = this.handleNoteChange.bind(this);
    }

    componentDidMount(): void {
        SpeedStore.subscribe(() =>
            this.setState(
                Buttons.speedState(
                    SpeedStore.getState().speed
                )
            )
        );
    }

    private static speedState(speed: number) : ButtonsState {
        return {
            speed: speed,
            enablePlus: speed < MAX_BPM,
            enableMinus: speed > MIN_BPM
        }
    }

    handleToneChange(event: React.ChangeEvent<{ value: unknown }>) {
        const url_name = event.target.value as string;
        if (url_name in AUDIO_URL) {
            SpeedStore.dispatch(setTone(AUDIO_URL[url_name]));
        }
    }

    handleNoteChange(event: React.ChangeEvent<{ value: unknown }>) {
        const note = event.target.value as string;
        SpeedStore.dispatch(setNote(note));
    }

    render() {
        return <Grid container className={styles.Buttons}>
            <Grid container spacing={2} className={styles.SliderRowWrapper}>
                <Grid item>
                    <Fab
                        color="primary" aria-label="add"
                        onClick={() => SpeedStore.dispatch(decSpeed())}
                        disabled={!this.state.enableMinus}
                    >
                        <RemoveIcon fontSize="large" />
                    </Fab>
                </Grid>
                <Grid item xs>
                    <Box mt={2}>
                        <Slider />
                    </Box>
                </Grid>
                <Grid item>
                    <Box mt={1}>
                    <TextField
                        label="Speed" type="number" variant="outlined"
                        size="small"
                        className={styles.SpeedNumberInput}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={this.state.speed} onChange={e => SpeedStore.dispatch(setSpeed(parseInt(e.target.value)))}
                    />
                    </Box>
                </Grid>
                <Grid item>
                    <Fab
                        color="primary" aria-label="add"
                        onClick={() => SpeedStore.dispatch(incSpeed())}
                        disabled={!this.state.enablePlus}
                    >
                        <AddIcon fontSize="large" />
                    </Fab>
                </Grid>
            </Grid>

            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                spacing={0}
            >
                <Grid item>
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="tone-select">Tone</InputLabel>
                        <Select
                            native label="Tone"
                            inputProps={{
                                name: 'tone',
                                id: 'tone-select',
                            }}
                            onChange={this.handleToneChange} defaultValue={AUDIO_URL_DEFAULT_KEY}
                        >
                            {Object.keys(AUDIO_URL).map(
                                (key, index) => <option value={key} key={index}>{key}</option>
                            )}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Note</FormLabel>
                        <RadioGroup
                            row aria-label="note" name="note"
                            defaultValue={NOTES_DEFAULT_KEY}
                            onChange={this.handleNoteChange}
                        >
                            {Object.keys(NOTES).map(
                                (key, index) =>
                                    <FormControlLabel value={key} key={index} control={<Radio color="primary" />} label={key} />
                            )}
                        </RadioGroup>
                    </FormControl>
                </Grid>
            </Grid>

            <Divider variant="middle" />
            <Grid container justify="center" alignItems="center">
                <Box mt={5}>
                <Box component="span" display={!SpeedStore.getState().playing ? 'inherit' : 'none'}>
                    <Button
                        variant="contained"
                        color="primary"
                        endIcon={<PlayArrowIcon />}
                        onClick={() => SpeedStore.dispatch(playMetro())} disabled={ SpeedStore.getState().playing}
                    >
                        Play
                    </Button>
                </Box>
                <Box component="span" display={ SpeedStore.getState().playing ? 'inherit' : 'none'}>
                    <Button
                        variant="contained"
                        color="default"
                        endIcon={<PauseIcon />}
                        onClick={() => SpeedStore.dispatch(stopMetro())} disabled={!SpeedStore.getState().playing}
                    >
                        Stop
                    </Button>
                </Box>
                </Box>
            </Grid>

        </Grid>
    }
}

export default Buttons;
