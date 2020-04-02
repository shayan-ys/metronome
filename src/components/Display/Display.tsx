import React from 'react';
import styles from './Display.module.scss';
import { SpeedStore } from "../Metronome/speed/store";
import { toMS } from "../../helper";

interface DisplayProps {}

interface DisplayState {
    speed: number;
}

class Display extends React.Component<DisplayProps, DisplayState> {
    constructor(props: DisplayProps) {
        super(props);

        this.state = {
            speed: SpeedStore.getState().speed
        };
    }

    componentDidMount(): void {
        SpeedStore.subscribe(() =>
            this.setState({
                speed: SpeedStore.getState().speed
            })
        );
    }

    render() {
        let ms = toMS(this.state.speed).toFixed(0);
        return <div className={styles.Display}>
            BPM: {this.state.speed}
            <br />
            MS: {ms}
        </div>
    }
}

export default Display;
