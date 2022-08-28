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
    console.log('the reviewData', reviewData)
    console.log('the id review', reviewData.spotId)
    //console.log('the REVIEW in THUNK', Review.review)
    const response = await csrfFetch(`/api/spots/${reviewData.spotId}/reviews`, {
        method: 'POST',
        headers:  { 'Content-Type': "application/json"},
        body: JSON.stringify(reviewData)
    })
    //console.log('the response', response)
    if (response.ok) {
        const data = await response.json();
        console.log('the data REVIEW ----', data)
        dispatch(addOneReview(data))
        return data;
    }
}


export const deleteReviewThunk = (id) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });
    //console.log('delete response', response)
    if (response.ok) {
        const data = response.json();
        dispatch(deleteOneReview(id))
    }
}

const initialState = {}

/******************************************************** */
//reducer

/**
const store = {
    listing: [],
};

// store.listing.push('a');

// useStore()
const richStore = magicallyAddFields(store);

// useSelector
richStore.onUpdate(store.listing, () => {
   // do stuff, like re-render
});

const action = {type: 'add', payload: 'a'}

// Dispatcher = richStore.update
richStore.update(
    // Reducer
    (store) => {
    if (action.type === 'add') store.listing.push(action.payload);

    return store;
})

richStore.update = (updater) => { // essentially take a reducer
    store = updater(store)
    richStore.runQueuedCallbacks(store);
};
 */

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
        //return {...state, ...newState};
        return newState

        case GET_USER_REVIEWS:
            newState = {};
            action.review.forEach(ele => {
                newState[ele.id] = ele
            })
            //console.log('the new state REVIEW', newState)
            // return {...state, ...newState};
            return newState;

        case ADD_REVIEW:
            // newState = {...state};
            // console.log('REVEIW REDUCER', action.review)
            // action.review.forEach(ele => {
            //     newState[ele.id] = ele
            // })
            // return newState;

            // if (!state[action.review.id]) {
                const newStateForm = { ...state};
                newStateForm[action.review.id] = action.review
                return newStateForm
            // }

            // return {
            //     ...state,
            //     [action.review.id]: {
            //         ...state[action.review.id],
            //         ...action.payload
            //     }
            // }

            case DELETE_REVIEW:
                // const newDeleteState = {...state};

                // delete newDeleteState[action.review]
                // return newDeleteState;
                newState = { ...state};
                delete newState[action.review]

                return newState;

        default:
            return state;
    }
}



export default reviewReducer;