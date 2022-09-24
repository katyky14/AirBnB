
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useHistory, useParams } from 'react-router-dom';

import { getSpotReviewThunk } from '../../store/review';

import '../ReviewCss/GetSpotReview.css'


const GetReviews = () => {


    const dispatch = useDispatch();
    const { spotId } = useParams();
    const reviewObj = useSelector(state => state.review)
    const reviewArr = Object.values(reviewObj);

    useEffect(() => {
        dispatch(getSpotReviewThunk(spotId))
    }, [dispatch])

   // console.log('the review here appearing')

    return reviewArr.length && (
        <div>
            <div className='spot-rev'>
                {reviewArr.map(rev => (
                    <div key={rev.id}>
                        <div>
                        <div className='star-rev1'> <i class="fa-solid fa-star"></i>{rev.stars}</div>
                        <div className='spot-rev-info'>{rev.review} </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default GetReviews;
