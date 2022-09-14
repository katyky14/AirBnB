
import { create } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";

import { createReviewThunk } from '../../store/review';
import '../ReviewCss/CreateReview.css'

function CreateReviewForm() {

    const { spotId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const [review, setReview] = useState("");
    const [stars, setStars] = useState("");
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const spot = useSelector(state => state.spot)
    //console.log('the spot in review', spot)
    const spotArr = Object.values(spot)
    //console.log('the arr in Review', spotArr)



    const reviewObj = useSelector(state => state.review);
    console.log('REVIEW obj', reviewObj);
    const userReview = useSelector(state => state.session.user)
    //console.log('the user id', userReview)


    const reviewArr = Object.values(reviewObj);
    //console.log('the review array', reviewArr)
    //console.log('the map function', reviewArr.map(ele => ele.spotId)) [3]
    // let spotId = reviewArr.map(ele => ele.spotId)[0]
    // console.log('the spotId', spotId)


    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        //if(errors.length) return alert(`Cannot Submit, Please fill out the required fields`)

        const reviewInformation = {
            userId: userReview.id,
            spotId,
            review,
            stars
        }


        //console.log('the spot id', spotId)
        let createReview = await dispatch(createReviewThunk(reviewInformation))
        //console.log('the review info', createReview)

        if (createReview) {
            history.push(`/spots/${spotId}`)
        }
    }


    useEffect(() => {
        const valErrors = [];
        if (!review.length) valErrors.push("Review text is required");
        if (stars > 5 || stars < 1) valErrors.push("Stars must be an integer from 1 to 5")

        setErrors(valErrors)
    }, [review, stars])


    const filter = reviewArr.filter(review => review.userId === userReview.id);

    if (!filter.length) {

        return (
            <div className="main-container-div">
                <h1 className="h1-review-form">Write your Review </h1>
                <div className="div-container-rev">

                    <form onSubmit={handleSubmit}>
                        {hasSubmitted && errors.length > 0 && (

                            <ul className="ul-rev-form-error">
                                {errors.map((error) =>
                                    <li key={error}>{error}</li>
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
                            <label  className="label-style-rev">
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
    return <h1 className="h1-review-form">"User already has a review for this spot"</h1>
}




export default CreateReviewForm;
