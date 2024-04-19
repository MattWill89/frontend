import { useState } from 'react';

// Hook => Prebuilt Bundle of Functionalities that we "hook"
// into Components where they are used
const useStateInitializer = (initialState) => {
    // Generalized syntax for setting up any state
    const [state, setState] = useState(initialState);


    // Function to update state
    const updateState = (newState) => {
        setState(newState);
    }

    // Returning an array containing "state" and "updateState"
    // allows us to array destructuring assignment further below
    return [state, updateState];
}

export default useStateInitializer;