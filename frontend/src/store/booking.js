import { csrfFetch } from "./csrf";


//types
const GET_CURRENT_BOOKING = 'booking/GET_BOOKING';

const ADD_ONE_BOOKING = 'booking/ADD_ONE_BOOKING';




/***************** actions ******************/
//actions get user booking

const getBookingCurrentUser = payloadBooking => {
    return {
        type: GET_CURRENT_BOOKING,
        payloadBooking
    }
}


//action create booking

const addOneBooking = payload => {
    return {
        type: ADD_ONE_BOOKING,
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


export const bookingFormThunk = (bookingData) => async (dispatch) => {
    const response = await csrfFetch(' /api/spots/:spotId/bookings', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData)
    });

    if(response.ok) {
        const data = await response.json();

        dispatch(addOneBooking(data));
        return data;
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
