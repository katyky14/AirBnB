import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useHistory, useParams } from 'react-router-dom';


import { getUserReviewThunk } from '../../store/review';
import { deleteReviewThunk } from '../../store/review';

const ReviewCurrentUser = () => {
    const dispatch = useDispatch();
    const history = useHistory()


    const reviewObj = useSelector(state => state.review)
    console.log('the reviewObj', reviewObj)
    const reviewArr = Object.values(reviewObj);

    useEffect(() => {
        dispatch(getUserReviewThunk())
    }, [dispatch])

    return (
        <div>
            <h1>Review current Testing</h1>
            {reviewArr.map(review => (
                <div key={review.id}>
                    <div> Review ID --{review.id}</div>
                    <div> {review.review}</div>
                    <div>Stars {review.stars} </div>
                    <div>
                    <button onClick={async () =>{ await dispatch(deleteReviewThunk(review.id))
                    history.push('/reviews')
                    }}>
                         delete review
                         </button>

                    </div>
                </div>
            ))}
        </div>
    )



}

export default ReviewCurrentUser;
