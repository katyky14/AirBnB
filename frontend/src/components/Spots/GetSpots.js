import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';

import { getSpots } from '../../store/spot';


const GetAllSpots = () => {
    const dispatch = useDispatch();

    const spotsObj = useSelector(state => state.spot)
    const spotsArr = Object.values(spotsObj)

    useEffect(() => {
        dispatch(getSpots())
    }, [dispatch]);

    console.log('tesing in get spots')
    //console.log('the testing in getSpots', spot)
    return (

        <section>
            <h1>TESTING IN GET SPOTS</h1>

            <ul>
            {spotsArr.map(spot => (
                <li key={spot.id}>
                    <div>{spot.city}</div>
                    <div>{spot.state}</div>
                    <div>{spot.country}</div>
                </li>
            ))}
            </ul>


      </section>
    );
}

export default GetAllSpots;
