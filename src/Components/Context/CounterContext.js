import { createContext, useState } from 'react';

export let CounterContext = createContext(0);

export default function CounterContextProvider(props) {

    const [counter, setCounter] = useState(0)

    return <CounterContext.Provider value={counter}>

        {props.children}

    </CounterContext.Provider>
}