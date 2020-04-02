import React from 'react';
import styles from './Slider.module.scss';
import {SpeedStore} from "../Metronome/speed/store";
import {setSpeed} from "../Metronome/speed/actions";
import {MAX_BPM, MIN_BPM} from "../../metrics";

export interface SliderProps {
}

export interface SliderStates {
    speed: number
}

class Slider extends React.Component<SliderProps, SliderStates> {
    constructor(props: SliderProps) {
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

    handleChange(newVal: number) {
        SpeedStore.dispatch(setSpeed(newVal));
        this.setState({speed: newVal});
    }

    render() {
        return <div className={styles.Slider}>
          BPM (Beats per minute)
          <input type="range" min={MIN_BPM} max={MAX_BPM} value={this.state.speed} className="slider" onChange={e => {this.handleChange(parseInt(e.target.value)); return true;}} />
        </div>;
    }
}

export default Slider;
