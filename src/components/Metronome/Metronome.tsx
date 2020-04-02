import React from 'react';
import styles from './Metronome.module.scss';
import Slider from "../Slider/Slider";
import Display from "../Display/Display";
import Buttons from "../Buttons/Buttons";
import AudioPlayer from "../AudioPlayer/AudioPlayer";

class Metronome extends React.Component {
    render() {
        return (
        <div className={styles.Metronome}>
            Metronome
            <Buttons />
            <Display />
            <Slider />
            <AudioPlayer />
        </div>);
    }
}

export default Metronome;
