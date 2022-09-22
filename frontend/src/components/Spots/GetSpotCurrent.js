import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useHistory, useParams } from 'react-router-dom';

import { getCurrentSpotThunk } from '../../store/spot';
import { deleteSpotThunk } from '../../store/spot';

import { getUserReviewThunk } from '../../store/review'

import '../spotCss/GetCurrentSpot.css'


const GetSpotByCurrentUser = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    const spotsObj = useSelector(state => state.spot) // access store
    const spotsArr = Object.values(spotsObj);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(getCurrentSpotThunk()).then(setIsLoaded(true)) // populate store
    }, [dispatch])

    const userSpot = useSelector(state => state.session.user)

    const filter = spotsArr.filter(spot => spot?.ownerId === userSpot?.id)
    //console.log('the filter', filter)
    // if (!filter.length) {
    //     return alert('Must be the user or be logged in to delete spot')
    // }


    // if (!filter.length) {
    //     alert("please log in")
    //     history.push('/signup')
    // }

    return isLoaded && (
        <div className='div-current-spot'>
            <h1 className='h1-current-spot'> Manage My Spots</h1>
            <div className="main-div-3">

                {filter.map(spot => (
                    <div key={spot.id}>
                        <div><img src={spot.previewImage} alt="home" className="img-div-3" /></div>
                        <div className="info-div-3">
                            <div className="address-div test-in-my-spots">{spot.address}</div>
                            <div className='test-in-my-spots'>{spot.city}, {spot.state}</div>
                        </div>
                        <div className="price-div-3">${spot.price} night</div>
                        <div >
                            <button className="one-button"><NavLink activeClassName='active'
                                style={{ textDecoration: 'none', color: 'white' }}
                                to={`/spots/${spot.id}/edit`}> Edit Spot</NavLink></button>
                            <button onClick={() => {
                                dispatch(deleteSpotThunk(spot.id))
                            }} className="one-button" > Delete Spot</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default GetSpotByCurrentUser;
