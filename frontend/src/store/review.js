import { csrfFetch } from './csrf';

/*****************************************************/
//type
const GET_USER_REVIEWS = 'reviews/GET_REVIEWS_USER';
const GET_SPOT_REVIEWS = 'reviews/GET_SPOT_REVIEWS';





/*********************************************************/
//action
const getSpotReview = reviews => {
    return {
        type: GET_SPOT_REVIEWS,
        reviews,
    }
}



const getUserReviews = (review) => {
    return {
        type: GET_USER_REVIEWS,
        review
    }
}






/****************************************************** */
//thunk action

//SPOT ID
export const getSpotReviewThunk = (spotId) => async dispatch => {
    const response = await fetch(`/api/spots/${spotId}/reviews`);

    if (response.ok) {
        const data = await response.json();
        //console.log('the DATA in reviews', data.Reviews)
        dispatch(getSpotReview(data.Reviews));
    }
}



//CURRENT USERT
export const getUserReviewThunk = () => async dispatch => {
    const response = await csrfFetch(`/api/reviews/current`)

    if (response.ok) {
        const data = await response.json();
        console.log('the data in review', data.Reviews)
        dispatch(getUserReviews(data.Reviews))
    }

}





const initialState = {}

/******************************************************** */
//reducer


const reviewReducer = (state = initialState, action) => {
    let newState = {};

    switch (action.type) {
        case GET_SPOT_REVIEWS:
        newState = {};
        //console.log('action reducer', action.reviews)
        action.reviews.forEach(reviewEle => {
            newState[reviewEle.id] = reviewEle
        })
        //console.log('the new state', newState)
        return newState;

        case GET_USER_REVIEWS:
            newState = {};
            action.review.forEach(ele => {
                newState[ele.id] = ele
            })
            //console.log('the new state REVIEW', newState)
            return newState;

        default:
            return state;
    }
}



export default reviewReducer;
