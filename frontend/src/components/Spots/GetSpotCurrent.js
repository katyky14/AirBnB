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
        <div>
            {/* <div>Testing Get Spots By current user </div> */}
            {/* <div>{obj.name}</div>
            <div>{obj.city}</div>
            <div>{obj.state}</div>
            <div>{obj.price}</div> */}

            <h1 > Manage My Spots</h1>

            <div className="main-div">


                {filter.map(spot => (
                    <div key={spot.id}>
                        {/* <div>Spot ID --- {spot.id}</div> */}

                        <div><img src={spot.previewImage} alt="home" className="img-div" /></div>

                        <div className="info-div">
                            <div className="address-div">{spot.address}</div>
                            <div>{spot.city}, {spot.state}</div>
                        </div>

                        <div className="price-div">${spot.price} night</div>

                        <div >
                            <button className="one-button"><NavLink activeClassName='active' to={`/spots/${spot.id}/edit`}


                            > edit spot</NavLink></button>

                            <button onClick={() => {
                                dispatch(deleteSpotThunk(spot.id))
                            }} className="one-button" > delete spot</button>

                        </div>

                        {/* <div>
                    {reviewArr.map(ele => (
                        <div key={ele.id}></div>
                        ))}history.push('/spots/current')
                    </div> */}
                    </div>
                ))}
            </div>
        </div>
    )
}


export default GetSpotByCurrentUser;
