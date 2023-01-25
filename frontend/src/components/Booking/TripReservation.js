// import { useParams, useHistory } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";

// import { getCurrentBookingThunk } from "../../store/booking";
// import { editBookingThunk } from "../../store/booking";
// import { deleteBookingThunk } from "../../store/booking";
// import MapContainer from "../Maps";

// function BookingTrip() {
//     const { spotId } = useParams();
//     const { bookingId } = useParams();

//     // console.log('the spot id', spotId)
//     // console.log('the booking id', bookingId)

//     const spots = useSelector((state) => state.spots);

//     // console.log('the spots', spots)

//     //const spot = spots[spotId];

//     const users = useSelector(state => state.users);
//     console.log('the users in trip', users)

//     //const spotOwner = users[spot?.ownerId];

//     const dispatch = useDispatch();
//     const history = useHistory();

//     const bookingObj = useSelector(state => state.bookings)

//     //const currentBooked = bookingObj[bookingId]


//     useEffect(() => {
//         dispatch(getCurrentBookingThunk())
//     }, [dispatch])


//     // const startInt = new Date(currentBooked?.startDate).getDay()


//     // const endInt = new Date(currentBooked?.endDate).getDay()

//     let dateDiffInt;

//     // if (isNaN((new Date(currentBooked?.endDate) - new Date(currentBooked?.startDate)) / 86400000) || ((new Date(currentBooked?.endDate) - new Date(currentBooked?.startDate)) / 86400000) < 0) {
//     //   dateDiffInt = 0;
//     // } else {
//     //   dateDiffInt = (new Date(currentBooked?.endDate) - new Date(currentBooked?.startDate)) / 86400000
//     // }

//     const weekday = (day) => {
//       if (day === 6) return 'Sun'
//       if (day === 0) return 'Mon'
//       if (day === 1) return 'Tue'
//       if (day === 2) return 'Wed'
//       if (day === 3) return 'Thu'
//       if (day === 4) return 'Fri'
//       if (day === 5) return 'Sat'
//     }

//     const deleteBooked = (bookingId, spotId) => {
//         dispatch(deleteBookingThunk(bookingId, spotId)).then(() => dispatch(getCurrentBookingThunk())).then(() => history.push(`/user/bookings`))
//     }

//     return (
//         <div>
//             <div>
//                 <h1>My trips</h1>
//                 <div>
//                     <div>
//                         {/* <img src={spot?.previewImage} alt='' /> */}
//                     </div>


//                     <div>
//                         <div>
//                             Check-in
//                         </div>
//                         <div>
//                             {/* {`${weekday(startInt)}, ${currentBooked?.startDate}`} */}
//                         </div>
//                         <div>11:00 AM</div>
//                     </div>

//                 </div>
//             </div>






//         </div>
//     )


// }

// export default BookingTrip


import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { getCurrentBookingThunk } from "../../store/booking";
import { editBookingThunk } from "../../store/booking";
import { deleteBookingThunk } from "../../store/booking";
import MapContainer from "../Maps";

import './tripReservation.css'

function BookingTrip() {

    const dispatch = useDispatch();
    const history = useHistory();

    const { spotId } = useParams();
    const { bookingId } = useParams();

    const spots = useSelector(state => state.spot);
    //console.log('the spots', spots)
    //console.log('the spot id', spotId)
    const spot = spots[spotId];
    console.log('the spot', spot)
    const bookings = useSelector(state => state.booking);

    const users = useSelector(state => state.session);

    const spotOwner = users[spot?.ownerId];

    const booked = bookings[bookingId];

    useEffect(() => {
        dispatch(getCurrentBookingThunk());

    }, [dispatch])


    const startInt = new Date(booked?.startDate).getDay();

    const endInt = new Date(booked?.endDate).getDay();


    let dateDiffInt;

    if (isNaN((new Date(booked?.endDate) - new Date(booked?.startDate)) / 86400000) || ((new Date(booked?.endDate) - new Date(booked?.startDate)) / 86400000) < 0) {
        dateDiffInt = 0;
    } else {
        dateDiffInt = (new Date(booked?.endDate) - new Date(booked?.startDate)) / 86400000
    }

    const weekday = (day) => {
        if (day === 6) return 'Sun';
        if (day === 0) return 'Mon';
        if (day === 1) return 'Tue';
        if (day === 2) return 'Wed';
        if (day === 3) return 'Thu';
        if (day === 4) return 'Fri';
        if (day === 5) return 'Sat';
    }

    const deletedBooked = (bookingId, spotId) => {
        dispatch(deleteBookingThunk(bookingId, spotId)).then(dispatch(getCurrentBookingThunk())).then(history.push('/'))
    }


    return (
        <div className="trip-reservation-outer-container">
            <div className="trip-reservation-container">
                <div className="trip-reservation-inner-container">


                    <div className="trip-reservation-img-container">
                        <img className="trip-reservation-img" src={spot?.previewImage} alt='trip-reservation-img' />
                    </div>

                    <div className="trip-reservation-info-container">
                        <div className="trip-reservation-checkin-checkout-container">
                            <div className="trip-reservation-check-container">

                                <div className="trip-reservation-checkin-container">

                                    <div className="trip-reservation-checkin">CHECK-IN</div>
                                    <div className="trip-reservation-checkin-date">{`${weekday(startInt)}, ${booked?.startDate}`}</div>
                                    <div className="trip-reservation-checkin-time">3:00PM</div>

                                </div>

                                <div className="trip-reservation-checkin-container">

                                    <div className="trip-reservation-checkin">CHECKOUT</div>
                                    <div className="trip-reservation-checkin-date">{`${weekday(endInt)}, ${booked?.startDate}`}</div>
                                    <div className="trip-reservation-checkin-time">11:00AM</div>

                                </div>

                            </div>
                        </div>

                        <div className="trip-reservation-details-container">
                            <div className="trip-reservation-reserved-details-container">
                                <div className="trip-reservation-reserved-details">Reservation Details</div>
                                <div className="trip-reservation-guest-coming">Who's coming'</div>
                                <div className="trip-reservation-guests">2 guests</div>
                                <div className="trip-reservation-cancel" onClick={() => deletedBooked(bookingId)}>
                                    <i class="fa-solid fa-ban"></i>
                                    <div className="trip-reservation-cancel-reservation">Cancel Reservation</div>
                                </div>
                            </div>



                        </div>

                    </div>

                </div>

            </div>

        </div>
    )





}

export default BookingTrip
