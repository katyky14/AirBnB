import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';


import { getSpotsThunk } from '../../store/spot';
// import SpotByDetail from './GetSpotDetails';


const GetAllSpots = () => {

    const dispatch = useDispatch();
    const { spotId } = useParams();
    const spotsObj = useSelector(state => state.spot)
    console.log('get all spots', spotsObj)
    const spotsArr = Object.values(spotsObj)

    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(getSpotsThunk()).then(setIsLoaded(true))
    }, [dispatch]);



    return isLoaded && (

        <section>
            <h1>TESTING IN GET All SPOTS</h1>
            <button ><NavLink to={`/spots/current`}>user spots</NavLink></button>

            <div>
                {spotsArr.map(spot => (
                    // <li key={spot.id}>
                    //     <NavLink to='/'><img src={`${spot.previewImage}`}></img></NavLink>
                    //     <div>{spot.city}</div>
                    //     <div>{spot.state}</div>
                    //     <div>${spot.price} night</div>
                    //     <div>Star {spot.avgRating}</div>
                    // </li>
                    <NavLink key={spot.id} to={`/spots/${spot.id}`} >
                        <ul>
                            <li>
                                <div><img src={`${spot.previewImage}`}></img></div>
                                <div>{spot.id}</div>
                                <div>{spot.name}</div>
                                <div>{spot.city}</div>
                                <div>{spot.state}</div>
                                <div>${spot.price}</div>
                                {/* <div>{spot.avgRating ? Number.parseFloat(avgRating).toFixed(2)}</div> */}
                            </li>
                        </ul>
                    </NavLink>
                ))}
            </div>
        </section>
    );
}

export default GetAllSpots;
