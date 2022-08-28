import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../../context/Modal';
import '../spotCss/GetSpotDetails.css';


import { NavLink } from 'react-router-dom';
import { getOneSpotDetails } from '../../store/spot';
import GetReviews from '../Reviews/GetSpotReviews';

//import { deleteSpotThunk } from '../../store/spot';

import { getSpotReviewThunk } from '../../store/review';

// import CreateReviewForm from '../Reviews/CreateReviews';

const SpotByDetail = () => {
    //const [showModal, setShowModal] = useState(false);

    //const history = useHistory();
    const { spotId } = useParams();
    const spotsObj = useSelector(state => state.spot);
    //console.log('the spot obj', spotsObj)
    const spotsArr = Object.values(spotsObj)
    //console.log('the spot arr', spotsArr)
    // const arr = spotsArr.map(spot => spot.id)
    // const filter = spotsArr.filter(spot => console.log(spot))
    // console.log('the filter', filter)
    // console.log('the arr', arr)

    const userObj = useSelector(state => state.session.user)
    //console.log('the user state', userObj)


    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    //console.log('the spotsObj in Spot Details--', spotsObj)
    //console.log('images detail ---', spotsObj.Images[0].url)

    const reviewDetails = useSelector(state => state.review)
    //console.log('the review in SPOT DETAIL', reviewDetails)
    const reviewArr = Object.values(reviewDetails);
    //console.log('the ARRay in SPOT', reviewArr.length)


    useEffect(() => {
        dispatch(getOneSpotDetails(spotId)).then(setIsLoaded(true))
        //dispatch(getSpotReviewThunk(spotId))
    }, [dispatch, spotId, reviewDetails])

    // if (spotsArr != null && spotsObj.Images != null && isLoaded) {
    return spotsArr.length && isLoaded && (
        <main>
            {/* <h1>TESTING SPOT BY DETAIL</h1> */}
            {/* <div>
                    <div><img src={spotsObj.previewImage} /></div>
                    <div>{spotsObj.id}</div>
                    <div>avgRating {spotsObj.avgRating ? Number.parseFloat(spotsObj.avgRating).toFixed(2) : 0}</div>
                    <div>{spotsObj.address}</div>
                    <div>{spotsObj.city}</div>
                    <div>{spotsObj.state}</div>
                    <h2>TreeHouse hosted by {spotsObj.name}</h2>
                    <p>{spotsObj.description}</p>
                </div>
                <div>
                    <button><NavLink to={`/spots/${spotsObj.id}/reviews`}>Add a Review</NavLink></button>

                    {reviewArr.map(ele => (
                        <div key={ele.id}>

                            <ul >
                                <li>{ele.review}</li>
                            </ul>
                        </div>
                    ))}
                </div> */}

            <div className="main-div">
                {spotsArr.map(spot => (
                    <div key={spot.id}>
                        {/* <div> Spot ID -- {spot.id}</div> */}

                        <h1 className="name-div"> {spot.address}</h1>

                        <div className="top-div-info">
                            <span className="span-info1">
                                <div><i class="fa-solid fa-star"></i>{spot.avgRating ? Number.parseFloat(spot.avgRating).toFixed(2) : 0} </div>
                                <div className="space-div"> - {reviewArr.length} Reviews</div>
                            </span>
                            <span className='span-info2'>
                                <div> {spot.city} , {spot.state}, {spot.country}</div>
                            </span>
                        </div>


                        <div><img src={spot.previewImage} alt="home" className="image-div" /></div>

                        <h2 className='h2-spot'>Entire home hosted by Demo</h2>

                        <p className="border-div">{spot.description}</p>


                        <div className="stars-div">
                            {/* <i class='fa-solid fa-star'></i> */}
                            <span className="span-info3">
                                <div>⭐️ {spot.avgRating ? Number.parseFloat(spot.avgRating).toFixed(2) : 0} </div>
                                <div className="space-div2"> - {reviewArr.length} Reviews</div>
                            </span>
                            {userObj?.id != null &&
                            <button className="button-div"><NavLink to={`/spots/${spot.id}/reviews`} >Add a Review</NavLink></button>
                            }

                        </div>

                        <div > <GetReviews /> </div>
                    </div>
                ))}
            </div>








        </main>
    )
}

//     return "Loading... 😵‍💫";
// }


export default SpotByDetail;





    //console.log('the spot object is ----', spotsObj)
    //console.log('the spots array is ---', spotsArr)

/** Code using optionals, does the same thing as code above */
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
