import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import '../App.css';

const Dashboard = () => {
    const [movie, setMovie] = useState({
        title: '',
        genre: '',
        rating: '',
        review: ''
    })
    const [errors, setErrors] = useState({})
    const [user, setUser] = useState('');
    const navigate = useNavigate()

    const onChangeHandler = (e) => {
    setMovie({
        ...movie,
        [e.target.name]: e.target.value
    })
    }

    useEffect(() => {
        if (user) {
            axios.get(`http://localhost:8000/api/user/${user.id}`)
                .then(res => {
                    console.log(res.data);
                    setUser({ name: res.data.name });
                })
                .catch(err => console.log(err))
        }
    }, [user]);

    const formValidator = () => {
    let isValid = true
    if (movie.title.length < 3) {
        isValid = false
    }
    if (movie.genre.length < 3) {
        isValid = false
    }
    if (movie.rating < 1 || movie.rating > 5) {
        isValid = false
    }
    if (movie.review.length < 10) {
        isValid = false
    }
    return isValid
    }

    const handleSubmit = (e) => {
    e.preventDefault()
    if (formValidator()) {
        axios.post('http://localhost:8000/api/movies/new', movie)
        .then(res => {
            console.log(res)
            navigate('/movies')
        })
        .catch(err => {
            console.log(err)
            setErrors(err.response.data)
        })
    } else {
        setErrors({
        title: 'Title must be at least 3 characters',
        genre: 'Genre must be at least 3 characters',
        rating: 'Rating must be between 1 and 5',
        review: 'Review must be at least 10 characters'
        })
    }
    }

    return (
        <div className="container-fluid">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="/dashboard">
                Movie Review App
                </a>
                <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
                >
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                    <a className="nav-link" href="/">
                        Login
                    </a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="/dashboard">
                        Rate a Movie
                    </a>
                    </li>
                    <li className="nav-item active">
                    <a className="nav-link" href="/movies">
                        Browse
                    </a>
                    </li>
                </ul>
                </div>
                <h1 className="nav-item active">Hello {user.firstName}</h1>
            </nav>
            <div className="Dashboard">
                <form onSubmit={handleSubmit}>
                <div>
                    <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        className="form-control"
                        value={movie.title}
                        onChange={onChangeHandler}
                        required
                    />
                    </div>
                    {errors.title && (
                    <p className="text-danger">{errors.title.message}</p>
                    )}
                </div>
                <div>
                    <div>
                    <label htmlFor="genre">Genre:</label>
                    <input
                        type="text"
                        name="genre"
                        id="genre"
                        className="form-control"
                        value={movie.genre}
                        onChange={onChangeHandler}
                        required
                    />
                    </div>
                    {errors.genre && (
                    <p className="text-danger">{errors.genre.message}</p>
                    )}
                </div>
                <div>
                    <div>
                    <label htmlFor="rating">Rating:</label>
                    <input
                        type="number"
                        name="rating"
                        id="rating"
                        className="form-control"
                        min="1"
                        max="10"
                        value={movie.rating}
                        onChange={onChangeHandler}
                        required
                    />
                    </div>
                    {errors.rating && (
                    <p className="text-danger">{errors.rating.message}</p>
                    )}
                </div>
                <div>
                    <div>
                    <label htmlFor="review">Review:</label>
                    <textarea
                        name="review"
                        id="review"
                        className="form-control"
                        rows="5"
                        value={movie.review}
                        onChange={onChangeHandler}
                        required
                    ></textarea>
                    </div>
                    {errors.review && (
                    <p className="text-danger">{errors.review.message}</p>
                    )}
                </div>
                <div>
                    <button className="btn btn-primary mt-3" type="submit">
                    Submit
                    </button>
                    <Link to="/movies" className="btn btn-primary mt-4 pb-2 pt-2">
                    Back
                    </Link>
                </div>
                </form>
            </div>
        </div>
    );
};

export default Dashboard;
