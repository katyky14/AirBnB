
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useHistory, useParams } from "react-router-dom";
import { bookingFormThunk } from "../../store/booking";



const BookingForm = () => {
    const [startDate, setStartDate] = useState('mm/dd/yyyy');
    const [endDate, setEndDate] = useState('mm/dd/yyyy');
    const [validationErrors, setValidationErrors] = useState([]);

    const dispatch = useDispatch();
    const history = useHistory();
    const {spotId} = useParams();


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

    })

    return (
        <div>
            <h1>Book This place</h1>
        </div>
    )
}
