import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { NavLink } from 'react-router-dom';
import { getOneSpotDetails } from '../../store/spot';

const SpotByDetail = () => {

    const { spotId } = useParams();
    const spotsObj = useSelector(state => state.spot['oneSpot']);
    //const spotsArr = Object.values(spotsObj)
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    //console.log('the spotsObj in Spot Details--', spotsObj)

    useEffect(() => {
        dispatch(getOneSpotDetails(spotId)).then(setIsLoaded(true))
    }, [dispatch, spotId])

    console.log('the spot object is ----', spotsObj)
    //console.log('the spots array is ---', spotsArr)

    /** Code using optionals, does the same thing as code below */
    // const imgUrl = spotsObj?.Images?.[0].url;
    // // console.log('the image url variable----', imgUrl)

    // return isLoaded && (
    //     <main>
    //         {/* <NavLink to={`/spots/${spot.id}`}></NavLink> */}
    //         <h1>TESTING  ONE SPOT BY DETAIL</h1>
    //         {/* {spotsArr.map(spot => (
    //             <div key={spot.id}>

    //             <ul >
    //                 <li>{spot.address}</li>
    //             </ul>
    //             </div>
    //         ))} */}
    //         <div><img alt='image' src={`${imgUrl}`}></img></div>
    //         <div>{spotsObj?.address}</div>
    //         <div>{spotsObj?.city}</div>
    //     </main>
    // )

    if (spotsObj != null && spotsObj.Images != null && isLoaded ) {
        return (
            <main>
            {/* <NavLink to={`/spots/${spot.id}`}></NavLink> */}
            <h1>TESTING  ONE SPOT BY DETAIL</h1>
            {/* {spotsArr.map(spot => (
                <div key={spot.id}>

                <ul >
                    <li>{spot.address}</li>
                </ul>
                </div>
            ))} */}
            <div><img alt='image' src={spotsObj.Images[0].url}></img></div>
            <div>{spotsObj.address}</div>
            <div>{spotsObj.city}</div>
        </main>
        )
    }

    return "Loading... 😵‍💫";
}


export default SpotByDetail;
