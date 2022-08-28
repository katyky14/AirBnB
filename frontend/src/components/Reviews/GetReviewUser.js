import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useHistory, useParams } from 'react-router-dom';


import { getUserReviewThunk } from '../../store/review';
import { deleteReviewThunk } from '../../store/review';

import '../ReviewCss/GetUserReview.css'

const ReviewCurrentUser = () => {
    const dispatch = useDispatch();
    const history = useHistory()


    const reviewObj = useSelector(state => state.review)
    //console.log('the reviewObj', reviewObj)
    const reviewArr = Object.values(reviewObj);

    useEffect(() => {
        dispatch(getUserReviewThunk())
    }, [dispatch])

    const userReview = useSelector(state => state.session.user);
    //console.log('the user review', userReview)


    const filter = reviewArr.filter(review => review?.userId === userReview?.id); // reconsider how we want determine user log out state
    //console.log('reviewArr', reviewArr);
    //console.log('the filter', filter)
    // if (!filter.length) {
    //     return alert('Must be the user or be logged in to delete spot')
    // }


    // if (!filter.length) {
    //     alert("please log in")
    //     history.push('/')
    // }

    return (
        <div className='rev-page-div'>
            <h1>My Reviews</h1>
            <div className='rev-main-div'>

                {filter.map(review => (
                    <div key={review.id}>
                        {/* <div> Review ID --{review.id}</div> */}

                        <div className='info-rev-div'>
                            <div className='details-div'>
                            <div className='review-div'> {review.review}</div>
                            {/* {review.Images?.[0]?.url && <img src={review.Images?.[0]?.url} />} */}
                            <div className='rate-div'> Rating <i class="fa-solid fa-star"></i>{review.stars} </div>
                            </div>
                            <div>
                                <button onClick={async () => {
                                    await dispatch(deleteReviewThunk(review.id))
                                    // history.push('/reviews')
                                }}
                                className='button-rev-user'>
                                    delete review
                                </button>
                            </div>

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
