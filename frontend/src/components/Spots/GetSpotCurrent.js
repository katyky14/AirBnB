import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';

import { getCurrentSpotThunk } from '../../store/spot';
import { deleteSpotThunk } from '../../store/spot';

const GetSpotByCurrentUser = () => {


    const dispatch = useDispatch();
    const spotsObj = useSelector(state => state.spot) // access store
    const { spotId } = useParams();
    console.log('the spot object---', spotsObj['currentSpot'])
    const spotsArr = Object.values(spotsObj);
    console.log('the ARRAY spot is---', spotsArr)
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(getCurrentSpotThunk()).then(setIsLoaded(true)) // populate store

    }, [dispatch])



    //console.log('the spots objects in ---', spotsObj)
    if (!spotsArr.length) return null

    return isLoaded && (
        <div>
            <div>Testing Get Spots By current user </div>
            {spotsArr.map(spot => {
                <div key={spot.id}>
                    {/* <div>{spotsObj?.Spots.address}</div> */}
                    {/* <div><img src={spot.previewImage}></img></div> */}
                    <div>{spot.name}</div>
                    <div>{spot.city} {spot.state}</div>
                    <div>{spot.description}</div>
                    <div>{spot.price}</div>
                    <div>
                        <button ><NavLink to={`/spots/${spot.id}/edit`}>edit spot</NavLink></button>
                    </div>
                    <div>
                        <button onClick={async () => await dispatch(deleteSpotThunk(spotId))} > delete spot</button>
                    </div>
                </div>
            })}
        </div>
    )
}


export default GetSpotByCurrentUser;
