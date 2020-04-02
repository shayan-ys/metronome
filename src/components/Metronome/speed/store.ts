import {createStore} from "redux";
import {PLAY, SET_SPEED, SET_TONE, SPEED_DECREMENT, SPEED_INCREMENT, STOP} from "./actions";
import {AUDIO_URL_DEFAULT} from "../../../metrics";

interface ActionType {
    type: string,
    value?: any
}

export interface StateType {
    speed: number,
    playing: boolean,
    audio_url: string
}

const initialState: StateType = {
    speed: 100,
    playing: false,
    audio_url: AUDIO_URL_DEFAULT
};

function reducer(state: StateType = initialState, action: ActionType) : StateType {
    switch (action.type) {
        case SET_SPEED:
            return {...state, speed: action.value};
        case SPEED_INCREMENT:
            return {...state, speed: state.speed + 1};
        case SPEED_DECREMENT:
            return {...state, speed: state.speed - 1};
        case PLAY:
            return {...state, playing: true};
        case STOP:
            return {...state, playing: false};
        case SET_TONE:
            return {...state, audio_url: action.value};
        default:
            return state;
    }
}

export const SpeedStore = createStore(reducer);
