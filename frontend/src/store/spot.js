import { csrfFetch } from './csrf';


//types
const GET_SPOTS = 'spot/GET_SPOTS'; //get all spots?
const GET_SPOTS_DETAIL = 'spot/GET_SPOT_DETAILS' // get one spot by detail?
const GET_CURRENT_SPOTS = 'spot/GET_CURRENT_SPOTS' //get spot by current user

const ADD_ONE_SPOT = 'spot/ADD_ONE_SPOT';


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
const getSpotOfCurrentUser = payload => {
    return {
        type: GET_CURRENT_SPOTS,
        payload
    }
}

const addOneSpot = payload => ({
    type: ADD_ONE_SPOT,
    payload
});

/*********************************************************** */
//thunk actions creator

export const getSpotsThunk = () => async dispatch => {
    const response = await fetch(`/api/spots`, {
        method: 'GET'
    });

    //console.log('the response in reducer', response)
    if (response.ok) {
        const data = await response.json();
        //console.log('the data in get spots', data)
        dispatch(getSpots(data.Spots));
        //console.log('the data in get spots dispatch occurs', data)

    }
    //console.log('do you see me RESPONSE', response)
};


export const getOneSpotDetails = (spotId) => async dispatch => {
    //console.log('can you see me in get spot detail thunk?')
    const response = await csrfFetch(`/api/spots/${spotId}`);

    if (response.ok) {
        const data =  await response.json();
        //console.log('the spot thunk details data', data)
        dispatch(getSpotDetail(data))
    }
}


export const getCurrentSpotThunk = () => async dispatch => {
    const response = await csrfFetch(`/api/spots/current`);

    if (response.ok) {
        const data = await response.json();
        console.log('the data in spot  current ', data)
        dispatch(getSpotOfCurrentUser(data))
    }
}

export const spotFormThunk = (payload) => async (dispatch) => {
    const response = await csrfFetch('/api/spots', {
       method: 'POST',
       headers: { "Content-Type": "application/json"},
       body: JSON.stringify(payload)
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(addOneSpot(data));
        console.log('the response in spot form---', data)
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


const initialState = {
    // spotData: []
    allSpots: {},
    oneSpot: {}
}

// const sortList = (list) => {
//     return list.sort((spotA, spotB) => {
//         return spotA.number - spotB.number;
//     }).map((spot) => spot.id);
// }

/****************************************** */
//reducers
//console.log('testing spot reducer do you see me?')

const spotReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_SPOTS:
            const allSpots = {};
            action.payload.forEach(spot => { //normalize data
               // console.log('the spot', spot)
                allSpots[spot.id] = spot;
            });
           // console.log('the all spots', allSpots) // info yes
            newState = { ...state, allSpots}
            //console.log('the new state', newState.allSpots) // empty obj
            return newState
        case GET_SPOTS_DETAIL:
            const oneSpot = {...action.payload};

            return {
                ...state,//put spreaded state first or else overwrite
                oneSpot
            }

            // state.oneSpot = action.payload;
            // return state;

        case GET_CURRENT_SPOTS:
            //console.log('the action', action)
            const currentSpot = { ...action.payload};
            //console.log('in the reducer', currentSpot)
            return {
                ...state,
                currentSpot
            }

        case ADD_ONE_SPOT:
            if (!state[action.payload.id]) {
                const newStateForm = { ...state};
                newStateForm[action.payload.id] = action.payload
                //console.log('add one spot form reducer ---', newStateForm)
                return newStateForm
            }

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

export default spotReducer;
