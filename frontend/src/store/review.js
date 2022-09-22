import { useStore } from 'react-redux';
import { csrfFetch } from './csrf';

/*****************************************************/
//type
const GET_USER_REVIEWS = 'reviews/GET_REVIEWS_USER';
const GET_SPOT_REVIEWS = 'reviews/GET_SPOT_REVIEWS';

const ADD_REVIEW = 'reviews/ADD_REVIEW'

const DELETE_REVIEW = 'reviews/DELETE_REVIEW'


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


const addOneReview = (review) => {
    return {
        type: ADD_REVIEW,
        review
    }
}

const deleteOneReview = (review) => {
    return {
        type: DELETE_REVIEW,
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
        //console.log('the data in review', data)
        dispatch(getUserReviews(data.Reviews))
    }
}

//CREATE REVIEW spotId, reviewData
export const createReviewThunk = (reviewData) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${reviewData.spotId}/reviews`, {
        method: 'POST',
        headers:  { 'Content-Type': "application/json"},
        body: JSON.stringify(reviewData)
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(addOneReview(data))
        return data;
    }
}


export const deleteReviewThunk = (id) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {
        const data = response.json();
        dispatch(deleteOneReview(id))
    }
}

//edit a review
export const editReviewThunk = (id, payload) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(addOneReview(data));
        return data;
    }
}

const initialState = {}

const reviewReducer = (state = initialState, action) => {
    let newState = {};

    switch (action.type) {
        case GET_SPOT_REVIEWS:
        newState = {};
        action.reviews.forEach(reviewEle => {
            newState[reviewEle.id] = reviewEle
        });
        return newState

        case GET_USER_REVIEWS:
            newState = {};
            action.review.forEach(ele => {
                newState[ele.id] = ele
            })
            return newState;

        case ADD_REVIEW:

                const newStateForm = { ...state};
                newStateForm[action.review.id] = action.review
                return newStateForm

            case DELETE_REVIEW:
                newState = { ...state};
                delete newState[action.review]

                return newState;

        default:
            return state;
    }
}



export default reviewReducer;
