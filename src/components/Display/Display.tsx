import React from 'react';
import styles from './Display.module.scss';
import { SpeedStore } from "../Metronome/speed/store";
import { toMS } from "../../helper";

interface DisplayProps {}

interface DisplayState {
    speed: number
    step: number
}

class Display extends React.Component<DisplayProps, DisplayState> {
    constructor(props: DisplayProps) {
        super(props);

        this.state = {
            speed: SpeedStore.getState().speed,
            step: SpeedStore.getState().current_step,
        };
    }

    componentDidMount(): void {
        SpeedStore.subscribe(() =>
            this.setState({
                speed: SpeedStore.getState().speed,
                step: SpeedStore.getState().current_step,
            })
        );
    }

    render() {
        let ms = toMS(this.state.speed, SpeedStore.getState().notes_count).toFixed(0);
        return <div className={styles.Display}>
            BPM: {this.state.speed}
            <br />
            MS: {ms}
            <br />
            step: {this.state.step}
        </div>
    }
}

export default Display;
