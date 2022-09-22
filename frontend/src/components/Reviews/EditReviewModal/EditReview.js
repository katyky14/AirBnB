
// import { create } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { editReviewThunk } from "../../../store/review";


import '../../ReviewCss/CreateReview.css'

function EditReview() {

    const { reviewId } = useParams();
    const dispatch = useDispatch();
    //const history = useHistory();


    // const spot = useSelector(state => state.spot)
    // const spotArr = Object.values(spot)
    const reviewObj = useSelector(state => state.review);
    //console.log('the review obj', reviewObj)
    const userReview = useSelector(state => state.session.user)
    const reviewArr = Object.values(reviewObj);

    console.log('the arr', reviewArr)

    const reviewOldState = useSelector(state => state?.review[reviewId]);
    console.log('old', reviewOldState)

    const [review, setReview] = useState("");
    const [stars, setStars] = useState("");
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        //if(errors.length) return alert(`Cannot Submit, Please fill out the required fields`)

        const reviewInformation = {
            userId: userReview.id,
            reviewId,
            review,
            stars
        }

        let updateReview = await dispatch(editReviewThunk(reviewId, reviewInformation))

        // if (u[]) {
        //     history.push(`/spots/${spotId}`)
        // }
    }


    useEffect(() => {
        const valErrors = [];
        if (!review.length) valErrors.push("Review text is required");
        if (stars > 5 || stars < 1) valErrors.push("Stars must be an integer from 1 to 5")

        setErrors(valErrors)
    }, [review, stars])


    const filter = reviewArr.filter(review => review.userId === userReview.id);



    return (
        <div className="main-container-div">
            <h1 className="h1-review-form">Edit Your Review </h1>
            <div className="div-container-rev">

                <form onSubmit={handleSubmit}>
                    {hasSubmitted && errors.length > 0 && (

                        <ul className="ul-rev-form-error">
                            {errors.map((error) =>
                                <li key={error}>* {error}</li>
                            )}
                        </ul>
                    )}
                    <div className="rev-form-style">

                        <label className="label-style-rev">
                            Review
                            <input
                                className="input-style-rev"
                                type="text"
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                            // required
                            />
                        </label>
                        <label className="label-style-rev">
                            Stars
                            <input
                                className="input-style-rev"
                                type="number"
                                value={stars}
                                onChange={(e) => setStars(e.target.value)}
                            />
                        </label>
                        <button className="button-rev">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )

}






export default EditReview;
