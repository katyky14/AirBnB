
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";

import { createReviewThunk } from '../../store/review';




function CreateReviewForm() {

    const { spotId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const [review, setReview] = useState("");
    const [stars, setStars] = useState("");
    const [errors, setErrors] = useState([]);

   //const reviewObj = useSelector(state => state.review);
    //console.log('REVIEW obj', reviewObj);

    const userReview = useSelector(state => state.session.user)
    //console.log('the user id', userReview)



    // const reviewArr = Object.values(reviewObj);
    // console.log('the review array', reviewArr)
    //console.log('the map function', reviewArr.map(ele => ele.spotId)) [3]
    // let spotId = reviewArr.map(ele => ele.spotId)[0]
    // console.log('the spotId', spotId)


    const handleSubmit = async (e) => {
        e.preventDefault();

        const reviewInformation = {
            userId: userReview.id,
            spotId,
            review,
            stars
        }

        let createReview = await dispatch(createReviewThunk(reviewInformation))
        console.log('the review info', reviewInformation)
        if (createReview) {
            history.push(`/spots/${spotId}`)
        }
    }


    useEffect(() => {
        const valErrors = [];
        if (!review.length) valErrors.push("Review text is required");
        if(stars > 5 || stars < 1) valErrors.push("Stars must be an integer from 1 to 5")
        setErrors(valErrors)
    }, [review, stars])

    return (
        <div>
            <h1>REVIEWS FORM</h1>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error) =>
                        <li key={error}>{error}</li>
                    )}
                </ul>
                <div>

                    <label>
                        Review
                        <input
                            type="text"
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            // required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Stars
                        <input
                            type="number"
                            value={stars}
                            onChange={(e) => setStars(e.target.value)}
                            />
                    </label>
                </div>
                <button>Submit</button>
            </form>
        </div>
    )

}

export default CreateReviewForm;
