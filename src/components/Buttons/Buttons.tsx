import React from 'react';
import styles from './Buttons.module.scss';
import {SpeedStore} from "../Metronome/speed/store";
import {decSpeed, incSpeed, playMetro, setSpeed, stopMetro} from "../Metronome/speed/actions";
import {MAX_BPM, MIN_BPM} from "../../metrics";

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

    static handleChange(newSpeed: number) {
        if (MIN_BPM <= newSpeed && newSpeed <= MAX_BPM) {
            SpeedStore.dispatch(setSpeed(newSpeed));
        }
    }

    render() {
        return <div className={styles.Buttons}>
            <button onClick={() => SpeedStore.dispatch(decSpeed())} disabled={!this.state.enableMinus}>-</button>
            <input  type="Number"  value={this.state.speed}         onChange={e => Buttons.handleChange(parseInt(e.target.value))} />
            <button onClick={() => SpeedStore.dispatch(incSpeed())} disabled={!this.state.enablePlus} >+</button>

            <br />
            <button onClick={() => SpeedStore.dispatch(playMetro())} disabled={ SpeedStore.getState().playing}>Play</button>
            <button onClick={() => SpeedStore.dispatch(stopMetro())} disabled={!SpeedStore.getState().playing}>Stop</button>
        </div>
    }
}

export default Buttons;
