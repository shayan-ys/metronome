import React from 'react';
import styles from './Buttons.module.scss';
import {SpeedStore} from "../Metronome/speed/store";
import {decSpeed, incSpeed, playMetro, setSpeed, setTone, stopMetro} from "../Metronome/speed/actions";
import {AUDIO_URL, MAX_BPM, MIN_BPM} from "../../metrics";

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

    static handleToneChange(url_name: string) {
        if (url_name in AUDIO_URL) {
            SpeedStore.dispatch(setTone(AUDIO_URL[url_name]));
        }
    }

    render() {
        return <div className={styles.Buttons}>
            <button onClick={() => SpeedStore.dispatch(decSpeed())} disabled={!this.state.enableMinus}>-</button>
            <input  type="Number"  value={this.state.speed}
                    onChange={e => SpeedStore.dispatch(setSpeed(parseInt(e.target.value)))} />
            <button onClick={() => SpeedStore.dispatch(incSpeed())} disabled={!this.state.enablePlus} >+</button>

            <br />
            <select onChange={e => Buttons.handleToneChange(e.target.value)}>
                {Object.keys(AUDIO_URL).map(
                    (key, index) =>
                        <option value={key} key={index}>
                            {key}
                        </option>
                )}
            </select>
            <br />
            <button onClick={() => SpeedStore.dispatch(playMetro())} disabled={ SpeedStore.getState().playing}>Play</button>
            <button onClick={() => SpeedStore.dispatch(stopMetro())} disabled={!SpeedStore.getState().playing}>Stop</button>
        </div>
    }
}

export default Buttons;
