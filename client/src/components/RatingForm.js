import React, { useState } from 'react'
import axios from 'axios'
import jwt from 'jwt-decode'
import { useNavigate } from 'react-router-dom'


const RatingForm = (props) => {
    const {id} = props;
    const user_id = jwt(localStorage.getItem('token'))
    const [rating, setRating] = useState("");
    const [review, setReview] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate()

    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:8000/api/rating/new", {
                user_id: user_id,
                movie_id: id,
                review,
                rating
            })
            .then((res) => {
                console.log(res.data)
                navigate('/')
            })
            .catch((err) => {
                console.log(err)
                console.log("Validation Error from the back end")
                setErrors(err.response.data.errors)
            })
    }

    return (
        <div className="Dashboard">
            <form onSubmit={onSubmitHandler}>
                <div>
                    <h1>Rate a Movie</h1>
                    <div>
                        <label>Review</label><br />
                        <input
                            type="text" 
                            onChange={(e) => setReview(e.target.value)}
                            //value={review}
                            />
                        {errors.review ? <span style={{margin: '10px',color:"red", fontWeight: 'normal'}}>{errors.review.message}</span> : null}
                    </div>
                    <div>
                        <label>Rating</label><br />
                        <input
                            type="number" 
                            onChange={(e) => setRating(e.target.value)}
                            //value={rating}
                            />
                        {errors.rating ? <span style={{margin: '10px',color:"red", fontWeight: 'normal'}}>{errors.rating.message}</span> : null}
                    </div>
                    <button style={{cursor: 'pointer', width: '50px', height: '20px', textAlign: 'center'}}>Submit</button>
                </div>
            </form>
        </div>
    );
}
export default RatingForm;