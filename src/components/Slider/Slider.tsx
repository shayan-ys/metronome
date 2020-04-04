import React from 'react';
import styles from './Slider.module.scss';
import {SpeedStore} from "../Metronome/speed/store";
import {setSpeed} from "../Metronome/speed/actions";
import {MAX_BPM, MIN_BPM} from "../../metrics";
import {Slider as MaterialSlider} from '@material-ui/core';

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

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(): void {
        SpeedStore.subscribe(() =>
            this.setState({
                speed: SpeedStore.getState().speed
            })
        );
    }

    handleChange(event: any, newValue: number | number[]): void {
        this.setValue((newValue instanceof Array) ? newValue[0] : newValue);
    };

    setValue(newVal: number) {
        SpeedStore.dispatch(setSpeed(newVal));
        this.setState({speed: newVal});
    }

    render() {
        return <MaterialSlider
            className={styles.Slider} aria-labelledby="continuous-slider" valueLabelDisplay="auto"
            min={MIN_BPM} max={MAX_BPM}
            value={this.state.speed}
            onChange={this.handleChange}
        />;
    }
}

export default Slider;
