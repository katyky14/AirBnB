import { csrfFetch } from './csrf';


//types
const GET_SPOTS = 'spot/GET_SPOTS';
const GET_SPOTS_DETAIL = 'spot/GET_SPOT_DETAILS';
const GET_CURRENT_SPOTS = 'spot/GET_CURRENT_SPOTS';
const ADD_ONE_SPOT = 'spot/ADD_ONE_SPOT';
const DELETE_SPOT = 'spot/DELETE_SPOT';

/**********************************************/
//actions
//action for get all spots
const getSpots = payload => {
    return {
        type: GET_SPOTS,
        payload
    }
}
//action for get spot by detail
const getSpotDetail = payload => {
    return {
        type: GET_SPOTS_DETAIL,
        payload
    }
}

//action for get all spots by current user
const getSpotOfCurrentUser = payloadSpot => {
    return {
        type: GET_CURRENT_SPOTS,
        payloadSpot
    }
}


const addOneSpot = payload => {
    return {
        type: ADD_ONE_SPOT,
        payload
    }
}


const deleteOneSpot = id => {
    return {
        type: DELETE_SPOT,
        id
    }
}



/*********************************************************** */
//thunk actions creator

export const getSpotsThunk = () => async dispatch => {
    const response = await fetch(`/api/spots`, {
        method: 'GET'
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(getSpots(data.Spots));
    }
};


export const getOneSpotDetails = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(getSpotDetail(data))
    }
}


export const getCurrentSpotThunk = () => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/current`);
    if (response.ok) {
        const data = await response.json();
        dispatch(getSpotOfCurrentUser(data.Spots))
    }
}

export const spotFormThunk = (spotData) => async (dispatch) => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(spotData)
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(addOneSpot(data));
        return data;
    }
}

export const editSpotThunk = (id, payload) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(addOneSpot(data));
        return data
    }
}

export const deleteSpotThunk = (id) => async dispatch => {

    const response = await csrfFetch(`/api/spots/${id}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" }
    });
    if (response.ok) {
        const data = await response.json();
        //console.log('the data delete SPOT', data)
        dispatch(deleteOneSpot(id))
    }
}

const initialState = {}

const spotReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
        case GET_SPOTS:
            const allSpots = {};

            action.payload.forEach(spot => {
                allSpots[spot.id] = spot;
            });
            newState = { ...state, allSpots }
            return allSpots

        case GET_SPOTS_DETAIL:
           newState = {};
           newState[action.payload.id] = action.payload
           return newState;

        case GET_CURRENT_SPOTS:
            newState = {...state};
            action.payloadSpot.forEach(spot => {
                newState[spot.id] = spot
            });
            return newState;

        case ADD_ONE_SPOT:
            if (!state[action.payload.id]) {
                const newStateForm = { ...state };
                newStateForm[action.payload.id] = action.payload
                return newStateForm
            }
            return {
                ...state,
                [action.payload.id]: {
                    ...state[action.payload.id],
                    ...action.payload
                }
            }

        case DELETE_SPOT:
            newState = {...state}
            delete newState[action.id];

            return newState;

        default:
            return state;
    }
}

export default spotReducer;
