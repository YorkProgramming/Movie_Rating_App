import React, {useEffect, useState} from 'react';
import axios from 'axios';
import jwt from 'jwt-decode'
import { useNavigate, useParams, navigate, Link } from "react-router-dom";
import '../App.css';

function Dashboard(props) {
    const {id_movie} = useParams()
    const navigate = useNavigate();
    const userId = jwt(localStorage.getItem('token'))
    const [rating, setRating] = useState("");
    const [review, setReview] = useState("");
    const [errors, setErrors] = useState({});
    const [movie, setMovie] = useState({})
    const options = {
        method: 'GET',
        url: 'https://moviesdatabase.p.rapidapi.com/titles/' + id_movie,
        params: {info: 'base_info'},
        headers: {
          'content-type': 'application/octet-stream',
          'X-RapidAPI-Key': '61ba4331ccmsh5a094dfeff5cc3dp11e673jsn594e2742bd37',
          'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
        }
      };
      

    useEffect(() => {
        getMovie()
    })

    const getMovie = () => {
        axios.request(options)
            .then((res) => {
                console.log(res.data)
                setMovie(res.data.results)
            }).catch(err => console.log(err))
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:8000/api/rating/new", {
                user_id: userId,
                movie_id: movie.id,
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
        //add a section to show the movie being rated

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

export default Dashboard;
