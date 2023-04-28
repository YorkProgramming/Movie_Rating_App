import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
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
    }, [])

    const getReviewData = (id) => {
        axios
            .get("http://localhost:8000/api/movies/" + id)
            .then((res) => {
                console.log(res.data)
                setTitle(res.data.title)
                setGenre(res.data.genre)
                setReview(res.data.review)
                setRating(res.data.rating)
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
            .put("http://localhost:8000/api/movies/edit/" + id, {
                title,
                genre,
                review,
                rating
            })
            .then((res) => {
                console.log(res.data)
                navigate('/movies')
            })
            .catch((err) => {
                console.log(err)
                console.log("Validation Error from the back end")
                setErrors(err.response.data.errors)
            })
    }

    return (
        <div className='container-fluid'>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="/dashboard">Movie Review App</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="/">Login</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/dashboard">Rate a Movie</a>
                    </li>
                    <li className="nav-item active">
                        <a className="nav-link" href="/movies">Browse</a>
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
                                    defaultValue={title}
                                    />
                                {errors.title ? <span style={{margin: '10px',color:"red", fontWeight: 'normal'}}>{errors.title.message}</span> : null}
                            </div>

                            <div>
                                <label style={{display: 'inline-block', marginRight: '10px'}}>Genre</label><br />
                                <input style= {{}}
                                    type="text" 
                                    onChange={(e) => setGenre(e.target.value)}
                                    defaultValue={genre}
                                    />
                                {errors.genre ? <span style={{margin: '10px',color:"red", fontWeight: 'normal'}}>{errors.genre.message}</span> : null}
                            </div>

                            <div>
                                <label>Review</label><br />
                                <input
                                    type="text" 
                                    onChange={(e) => setReview(e.target.value)}
                                    defaultValue={review}
                                    />
                                {errors.review ? <span style={{margin: '10px',color:"red", fontWeight: 'normal'}}>{errors.review.message}</span> : null}
                            </div>

                            <div>
                                <label>Rating</label><br />
                                <input
                                    type="number" 
                                    onChange={(e) => setRating(e.target.value)}
                                    defaultValue={rating}
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