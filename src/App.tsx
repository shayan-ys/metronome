import React from 'react';
import { Provider } from 'react-redux';
import Metronome from "./components/Metronome/Metronome";
import {SpeedStore} from "./components/Metronome/speed/store";

function App() {
    return (
        <Provider store={SpeedStore}>
            <Metronome />
        </Provider>
    );
}

export default App;
