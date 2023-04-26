import React, { useEffect, useState } from 'react'; 
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { 
    Card, 
    CardMedia, 
    CardContent, 
    Grid,
    Typography,
    CardActionArea
} from '@mui/material';

const Content = (props) => {
    const [ratings, setRatings] = useState([])
    const navigate = useNavigate("")
    const [movieLoaded, setMovieLoaded] = useState(false)
    const [userLoaded, setUserLoaded] = useState(false)

useEffect(() => {
    getRatings()
}, [])

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
                setMovieLoaded(true)
                return (
                    movieLoaded ? 
                    <>
                        <img src={res.data.results.primaryImage.url}/>
                        <p>{res.data.results.plot.text}</p>
                    </> : null
                )
            }).catch(err => console.log(err));
    };

    const getUserData = (id) => {
        axios.get("http://localhost:8000/api/user/" + id)
        .then((res) => {
            console.log(res.data);
            setUserLoaded(true)
            return (
                userLoaded ?
                <p>{res.data.firstName} {res.data.lastName}</p> : null
            )
        }).catch(err=>console.log(err));
    }

    const getRatings = () => {
        axios.get("http://localhost:8000/api/ratings")
        .then((res) => {
            console.log(res.data);
            setRatings(res.data);
        }).catch(err => console.log(err));
    }
    
    return (
        <Grid container justifyContent="space-around" sx={{m:.75}} spacing={2}>
        {
            ratings.map((rating, i) => {
                return (
                    <Grid item component={Card} sx={{m:1}} md={3} key={i}>
                        <CardContent style={{alignContent: 'left'}}>
                            <Typography>{rating.review}</Typography>
                            <Typography>{rating.rating}</Typography>
                            {getMovieData(rating.movie_id)} 
                            {getUserData(rating.user_id)}
                        </CardContent>
                    </Grid>
                )
            })
        } 
        </Grid>
    );
}
export default Content;