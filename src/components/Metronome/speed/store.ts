import {createStore} from "redux";
import {PLAY, SET_NOTES_COUNT, SET_SPEED, SET_TONE, SPEED_DECREMENT, SPEED_INCREMENT, STOP} from "./actions";
import {AUDIO_URL, AUDIO_URL_DEFAULT, MAX_BPM, MIN_BPM, NOTES, NOTES_DEFAULT} from "../../../metrics";

interface ActionType {
    type: string,
    value?: any
}

export interface StateType {
    speed: number,
    playing: boolean,
    audio_url: string,
    notes_count: number,
}

const initialState: StateType = {
    speed:       100,
    playing:     false,
    audio_url:   AUDIO_URL_DEFAULT,
    notes_count: NOTES_DEFAULT,
};

function reducer(state: StateType = initialState, action: ActionType) : StateType {
    switch (action.type) {
        case SET_SPEED:
            return (MIN_BPM <= action.value && action.value <= MAX_BPM)
                ? {...state, speed: action.value}
                : state;
        case SPEED_INCREMENT:
            return (state.speed < MAX_BPM)
                ? {...state, speed: state.speed + 1}
                : state;
        case SPEED_DECREMENT:
            return (MIN_BPM < state.speed)
                ? {...state, speed: state.speed - 1}
                : state;
        case PLAY:
            return {...state, playing: true};
        case STOP:
            return {...state, playing: false};
        case SET_TONE:
            return (Object.values(AUDIO_URL).indexOf(action.value) > -1)
                ? {...state, audio_url: action.value}
                : state;
        case SET_NOTES_COUNT:
            return (action.value in NOTES)
                ? {...state, notes_count: NOTES[action.value]}
                : state;
        default:
            return state;
    }
}

export const SpeedStore = createStore(reducer);
