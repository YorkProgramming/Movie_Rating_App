import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import RatingForm from '../components/RatingForm';
import Header from '../components/Header';

const MovieProfile = (props) => {
    const {id} = useParams();
    const [movie, setMovie] = useState([]);
    const [ratings, setRatings] = useState([]);
    const [user, setUser] = useState({});
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        console.log(id);
        getMovieData(id);
        getMovieRatings(id);
    }, [id, setMovie]);

    const getMovieData = (id) => {
        const options = {
            method: 'GET',
            url: 'https://moviesdatabase.p.rapidapi.com/titles/' + id,
            params: {info: 'base_info'},
            headers: {
                'content-type': 'application/octet-stream',
                'X-RapidAPI-Key': '61ba4331ccmsh5a094dfeff5cc3dp11e673jsn594e2742bd37',
                'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
            }
        };

        axios.request(options)
            .then((res) => {
                console.log(res.data.results);
                setMovie(res.data.results);
                setLoaded(true)
            }).catch(err => console.log(err));
    };

    const getMovieRatings = (id) => {
        axios.get("http://localhost:8000/api/rating/movie/" + id)
            .then((res) => {
                console.log(res.data);
                setRatings(res.data);
            }).catch(err => console.log(err));
    };

    const getUserData = (id) => {
        axios.get("http://localhost:8000/api/user/" + id)
            .then((res) => {
                console.log(res.data);
                setUser(res.data);
            }).catch(err=>console.log(err));

        return (
            <p>{user.firstName} {user.lastName}</p>
        )
    };

    return (
        <>
            <>
            { loaded ? 
                <>
                    <p >{movie.titleText.text}</p>
                    <img src={movie.primaryImage.url} alt="movieposter"/>
                </> : null
            }    
            <RatingForm/>
            {
                ratings.map((rating, i) => {
                    return(
                        <div key={i}>
                            {getUserData(rating.user_id)}
                            <p>{rating.rating}</p>
                            <p>{rating.review}</p>
                        </div>
                    )
                })
            } </> 
        </>
    );
}
export default MovieProfile;