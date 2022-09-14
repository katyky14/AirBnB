import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';


import { getSpotsThunk } from '../../store/spot';
// import SpotByDetail from './GetSpotDetails';

import '../spotCss/GetSpot.css';

const GetAllSpots = () => {

    const dispatch = useDispatch();
    //const { spotId } = useParams();
    const spotsObj = useSelector(state => state.spot)
    //console.log('get all spots', spotsObj)
    const spotsArr = Object.values(spotsObj)
    //console.log('spot', spotsArr)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(getSpotsThunk()).then(() => setIsLoaded(true))
    }, [dispatch]);



    return isLoaded && (

        <div className='section-div'>
            {/* <h1>TESTING IN GET All SPOTS</h1> */}
            <div className='main-div-spots'>
                {spotsArr.map(spot => (
                    <div key={spot.id}>

                        {/* <div>Spot ID --{spot.id}</div> */}

                        <div >
                        <NavLink to={`/spots/${spot.id}`} >
                            <img src={`${spot.previewImage}`} className='img-div-1'></img>
                        </NavLink>
                        </div>

                        <div className='info-div-spots'>
                        <div className='div-info3'>{spot.city}, &nbsp; {spot.state}</div>
                        {/* <div>{spot.state}</div> */}
                        <div><i class="fa-solid fa-star"></i> {spot.avgRating ? Number.parseFloat(spot.avgRating).toFixed(2) : 0}</div>
                        </div>
                        <div className='price-div1'>$<span style={{fontWeight: '600'}}>{spot.price} </span>night</div>


                    </div>
                ))}
            </div>
        </div>
    );
}

export default GetAllSpots;
