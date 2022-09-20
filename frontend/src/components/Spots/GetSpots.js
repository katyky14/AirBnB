import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';


import { getSpotsThunk } from '../../store/spot';
// import SpotByDetail from './GetSpotDetails';

import '../spotCss/GetSpot.css';

const GetAllSpots = () => {

    const dispatch = useDispatch();
    const spotsObj = useSelector(state => state.spot)
    const spotsArr = Object.values(spotsObj)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(getSpotsThunk()).then(() => setIsLoaded(true))
    }, [dispatch]);



    return isLoaded && (

        <div className='section-div'>
            <div className='main-div-spots'>
                {spotsArr.map(spot => (
                    <div key={spot.id}>
                        <div className='img-card-spots'>
                        <NavLink to={`/spots/${spot.id}`} >
                            <img src={`${spot.previewImage}`} className='img-div-1'></img>
                        </NavLink>
                        <div className='info-div-spots'>
                        <div className='div-info3'>{spot.city}, &nbsp; {spot.state}</div>
                        <div><i class="fa-solid fa-star"></i> {spot.avgRating ? Number.parseFloat(spot.avgRating).toFixed(2) : 0}</div>
                        </div>
                        <div className='price-div1'>$<span style={{fontWeight: '600'}}>{spot.price} </span>night</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GetAllSpots;
