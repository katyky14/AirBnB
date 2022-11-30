
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom";
import { bookingFormThunk } from "../../store/booking";



const BookingForm = () => {
    // const [startDate, setStartDate] = useState('mm/dd/yyyy');
    // const [endDate, setEndDate] = useState('mm/dd/yyyy');
    const [startDate, setStartDate] = useState(false);
    const [endDate, setEndDate] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);

    const todayDate = (new Date()).toISOString().slice(0, 10)

    const dispatch = useDispatch();
    const history = useHistory();
    const {spotId} = useParams();
    // console.log('the id', spotId)

    const spots = useSelector(state => state.spot)
    // console.log('the spots', spots)

    const user = useSelector(state => state.session.user);
    // console.log('the user', user)
    const bookingsObj = useSelector(state => state.booking);
    console.log('the booking obj', bookingsObj)
    const bookingArr = Object.values(bookingsObj);
    console.log('the booking arr', bookingArr)
    //handle the date differences
    let differenceDate;

    if (isNaN((new Date(endDate) - new Date(startDate)) / 86400000) || ((new Date(startDate) - new Date(endDate)) / 86400000 ) < 0) {
        differenceDate = 0;
    } else {
        differenceDate = (new Date(endDate) - new Date(startDate)) / 86400000
    }

    const startDateNum = new Date(startDate) - 0;
    const endDateNum = new Date(endDate) - 0;


    const onSubmit = async (e) => {
        e.preventDefault();

        const bookingInformation = {
            startDate,
            endDate
        }

        let createBooking = await dispatch(bookingFormThunk(bookingInformation))

        if(createBooking) {
            history.push(`/spots/${spotId}`)
        }
    }


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

    })

    useEffect(() => {
        dispatch()
    })

    return (
        <div>
            <h1>Book This place</h1>
        </div>
    )
}


export default BookingForm;
