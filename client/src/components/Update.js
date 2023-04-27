import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate, useParams, useNavigate } from "react-router-dom";
import '../App.css';

const Update = (props) => {
    const {id} = useParams()
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [rating, setRating] = useState("");
    const [review, setReview] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect (() => {
        getReviewData(id)
    })

    const getReviewData = (id) => {
        axios
            .post("http://localhost:8000/api/rating/" + id)
            .then((res) => {
                console.log(res.data)
                setRating(res.data)
                setLoaded(true)
            })
            .catch((err) => {
                console.log(err)
                console.log("Validation Error from the back end")
                setErrors(err.response.data.errors)
            })
    }

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
                navigate('/movies')
                setTitle("")
                setGenre("")
                setReview("")
                setRating("")
                navigate("/home")
            })
            .catch((err) => {
                console.log(err)
                console.log("Validation Error from the back end")
                setErrors(err.response.data.errors)
            })
    }

    return (
        <div className='container-fluid'>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <a class="navbar-brand" href="/dashboard">Movie Review App</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="/">Login</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/dashboard">Rate a Movie</a>
                    </li>
                    <li class="nav-item active">
                        <a class="nav-link" href="/movies">Browse</a>
                    </li>
                </ul>
                </div>
            </nav>
            { loaded && (
                <div className="Dashboard">
                    <form onSubmit={onSubmitHandler}>
                        <div>
                            <div>
                                <a href='/' style={{margin:"10px 30px 10px 30px", textDecoration:'none', color: "black"}}>Login</a>
                                <a href='/dashboard' style={{margin:"10px 30px 10px 30px", textDecoration:'none', color: "black"}}>Rate a Movie</a>
                                <a href='/movies' style={{margin:"10px 30px 10px 30px", textDecoration:'none', color: "black"}}>Browse</a>
                            </div>
                
                            <h1>Rate a Movie</h1>
                            <div>
                                <label style={{display: 'inline-block'}}>Title</label><br />
                                <input style= {{}}
                                    type="text" 
                                    onChange={(e) => setTitle(e.target.value)}
                                    value={rating.title}
                                    />
                                {errors.title ? <span style={{margin: '10px',color:"red", fontWeight: 'normal'}}>{errors.title.message}</span> : null}
                            </div>

                            <div>
                                <label style={{display: 'inline-block', marginRight: '10px'}}>Genre</label><br />
                                <input style= {{}}
                                    type="text" 
                                    onChange={(e) => setGenre(e.target.value)}
                                    value={rating.genre}
                                    />
                                {errors.genre ? <span style={{margin: '10px',color:"red", fontWeight: 'normal'}}>{errors.genre.message}</span> : null}
                            </div>

                            <div>
                                <label>Review</label><br />
                                <input
                                    type="text" 
                                    onChange={(e) => setReview(e.target.value)}
                                    value={rating.review}
                                    />
                                {errors.review ? <span style={{margin: '10px',color:"red", fontWeight: 'normal'}}>{errors.review.message}</span> : null}
                            </div>

                            <div>
                                <label>Rating</label><br />
                                <input
                                    type="number" 
                                    onChange={(e) => setRating(e.target.value)}
                                    value={rating.rating}
                                    />
                                {errors.rating ? <span style={{margin: '10px',color:"red", fontWeight: 'normal'}}>{errors.rating.message}</span> : null}
                            </div>
                            <button>Submit</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Update;