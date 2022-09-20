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

const StyledNavLink3 = (props) => {
    return <NavLink {...props} className={`${props.className} my-navlink-style3`} />
}



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
    //console.log('the ARRay in SPOT', reviewArr)

    const userRev = useSelector(state => state.session.user?.id)
    //console.log('the user rev', userRev)

    const spotOwner = useSelector(state => state.spot[spotId]?.ownerId)
    //console.log('the spot owner', spotOwner)


    useEffect(() => {
        dispatch(getOneSpotDetails(spotId)).then(() => setIsLoaded(true))
        //dispatch(getSpotReviewThunk(spotId))
    }, [dispatch, spotId, reviewDetails])

    // if (spotsArr != null && spotsObj.Images != null && isLoaded) {
    return spotsArr.length && isLoaded && (
        <main className='center-spot-detail'>
            {/* <h1>TESTING SPOT BY DETAIL</h1> */}

            <div className="main-div2">
                {spotsArr.map(spot => (
                    <div key={spot.id}>
                        {/* <div> Spot ID -- {spot.id}</div> */}

                        <h1 className="name-div"> {spot.address}</h1>

                        <div className="top-div-info">
                            <span className="span-info1">
                                <div><i class="fa-solid fa-star"></i> &nbsp; {spot.avgRating ? Number.parseFloat(spot.avgRating).toFixed(2) : 0} </div>
                                <div className="space-div2"> - {reviewArr.length} Reviews</div>
                            </span>
                            {/* <span > */}
                            <div className='span-info2'> {spot.city} , {spot.state}, {spot.country}</div>
                            {/* </span> */}
                        </div>


                        {/* <div className='img-div-spot1-container'> */}

                        {/* first image */}
                        <div className='spot-img-container'>
                            <div className='spot-img-flex'>
                                <div className='spot-first-image' >
                                    <img className="spot-image" src={spot.previewImage.length ? spot.previewImage : 'https://images.unsplash.com/photo-1592818868295-f527dbac420d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'} alt="" />
                                </div>


                                {/* two left images  2 & 3*/}
                                <div className='spot-preview-images'>
                                    <div className='preview-containers'>
                                        <div className='spot-preview-image' >
                                            <img className="preview-images" src={spot.previewImage.length ? spot.previewImage : 'https://images.unsplash.com/photo-1592818868295-f527dbac420d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'} alt="" />
                                        </div>
                                        <div className='spot-preview-image'>

                                            <img className="preview-images" src={spot.previewImage.length ? spot.previewImage : 'https://images.unsplash.com/photo-1592818868295-f527dbac420d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'} alt="" />
                                        </div>
                                    </div>

                                    {/* two right images  4 & 5*/}
                                    <div className='preview-containers'>
                                        <div className='spot-preview-image'>
                                            <img className="preview-images " src={spot.previewImage.length ? spot.previewImage : 'https://images.unsplash.com/photo-1592818868295-f527dbac420d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'} alt="" />
                                        </div>

                                        <div className='spot-preview-image '>
                                            <img className="preview-images " src={spot.previewImage.length ? spot.previewImage : 'https://images.unsplash.com/photo-1592818868295-f527dbac420d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'} alt="" />
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                        {/* </div> */}


                        <h2 className='h2-spot'>Entire home hosted by Demo </h2>

                        <p className="border-div">{spot.description}</p>


                        <div className="stars-div">
                            {/* <i class='fa-solid fa-star'></i> */}
                            <div className="span-info3">
                                <div><i class="fa-solid fa-star"></i> {spot.avgRating ? Number.parseFloat(spot.avgRating).toFixed(2) : 0} </div>
                                <div className="space-div2"> - {reviewArr.length} Reviews</div>
                            </div>
                            {userObj?.id != null && spotOwner !== userRev &&
                                <button className="button-div2"><StyledNavLink3 to={`/spots/${spot.id}/reviews`} >Add a Review</StyledNavLink3></button>
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




//https://cdn.pixabay.com/photo/2015/03/15/13/59/grave-674443_960_720.jpg
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
