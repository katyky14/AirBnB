import { csrfFetch } from './csrf';

/*****************************************************/
//type
const GET_USER_REVIEWS = 'reviews/GET_REVIEWS_USER';
const GET_SPOT_REVIEWS = 'reviews/GET_SPOT_REVIEWS';





/*********************************************************/
//action
const getSpotReview = review => {
    return {
        type: GET_SPOT_REVIEWS,
        review,
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
    const response = await fetch(`/api/spots/${spotId}`);

    if (response.ok) {
        const data = await response.json();

        dispatch(getSpotReview(data));
    }

}




//CURRENT USERT
export const getUserReviewThunk = () => async dispatch => {
    const response = await csrfFetch(`/api/reviews/current`)

    if (response.ok) {
        const data = await response.json();
        //console.log('the data in review', data)
        dispatch(getUserReviews(data))
    }

}





const initialState = {}

/******************************************************** */
//reducer


const reviewReducer = (state = initialState, action) => {
    let newState = {};

    switch (action.type) {
        case GET_USER_REVIEWS:
            const allReviews = {};

            return newState;

        default:
            return state;
    }
}



export default reviewReducer;
