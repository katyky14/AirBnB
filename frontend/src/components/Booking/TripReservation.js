
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
    console.log('the spots', spots)
    console.log('the spot id', spotId)
    console.log('the booking id', bookingId)
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
                        <img className="trip-reservation-img" src={spot?.previewImage} alt='' />
                    </div>

                    <div className="trip-reservation-info-container">
                        <div className="trip-reservation-checkin-checkout-container">
                            <div className="trip-reservation-check-container">

                                <div className="trip-reservation-checkin-container">

                                    <div className="trip-reservation-checkin">CHECK-IN</div>
                                    <div className="trip-reservation-checkin-date">{`${weekday(startInt)}, ${booked?.startDate}`}</div>
                                    <div className="trip-reservation-checkin-time">3:00PM</div>

                                </div>

                                <div className="trip-reservation-checkout-container">

                                    <div className="trip-reservation-checkout">CHECKOUT</div>
                                    <div className="trip-reservation-checkout-date">{`${weekday(endInt)}, ${booked?.startDate}`}</div>
                                    <div className="trip-reservation-checkout-time">11:00AM</div>

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

                            <div className="trip-reservation-divider"></div>


                            <div className="trip-reservation-direction-container">
                                <div className="trip-reservation-direction">Getting There</div>
                                <div className="trip-reservation-address">Address</div>
                                <div className="trip-reservation-address-info-top">{spot?.address} </div>
                                <div className="trip-reservation-address-info-bottom">{spot?.city}, {spot?.state}</div>
                            </div>

                            <div className="trip-reservation-divider"></div>

                            <div className="trip-reservation-staying-container">
                                <div className="trip-reservation-where-staying">Where you're staying'</div>
                                <div className="trip-reservation-house-rules">House Rules</div>
                                <div className="trip-reservation-house-info">No smoking, no parties allowed. Do not disturb your neighbors. Do not break anything. If there are any issues, please reach out to me directly.</div>


                            </div>


                            <div className="trip-reservation-divider"></div>

                            <div className="trip-reservation-hosted-by-container">
                                <div className="trip-reservation-hosted-by">Hosted by {spotOwner?.firstName}</div>
                                <div className="trip-reservation-host-about">About your host</div>
                                <div className="trip-reservation-host-about-info">I love people who travels. And providing a place for those to feel like they are home</div>
                                <div className="trip-reservation-host-profile">Show Profile</div>

                            </div>


                            <div className="trip-reservation-divider"></div>


                            <div className="trip-confirmed-payment-container">
                                <div className="trip-confirmed-payment">Payment Information</div>
                                <div className="trip-confirmed-payment-details">Payment Details</div>
                                <div className="trip-confirmed-payment-cost">{`Total Cost: $${dateDiffInt * spot?.price} USD`}</div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="trip-reservation-map-container">
                <MapContainer lat={spot?.lat} lng={spot?.lng}/>
            </div>

        </div>
    )
}

export default BookingTrip
