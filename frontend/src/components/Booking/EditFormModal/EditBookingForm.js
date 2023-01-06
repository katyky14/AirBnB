import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom";
import { bookingFormThunk, editBookingThunk, getBookingsSpotIdThunk, getCurrentBookingThunk } from "../../../store/booking";

import '../bookingForm.css'

const EditBookingForm = ({ bookingId, spotId, setShowModal }) => {

    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const todayDate = (new Date()).toISOString().slice(0, 10)

    const dispatch = useDispatch();
    const history = useHistory();

    const [isLoaded, setIsLoaded] = useState(false)

    // console.log('the spotid in component', spotId)
    // console.log('the booking id', bookingId)

    const spots = useSelector(state => state.spot)

    // console.log('the spots', spots)


    const user = useSelector(state => state.session.user);
    // console.log('the user', user)
    const bookingsObj = useSelector(state => state.booking);
    //console.log('the booking obj', bookingsObj)

    const bookingObjId = useSelector(state => state.booking[0]?.id)
    //console.log('booking obj id', bookingObjId)

    const bookingArr = Object.values(bookingsObj);
    //console.log('the booking arr', bookingArr)


    //handle the date differences
    let differenceDate;

    if (isNaN((new Date(endDate) - new Date(startDate)) / 86400000) || ((new Date(startDate) - new Date(endDate)) / 86400000) < 0) {
        differenceDate = 0;
    } else {
        differenceDate = (new Date(endDate) - new Date(startDate)) / 86400000
    }

    const startDateNum = new Date(startDate) - 0;
    const endDateNum = new Date(endDate) - 0;

    const updateStartDate = e => setStartDate(e.target.value)
    const updateEndDate = e => setEndDate(e.target.value)



    const onSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        const bookingInformation = {
            id: +bookingId,
            startDate,
            endDate
        }

        if (spots.ownerId === user.id) {
            let error = [];
            error.push('User cannot book their own spot')
            setValidationErrors(error)
        }

        if (!!startDate && !!endDate) {
            await dispatch(editBookingThunk(bookingId, bookingInformation))
            setShowModal(false)
        }


        // await dispatch(editBookingThunk(bookingId, bookingInformation))

        // if (validationErrors.length === 0 && spots.ownerId !== user.id) {

        //     //dispatch(bookingFormThunk(spotId, bookingInformation)).then((res) => history.push('/user/bookings'))
        //     let editedBooking = await dispatch(editBookingThunk(bookingId, bookingInformation))

        //     if (editedBooking) {
        //         history.push(`/user/bookings`)
        //     }

        // }


    }

    useEffect(() => {
        if (bookingObjId) {
            setStartDate(bookingObjId.startDate);
            setEndDate(bookingObjId.endDate)
        }
    }, [bookingObjId])

    useEffect(() => {
        const errors = [];

        bookingArr.map((booking) => {
            let bookedStartDate = (new Date(booking?.startDate) - 0);
            let bookedEndDate = (new Date(booking?.endDate) - 0);

            if (startDateNum >= endDateNum) {
                errors.push('Checkout cannot be the same as or before checkin')
            }

            if ((startDateNum === bookedStartDate) || (startDateNum === bookedEndDate) || (endDateNum === bookedStartDate) || (endDateNum === bookedEndDate)) {
                errors.push('Chosen dates conflicts with an existing booking')
            }

            if ((startDateNum > bookedStartDate) && (startDateNum < bookedEndDate)) {
                errors.push('Chosen dates conflicts with an existing booking')
            }

            if ((startDateNum < bookedStartDate) && (endDateNum > bookedStartDate) && (endDateNum < bookedEndDate)) {
                errors.push('Choseen dates conflicts with an exisiting booking')
            }

            if ((startDateNum < bookedStartDate) && (endDateNum > bookedEndDate)) {
                errors.push('Chosen dates conflicts with an existing booking')
            }


            return setValidationErrors(errors)

        })

    }, [startDateNum, endDateNum])

    // useEffect(() => {
    //     dispatch(getBookingsSpotIdThunk(spotId))
    // }, [dispatch])

    useEffect(() => {
        dispatch(getCurrentBookingThunk()).then(() => setIsLoaded(true))
    }, [dispatch])

    return (
        <div className="booking-main-container edit-booking-form-container">

            <div className="booking-inner-container">
                <form onSubmit={onSubmit} className='booking-form'>
                    {hasSubmitted && validationErrors.length > 0 && (
                        <ul className="booking-ul-errors">
                            {validationErrors.map(error =>
                                <li key={error} className='booking-li-errors'>{error}</li>)}
                        </ul>
                    )}



                    <div className="booking-main-div">

                        <div className="booking-checkin-inner-div">

                            <div className="booking-checkin-text">
                                CHECK-IN
                            </div>
                            <input
                                className="checkin-input"
                                type="date"
                                onChange={updateStartDate}
                                required
                                min={todayDate}
                                max={"9999-12-31"}
                            />
                        </div>


                        <div className="booking-checkin-inner-div">


                            <div className="booking-checkout-text">
                                CHECKOUT
                            </div>
                            <input
                                className="checkout-input"
                                type="date"
                                onChange={updateEndDate}
                                required
                                min={todayDate}
                                max={"9999-12-31"}
                            />

                        </div>
                    </div>

                    <div>

                    </div>

                    <div className="booking-guest-main-div">
                        <div className="booking-guest-text">GUESTS</div>
                        <div className="booking-guests-inner-div">1 guests</div>
                    </div>


                    <div className="booking-submit-main-div">
                        <input className="submit-booking-inner-div" type='Submit' defaultValue='Reserve' />
                    </div>


                </form>



            </div>
        </div>
    )
}


export default EditBookingForm;
