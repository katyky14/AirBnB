
//types
//const ADD_SPOT = 'spot/ADD_SPOT';
const GET_SPOTS = 'spot/GET_SPOTS'; //get all spots?


//actions
const getSpot = payload => {

    return {
        type: GET_SPOTS,
        payload
    }
}

// const addOneSpot = spot => ({
//     type: ADD_SPOT,
//     spot
// });


//thunk actions creator

export const getSpots = () => async dispatch => {
    const response = await fetch(`/api/spots`, {
        method: 'GET'
    });

    console.log('the response in reducer', response)
    if (response.ok) {
        const data = await response.json();
        console.log('the data in get spots', data)
        dispatch(getSpot(data.Spots));
    }
    console.log('do you see me RESPONSE', response)
};


// export const spotForm = (payload) => async (dispatch) => {
//     const response = await fetch('api/spots', {
//        method: 'POST',
//        headers: { "Content-Type": "application/json"},
//        body: JSON.stringify(payload)
//     });

//     if (response.ok) {
//         const list = await response.json();
//         dispatch(addOneSpot(list));
//         return list;
//     }
// }


const initialState = {
    spotData: []
}

// const sortList = (list) => {
//     return list.sort((spotA, spotB) => {
//         return spotA.number - spotB.number;
//     }).map((spot) => spot.id);
// }

//reducers
//console.log('testing spot reducer do you see me?')

const spotReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SPOTS:
            const allSpots = {};
            action.payload.forEach(spot => {
                allSpots[spot.id] = spot;
            });

            return {
                ...allSpots,
                ...state,
                // list: sortList(action.list)
            }
        default:
            return state;
    }
}

export default spotReducer;
