import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { getCurrentBookingThunk } from "../../store/booking";
import { editBookingThunk } from "../../store/booking";
import { deleteBookingThunk } from "../../store/booking";
import MapContainer from "../Maps";

function BookingTrip() {
    const { spotId } = useParams();
    const { bookingId } = useParams();

    console.log('the spot id', spotId)
    console.log('the booking id', bookingId)

    const spots = useSelector((state) => state.spots);

    console.log('the spots', spots)

    //const spot = spots[spotId];

    const users = useSelector(state => state.users);

    //const spotOwner = users[spot?.ownerId];

    const dispatch = useDispatch();
    const history = useHistory();

    const bookingObj = useSelector(state => state.bookings)

    //const currentBooked = bookingObj[bookingId]


    useEffect(() => {
        dispatch(getCurrentBookingThunk())
    }, [dispatch])


    // const startInt = new Date(currentBooked?.startDate).getDay()


    // const endInt = new Date(currentBooked?.endDate).getDay()

    let dateDiffInt;

    // if (isNaN((new Date(currentBooked?.endDate) - new Date(currentBooked?.startDate)) / 86400000) || ((new Date(currentBooked?.endDate) - new Date(currentBooked?.startDate)) / 86400000) < 0) {
    //   dateDiffInt = 0;
    // } else {
    //   dateDiffInt = (new Date(currentBooked?.endDate) - new Date(currentBooked?.startDate)) / 86400000
    // }

    const weekday = (day) => {
      if (day === 6) return 'Sun'
      if (day === 0) return 'Mon'
      if (day === 1) return 'Tue'
      if (day === 2) return 'Wed'
      if (day === 3) return 'Thu'
      if (day === 4) return 'Fri'
      if (day === 5) return 'Sat'
    }

    const deleteBooked = (bookingId, spotId) => {
        dispatch(deleteBookingThunk(bookingId, spotId)).then(() => dispatch(getCurrentBookingThunk())).then(() => history.push(`/user/bookings`))
    }

    return (
        <div>
            <div>
                <h1>My trips</h1>
                <div>
                    <div>
                        {/* <img src={spot?.previewImage} alt='' /> */}
                    </div>


                    <div>
                        <div>
                            Check-in
                        </div>
                        <div>
                            {/* {`${weekday(startInt)}, ${currentBooked?.startDate}`} */}
                        </div>
                        <div>11:00 AM</div>
                    </div>

                </div>
            </div>






        </div>
    )


}

export default BookingTrip
