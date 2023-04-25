import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate, navigate, Link } from "react-router-dom";
import '../App.css';

function Dashboard(props) {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [rating, setRating] = useState("");
    const [review, setReview] = useState("");
    
    const [errors, setErrors] = useState({});

    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:8000/api/movies/new", {
                title,
                genre,
                review,
                rating
            })
            .then((res) => {
                console.log(res.data)
                navigate('/')
                setTitle("")
                setGenre("")
                setReview("")
                setRating("")

            })
            .catch((err) => {
                console.log(err)
                console.log("Validation Error from the back end")
                setErrors(err.response.data.errors)
            })
    }

    return (
    <   div className="Dashboard">
            <form onSubmit={onSubmitHandler}>
                <div>
                    <h1>Rate a Movie</h1>
                    <div>
                        <label style={{display: 'inline-block'}}>Title</label><br />
                        <input style= {{}}
                            type="text" 
                            onChange={(e) => setTitle(e.target.value)}
                            //value={title}
                            />
                        {errors.title ? <span style={{margin: '10px',color:"red", fontWeight: 'normal'}}>{errors.make.message}</span> : null}
                    </div>

                    <div>
                        <label style={{display: 'inline-block', marginRight: '10px'}}>Genre</label><br />
                        <input style= {{}}
                            type="text" 
                            onChange={(e) => setGenre(e.target.value)}
                            //value={genre}
                            />
                        {errors.genre ? <span style={{margin: '10px',color:"red", fontWeight: 'normal'}}>{errors.modelName.message}</span> : null}
                    </div>

                    <div>
                        <label>Review</label><br />
                        <input
                            type="text" 
                            onChange={(e) => setReview(e.target.value)}
                            //value={review}
                            />
                        {errors.review ? <span style={{margin: '10px',color:"red", fontWeight: 'normal'}}>{errors.year.message}</span> : null}
                    </div>

                    <div>
                        <label>Rating</label><br />
                        <input
                            type="text" 
                            onChange={(e) => setRating(e.target.value)}
                            //value={rating}
                            />
                        {errors.rating ? <span style={{margin: '10px',color:"red", fontWeight: 'normal'}}>{errors.price.message}</span> : null}
                    </div>

                    <button style={{cursor: 'pointer', width: '50px', height: '20px', textAlign: 'center'}}>Submit</button>

                </div>
            </form>

        </div>
    );
}

export default Dashboard;
