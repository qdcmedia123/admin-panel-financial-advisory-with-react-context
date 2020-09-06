import React, {useContext} from 'react';
import {GlobalContext} from 'actions/GlobalState';

export default () => {
    const {loginWithEmailUser, auth}  = useContext(GlobalContext);
    console.log(auth);
return <div>This is dashbaord {JSON.stringify(auth)}</div>
}