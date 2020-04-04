import React from 'react';
import styles from './Display.module.scss';
import { SpeedStore } from "../Metronome/speed/store";
import {Grid, Typography} from "@material-ui/core";

interface DisplayProps {}

interface DisplayState {
    step: number
}

class Display extends React.Component<DisplayProps, DisplayState> {
    constructor(props: DisplayProps) {
        super(props);

        this.state = {
            step: SpeedStore.getState().current_step,
        };
    }

    componentDidMount(): void {
        SpeedStore.subscribe(() =>
            this.setState({
                step: SpeedStore.getState().current_step,
            })
        );
    }

    render() {
        return <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            className={styles.Display}
        >
            <Typography variant="h3" gutterBottom>
                {this.state.step}
            </Typography>
            <Typography variant="caption" display="block" gutterBottom>
                step
            </Typography>
        </Grid>
    }
}

export default Display;
