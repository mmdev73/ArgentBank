import React from 'react'
import { useSelector } from 'react-redux'

const TestReduxPersist = () => {
    const auth = useSelector(state => state.auth)
    return (
        <div>
            <pre>{JSON.stringify(auth, null, 2)}</pre>
        </div>
    );
};

export default TestReduxPersist;
