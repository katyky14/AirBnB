import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import '../spotCss/GetSpotDetails.css';
import { NavLink } from 'react-router-dom';
import { getOneSpotDetails } from '../../store/spot';
import GetReviews from '../Reviews/GetSpotReviews';

// import { getSpotReviewThunk } from '../../store/review';


const StyledNavLink3 = (props) => {
    return <NavLink {...props} className={`${props.className} my-navlink-style3`} />
}

const SpotByDetail = () => {

    const { spotId } = useParams();
    const spotsObj = useSelector(state => state.spot);
    const spotsArr = Object.values(spotsObj)
    const userObj = useSelector(state => state.session.user)
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const reviewDetails = useSelector(state => state.review)
    const reviewArr = Object.values(reviewDetails);
    const userRev = useSelector(state => state.session.user?.id)
    const spotOwner = useSelector(state => state.spot[spotId]?.ownerId)
    const userFilter = reviewArr.filter(rev => userRev === rev.userId)

    console.log('the user',spotsObj)


    useEffect(() => {
        dispatch(getOneSpotDetails(spotId)).then(() => setIsLoaded(true))

    }, [dispatch, spotId, reviewDetails])

    // if (spotsArr != null && spotsObj.Images != null && isLoaded) {
    return spotsArr.length && isLoaded && (
        <main className='center-spot-detail'>


            <div className="main-div2">
                {spotsArr.map(spot => (
                    <div key={spot.id}>

                        <h1 className="name-div test-h1">{spot.address}</h1>

                        <div className="top-div-info test-detail">
                            <span className="span-info1">
                                <div><i class="fa-solid fa-star"></i> {spot.avgRating ? Number.parseFloat(spot.avgRating).toFixed(2) : 0} </div>
                                <div className="space-div2"> - {spot.numReviews} Reviews</div>
                            </span>
                            <div className='span-info2 test-info'> {spot.city} , {spot.state}, {spot.country}</div>
                        </div>
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
                                            <img className="preview-images right-top-img" src={spot.previewImage.length ? spot.previewImage : 'https://images.unsplash.com/photo-1592818868295-f527dbac420d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'} alt="" />
                                        </div>

                                        <div className='spot-preview-image '>
                                            <img className="preview-images right-bottom-img" src={spot.previewImage.length ? spot.previewImage : 'https://images.unsplash.com/photo-1592818868295-f527dbac420d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h2 className='h2-spot'>Entire home hosted by {spotsObj[spotId] && spotsObj[spotId]?.Owner.firstName} </h2>
                        <p className="border-div">{spot.description}</p>
                        <div className="stars-div">
                            <div className="span-info3">
                                <div><i class="fa-solid fa-star"></i> {spot.avgRating ? Number.parseFloat(spot.avgRating).toFixed(2) : 0} </div>
                                <div className="space-div2"> - {spot.numReviews} Reviews</div>
                            </div>
                            { userObj?.id !== null &&
                            // userObj?.id != null && spotOwner !== userRev && !userFilter.length &&
                                // <button className="button-div2"><StyledNavLink3 to={`/spots/${spot.id}/reviews`} >Add a Review</StyledNavLink3></button>
                                <StyledNavLink3 to={`/spots/${spot.id}/reviews`} className='button-div2'>Add a Review</StyledNavLink3>

                                }
                        </div>

                        {
                            spot.numReviews !== 0 &&
                        <div className='spot-reviews' > <GetReviews /> </div>
                        }

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
