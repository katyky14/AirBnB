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
        dispatch(getSpotsThunk()).then(setIsLoaded(true))
    }, [dispatch]);



    return isLoaded && (

        <section >
            {/* <h1>TESTING IN GET All SPOTS</h1> */}
            <div className='main-div'>
                {spotsArr.map(spot => (
                    // <li key={spot.id}>
                    //     <NavLink to='/'><img src={`${spot.previewImage}`}></img></NavLink>
                    //     <div>{spot.city}</div>
                    //     <div>{spot.state}</div>
                    //     <div>${spot.price} night</div>
                    //     <div>Star {spot.avgRating}</div>
                    // </li>
                    <div key={spot.id}>

                        {/* <div>Spot ID --{spot.id}</div> */}

                        <div >
                        <NavLink to={`/spots/${spot.id}`} >
                            <img src={`${spot.previewImage}`}className='img-div'></img>
                        </NavLink>
                        </div>

                        <div className='info-div'>
                        <div>{spot.city}, {spot.state}</div>
                        {/* <div>{spot.state}</div> */}
                        <div>⭐️ {spot.avgRating ? Number.parseFloat(spot.avgRating).toFixed(2) : 0}</div>
                        </div>
                        <div className='price-div'>${spot.price} night</div>


                    </div>
                ))}
            </div>
        </section>
    );
}

export default GetAllSpots;
