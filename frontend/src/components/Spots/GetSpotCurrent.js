import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useHistory, useParams } from 'react-router-dom';

import { getCurrentSpotThunk } from '../../store/spot';
import { deleteSpotThunk } from '../../store/spot';

import {getUserReviewThunk} from '../../store/review'

const GetSpotByCurrentUser = () => {


    const dispatch = useDispatch();
    //const history = useHistory()
    const spotsObj = useSelector(state => state.spot) // access store
    //console.log('the spot OBJ in component', spotsObj)
    //const { spotId } = useParams();
    //console.log('THE SPOT---', spotsObj)
    //console.log('the spot object in CURRENT---', spotsObj['currentSpot'].Spots)
    const spotsArr = Object.values(spotsObj);
    //console.log('the ARRAY spot is---', spotsArr[0].name)
    const [isLoaded, setIsLoaded] = useState(false);


    // const reviewObj = useSelector(state => state.review);
    // console.log('the USER review', reviewObj);
    // const reviewArr = Object.values(reviewObj);
    // console.log('USER ARR review', reviewArr);



    useEffect(() => {
        dispatch(getCurrentSpotThunk()).then(setIsLoaded(true)) // populate store
        //dispatch(getUserReviewThunk())
    }, [dispatch])

    const userSpot = useSelector(state => state.session.user)

    const filter = spotsArr.filter(spot => spot?.ownerId === userSpot?.id)
    //console.log('the filter', filter)
    // if (!filter.length) {
    //     return alert('Must be the user or be logged in to delete spot')
    // }


    if (!spotsArr.length) return null

    return isLoaded && (
        <div>
            <div>Testing Get Spots By current user </div>
            {/* <div>{obj.name}</div>
            <div>{obj.city}</div>
            <div>{obj.state}</div>
            <div>{obj.price}</div> */}
            {filter.map(spot => (
                <div key={spot.id}>

                    <div>Spot ID --- {spot.id}</div>
                    <div>{spot.name}</div>
                    <div>{spot.city}</div>
                    <div>{spot.description}</div>
                    <div>{spot.price}</div>
                    <div>
                        <button ><NavLink to={`/spots/${spot.id}/edit`}>edit spot</NavLink></button>
                    </div>

                    <div>
                        <button onClick={() => {
                            dispatch(deleteSpotThunk(spot.id))
                        }} > delete spot</button>
                    </div>

                    {/* <div>
                    {reviewArr.map(ele => (
                        <div key={ele.id}></div>
                        ))}history.push('/spots/current')
                    </div> */}
                </div>

            ))}


        </div>
    )
}


export default GetSpotByCurrentUser;
