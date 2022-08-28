
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useHistory, useParams } from 'react-router-dom';

import { getSpotReviewThunk } from '../../store/review';

import '../ReviewCss/GetSpotReview.css'


const GetReviews = () => {

    const dispatch = useDispatch();
    const { spotId } = useParams();

    const reviewObj = useSelector(state => state.review)
    //console.log('the review in Review', reviewObj)


    const reviewArr = Object.values(reviewObj);
    //console.log('the review arr', reviewArr)


    useEffect(() => {
        dispatch(getSpotReviewThunk(spotId))
    }, [dispatch])



    return reviewArr.length && (
        <div>
            {/* <h1>GET REVIEWS SPOT ID</h1> */}
            <div className='spot-rev'>
                {reviewArr.map(rev => (
                    <div key={rev.id}>
                        <div>
                        <div> <i class="fa-solid fa-star"></i> {rev.stars} </div>
                        <div className='spot-rev-info'>{rev.review} </div>
                        </div>
                    </div>

                ))}
            </div>



        </div>
    )


}


export default GetReviews;
