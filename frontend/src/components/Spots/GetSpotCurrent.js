import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';

import { getCurrentSpotThunk } from '../../store/spot';

const GetSpotByCurrentUser = () => {

    const dispatch = useDispatch();
    const spotsObj = useSelector(state => state.spot['currentSpot']) // access store

    useEffect(() => {
        dispatch(getCurrentSpotThunk()) // populate store


    }, [dispatch])



    //console.log('the spots objects in ---', spotsObj)

    return (
        <div>
            <div>Testing Get Spots By current user</div>
            <div>{spotsObj?.Spots.address}</div>
        </div>
    )
}


export default GetSpotByCurrentUser;
