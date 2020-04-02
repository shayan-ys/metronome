/**
 * action types
 */
export const SET_SPEED = 'SET_SPEED';
export const SPEED_INCREMENT = 'SPEED_INCREMENT';
export const SPEED_DECREMENT = 'SPEED_DECREMENT';
export const PLAY = 'PLAY';
export const STOP = 'STOP';
export const SET_TONE = 'SET_TONE';
export const SET_NOTES_COUNT = 'SET_NOTES_COUNT';
export const STEP_INCREMENT = 'STEP_INCREMENT';

/**
 * action
 */
export const setSpeed  = (speed: number) => ({ type: SET_SPEED,       value: speed });
export const setTone   = (tone:  string) => ({ type: SET_TONE,        value: tone });
export const setNote   = (note:  string) => ({ type: SET_NOTES_COUNT, value: note });
export const incSpeed  = () => ({ type: SPEED_INCREMENT });
export const decSpeed  = () => ({ type: SPEED_DECREMENT });
export const playMetro = () => ({ type: PLAY });
export const stopMetro = () => ({ type: STOP });
export const step      = () => ({ type: STEP_INCREMENT });
