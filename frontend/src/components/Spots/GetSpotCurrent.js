import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';

import { getCurrentSpotThunk } from '../../store/spot';
import { deleteSpotThunk } from '../../store/spot';

import {getUserReviewThunk} from '../../store/review'

const GetSpotByCurrentUser = () => {


    const dispatch = useDispatch();
    const spotsObj = useSelector(state => state.spot) // access store
    console.log('the spot OBJ in component', spotsObj)
    //const { spotId } = useParams();
    //console.log('THE OTHER SPOT---', spotsObj)
    //console.log('the spot object in CURRENT---', spotsObj['currentSpot'].Spots)
    const spotsArr = Object.values(spotsObj);
    //console.log('the ARRAY spot is---', spotsArr[0].name)
    const [isLoaded, setIsLoaded] = useState(false);


    const reviewObj = useSelector(state => state.review);
    console.log('the USER review', reviewObj);

    useEffect(() => {
        dispatch(getCurrentSpotThunk()).then(setIsLoaded(true)) // populate store
        dispatch(getUserReviewThunk())
    }, [dispatch])

    //console.log('the map ---', spotsArr.map(ele => ele))

    //console.log('the spots objects in ---', spotsObj)
    if (!spotsArr.length) return null

    return isLoaded && (
        <div>
            <div>Testing Get Spots By current user </div>
            {/* <div>{obj.name}</div>
            <div>{obj.city}</div>
            <div>{obj.state}</div>
            <div>{obj.price}</div> */}
            {spotsArr.map(spot => (
                <div key={spot.id}>
                    <div>ID --- {spot.id}</div>
                    <div>{spot.name}</div>
                    <div>{spot.city}</div>
                    <div>{spot.description}</div>
                    <div>{spot.price}</div>
                    <div>
                        <button ><NavLink to={`/spots/${spot.id}/edit`}>edit spot</NavLink></button>
                    </div>

                    <div>
                        <button onClick={async () => await dispatch(deleteSpotThunk(spot.id))} > delete spot</button>
                    </div>
                </div>

            ))}




        </div>
    )
}


export default GetSpotByCurrentUser;
