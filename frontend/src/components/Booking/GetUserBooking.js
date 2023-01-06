import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentBookingThunk } from "../../store/booking";
import { deleteBookingThunk } from "../../store/booking";
import EditBookingFormModal from "./EditFormModal";

import '../Booking/userBooking.css'



const GetUserBooking = () => {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false)

    const bookingObj = useSelector(state => state.booking)
    //console.log('the bookobj', bookingObj)
    const bookingArr = Object.values(bookingObj);

    // const userBooking = useSelector(state => state.session.user)


    // const filter = bookingArr.filter(booking => booking?.userId === userBooking?.id)


    const todayDate = (new Date()).toISOString().slice(0, 10);

    // to return only current bookings
    const filteredBookings = bookingArr.filter(function (booking) {
        return booking.endDate >= todayDate
    })

    //console.log('the filtered ', filteredBookings)

    useEffect(() => {
        dispatch(getCurrentBookingThunk()).then(() => setIsLoaded(true))
    }, [dispatch])



    if (!isLoaded) return null;


    return (
        <div className="user-bookings">
            <div className="user-booking-main-text">
                <h1>My Bookings</h1>
            </div>
            {/* {filter.map (booking => (
                <div key={booking.id}>
                    <div>{booking.Spot.address} </div>
                     <img src={booking.Spot?.previewImage} />

                    <h2>Booking Details</h2>
                        <div>{booking.startDate} </div>
                        <div>{booking.endDate}</div>

                </div>

            ))} */}



            {Object.values(filteredBookings).map((booking, idx) => (
                <div key={idx} className="user-bookings-card">
                    <div>
                        <div>
                            <img src={booking.Spot?.previewImage} className="user-booking-image" />
                        </div>
                    
                        <div>
                            <div> {booking.Spot?.city}, {booking.Spot?.state}</div>
                            <div>
                                <div>From {booking?.startDate} to {booking?.endDate}</div>
                            </div>
                            <div className="edit-booking-button-container">
                                <EditBookingFormModal bookingId={booking.id} spotId={booking.spotId} />
                                {/* <button onClick={() => dispatch()}> Edit </button> */}
                                <button onClick={() => dispatch(deleteBookingThunk(booking.id))} className="edit-booking-button"> Cancel Booking</button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>

    )


}

export default GetUserBooking;
