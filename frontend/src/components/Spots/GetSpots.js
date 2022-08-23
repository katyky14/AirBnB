import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';


import { getSpotsThunk } from '../../store/spot';
import SpotByDetail from './GetSpotDetails';

const   apple = "a";
const GetAllSpots = () => {
    console.log(apple);
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const spotsObj = useSelector(state => state.spot['allSpots'])
    const spotsArr = Object.values(spotsObj)

    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(getSpotsThunk()).then(setIsLoaded(true))
    }, [dispatch]);

    console.log('tesing in get spots')


    return isLoaded && (

        <section>
            <h1>TESTING IN GET All SPOTS</h1>

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
                                <div>{spot.city}</div>
                                <div>{spot.state}</div>
                            </li>
                        </ul>
                    </NavLink>
                ))}
            </div>

            {/* <Route path='/spots/:spotId'>
                    <SpotByDetail />
            </Route> */}

        </section>
    );
}

export default GetAllSpots;
