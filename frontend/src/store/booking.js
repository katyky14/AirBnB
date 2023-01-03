import { csrfFetch } from "./csrf";


//types
const GET_BY_SPOT_ID = 'booking/GET_SPOT_BY_ID'
const GET_CURRENT_BOOKING = 'booking/GET_BOOKING';

const ADD_ONE_BOOKING = 'booking/ADD_ONE_BOOKING';

const EDIT_BOOKING = 'booking/EDIT_BOOKING'
const DELETE_BOOKING = 'booking/DELETE_BOOKING'


/***************** actions ******************/
//actions

const getBookingsSpotId = payload => {
    return {
        type: GET_BY_SPOT_ID,
        payload
    }
}

const getBookingCurrentUser = payload => {
    return {
        type: GET_CURRENT_BOOKING,
        payload
    }
}



const addOneBooking = payload => {
    return {
        type: ADD_ONE_BOOKING,
        payload
    }
}


const editBooking = payload => {
    return {
        type: EDIT_BOOKING,
        payload
    }
}

const deleteBooking = payload => {
    return {
        type: DELETE_BOOKING,
        payload
    }
}




/********************* thunks ***********************/

export const getCurrentBookingThunk = () => async (dispatch) => {

    const response = await csrfFetch(`/api/bookings/current`);
    console.log('the response in BOOK Thunk', response)

    if(response.ok) {
        const data = await response.json();
        console.log('the data', data.Bookings)
        dispatch(getBookingCurrentUser(data.Bookings))
    }
}

export const getBookingsSpotIdThunk = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`);

    if (response.ok) {
        const data = await response.json()
        dispatch(getBookingsSpotId(data.Bookings))
    }
}

export const bookingFormThunk = (spotId, bookingData) => async (dispatch) => {
   console.log('the spot id in thunk', spotId)
    const responseData = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData)
    });

    //console.log('the response data', responseData)
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`, responseData)
    //console.log('the response after data', response)
    if(response.ok) {
        const data = await response.json();
        //console.log('the data if res is ok', data)
        dispatch(addOneBooking(data));
        //console.log('the data after dispatch', data)
        return data;
    }
}

export const editBookingThunk = (bookingData, reviewId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(bookingData)
    })

    if (response.ok) {
        const data = await response.ok();
        dispatch(editBooking(data))
        return response // or return data??
    }
}


export const deleteBookingThunk = (bookingId) => async (dispatch) => {
    const responseData = {
        method: 'DELETE'
    }

    const response = await csrfFetch(`/api/bookings/${bookingId}`, responseData);

    if (response.ok) {
        dispatch(deleteBooking(bookingId))
    }

    return response;


}

const initialState = {};

/*********************  reducers *****************************/

const bookingReducer = (state = initialState, action) => {
    let newState = {};

    switch (action.type) {
        case GET_BY_SPOT_ID:
            newState = { ...action.payload};
            return newState;
        case GET_CURRENT_BOOKING:
            newState = {};
            action.payload.forEach(spot => {
                newState[spot.id] = spot
            })
            return newState;

        case ADD_ONE_BOOKING:
            if (!state[action.payload.id]) {
                const newStateForm = { ...state };
                newStateForm[action.payload.id] = action.payload
                //console.log('add one spot form reducer ---', newStateForm)
                return newStateForm
            }
            //console.log('the in reducer', action.payload)
            return {
                ...state,
                [action.payload.id]: {
                    ...state[action.payload.id],
                    ...action.payload
                }
            }
        case DELETE_BOOKING:
            newState = { ...state };
            delete newState[action.payload];
            return newState;

        default:
            return state;

    }


}


export default bookingReducer;
