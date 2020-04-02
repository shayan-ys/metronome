import {createStore} from "redux";
import {PLAY, SET_SPEED, SPEED_DECREMENT, SPEED_INCREMENT, STOP} from "./actions";

interface ActionType {
    type: string,
    value?: any
}

export interface StateType {
    speed: number,
    playing: boolean
}

const initialState: StateType = {
    speed: 100,
    playing: false
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
        default:
            return state;
    }
}

export const SpeedStore = createStore(reducer);
