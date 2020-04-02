/*
 * action types
 */
export const SET_SPEED = 'SET_SPEED';
export const SPEED_INCREMENT = 'SPEED_INCREMENT';
export const SPEED_DECREMENT = 'SPEED_DECREMENT';
export const PLAY = 'PLAY';
export const STOP = 'STOP';
export const SET_TONE = 'SET_TONE';

/**
 * action
 */
export const setSpeed  = (speed: number) => ({ type: SET_SPEED, value: speed });
export const setTone   = (tone:  string) => ({ type: SET_TONE, value: tone });
export const incSpeed  = () => ({ type: SPEED_INCREMENT });
export const decSpeed  = () => ({ type: SPEED_DECREMENT });
export const playMetro = () => ({ type: PLAY });
export const stopMetro = () => ({ type: STOP });
