import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useHistory, useParams } from 'react-router-dom';


import { getUserReviewThunk } from '../../store/review';
import { deleteReviewThunk } from '../../store/review';

import '../ReviewCss/GetUserReview.css'

const ReviewCurrentUser = () => {
    const dispatch = useDispatch();

    const reviewObj = useSelector(state => state.review)
    const reviewArr = Object.values(reviewObj);

    useEffect(() => {
        dispatch(getUserReviewThunk())
    }, [dispatch])

    const userReview = useSelector(state => state.session.user);



    const filterSpot = reviewArr.filter(review => review?.userId === userReview?.id); // reconsider how we want determine user log out state

    // if (!filter.length) {
    //     return alert('Must be the user or be logged in to delete spot')
    // }


    // if (!filter.length) {
    //     alert("please log in")
    //     history.push('/')
    // }

    return filterSpot && (
        <div className='rev-page-div'>
            <h1 className='h1-my-reviews'>My Reviews</h1>
            <div className='rev-main-div'>

                {filterSpot.map(review => (
                    <div key={review.id}>
                        <div className='info-rev-div'>
                            <div className='details-div'>
                                <div className='review-div'> {review?.review}</div>
                                <div className='rate-div'> Rating <i class="fa-solid fa-star"></i>{review.stars} </div>
                            </div>

                            <button onClick={() => {
                                dispatch(deleteReviewThunk(review.id))
                                // history.push('/reviews')
                            }}
                                className='button-rev-user'>
                                Delete Review
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    // alert("please log in")
    // history.push('/')


}

export default ReviewCurrentUser;
