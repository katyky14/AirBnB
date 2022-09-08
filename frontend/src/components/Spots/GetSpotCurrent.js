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
                        {/* <div>Spot ID --- {spot.id}</div> */}

                        <div><img src={spot.previewImage} alt="home" className="img-div-3" /></div>

                        <div className="info-div-3">
                            <div className="address-div">{spot.address}</div>
                            <div>{spot.city}, {spot.state}</div>
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
