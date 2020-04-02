import React from 'react';
import styles from './AudioPlayer.module.scss';
import {MS_PRECISION} from "../../metrics";
import {SpeedStore} from "../Metronome/speed/store";
import {alternateTone, toMS} from "../../helper";
import {step} from "../Metronome/speed/actions";

interface AudioState {
    speedMS: number,
    playing: boolean,
    loaded : boolean,
    step   : number,
    note   : number,
}

class AudioPlayer extends React.Component<{}, AudioState> {
    protected audio: any;
    protected intervalPlayer: any;

    constructor(props: {}) {
        super(props);
        this.state = {
            speedMS: toMS(SpeedStore.getState().speed, SpeedStore.getState().notes_count),
            playing: SpeedStore.getState().playing,
            loaded : false,
            step   : SpeedStore.getState().current_step,
            note   : SpeedStore.getState().notes_count,
        };
    }

    componentDidMount(): void {
        SpeedStore.subscribe(() => {
            // speed
            this.setState({
                speedMS: toMS(SpeedStore.getState().speed, SpeedStore.getState().notes_count),
                step   : SpeedStore.getState().current_step,
                note   : SpeedStore.getState().notes_count,
            });

            // playing
            if (!this.state.playing && SpeedStore.getState().playing) {
                this.playAudio();
            } else if (this.state.playing && !SpeedStore.getState().playing) {
                this.stop();
            }
        });
    }

    loaded() {
        console.log("loaded");
        this.setState({loaded: true});
    }

    tick() {
        let newAudio = this.audio.cloneNode(true);

        if (this.state.step >= (1 / this.state.note) && this.state.note !== 1) {
            newAudio.childNodes[0].setAttribute("src", alternateTone());
        }

        try {
            let key = newAudio.getAttribute("key");
            newAudio.setAttribute("key", (parseInt(key) + 1).toString());
            newAudio.play();
            SpeedStore.dispatch(step());
        } catch (e) {
            // browser not supported
            this.stop();
            alert("browser not supported");
        }
    }

    stop() {
        clearInterval(this.intervalPlayer);
        this.setState({playing: false});
    }

    playAudio() {
        let start = Date.now();

        this.intervalPlayer = setInterval(() => {
            if (
                // this.state.loaded &&
                Date.now() - start > this.state.speedMS - MS_PRECISION
            ) {
                start = Date.now();
                this.tick();
            }
        }, MS_PRECISION);

        this.setState({playing: true});
    }

    static ended(e: any) {
        e.target.remove();
    }

    render() {
        return (
            <div className={styles.AudioPlayer}>
                <audio ref={audio => {this.audio = audio}} key={0} onLoad={() => this.loaded()} onEnded={e => AudioPlayer.ended(e)}>
                    <source src={SpeedStore.getState().audio_url} type="audio/mpeg" >
                    </source>
                </audio>
            </div>
        );
    }
}

export default AudioPlayer;
