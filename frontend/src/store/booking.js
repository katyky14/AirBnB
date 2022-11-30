import { csrfFetch } from "./csrf";


//types
const GET_BY_SPOT_ID = 'booking/GET_SPOT_BY_ID'
const GET_CURRENT_BOOKING = 'booking/GET_BOOKING';

const ADD_ONE_BOOKING = 'booking/ADD_ONE_BOOKING';

const EDIT_BOOKING = 'booking/EDIT_BOOKING'
const DELETE_BOOKING = 'booking/DELETE_BOOKING'


/***************** actions ******************/
//actions

const getBookingsSpotId = booking => {
    return {
        type: GET_BY_SPOT_ID,
        booking
    }
}

const getBookingCurrentUser = payloadBooking => {
    return {
        type: GET_CURRENT_BOOKING,
        payloadBooking
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
        console.log('the data', data)
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
    const responseData = await csrfFetch(' /api/spots/:spotId/bookings', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData)
    });

    const response = await csrfFetch(`/api/spots/${spotId}/bookings`, responseData)

    if(response.ok) {
        const data = await response.json();

        dispatch(addOneBooking(data));
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
        return response
    }
}


const initialState = {};

/*********************  reducers *****************************/

const bookingReducer = (state = initialState, action) => {
    let newState = {};

    switch (action.type) {
        case GET_CURRENT_BOOKING:
            newState = {...state};
            action.payloadBooking.forEach(spot => {
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


        default:
            return state;

    }


}


export default bookingReducer;
