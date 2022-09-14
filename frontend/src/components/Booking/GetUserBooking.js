import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentBookingThunk } from "../../store/booking";




const GetUserBooking = () => {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false)

    const bookingObj = useSelector(state => state.booking)
    // console.log('the bookobj', bookingObj)
    const bookingArr = Object.values(bookingObj);

    const userBooking = useSelector(state => state.session.user)

    const filter = bookingArr.filter(booking => booking?.userId === userBooking?.id)
    console.log('the filter booki', filter)


    useEffect(() => {
        dispatch(getCurrentBookingThunk()).then(setIsLoaded(true))
    }, [dispatch])





    return  (
        <div>
            <h1>User's booking'</h1>
            {filter.map (booking => (
                <div key={booking.id}>
                    <div>{booking.Spot.address} </div>
                     <img src={booking.Spot?.previewImage} />

                    <h2>Booking Details</h2>
                        <div>{booking.startDate} </div>
                        <div>{booking.endDate}</div>

                </div>

            ))}

        </div>
    )


}

export default GetUserBooking;
