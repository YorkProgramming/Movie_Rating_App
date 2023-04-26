import React, { useEffect, useState } from 'react'; 
import axios from 'axios'
import { 
    Card, 
    CardActions, 
    CardMedia, 
    CardContent, 
    Grid,
    Typography
} from '@mui/material';

export default function Content(props) {
    const [topRated, setTopRated] = useState("")
    const [displayMovies, setDisplayMovies] = useState([])

    useEffect(() => {
        getTopRated();
        setTopRatedList();
    })

    const getTopRated = () => {
        axios.get("http://localhost/api/rating/mostRatedMovie")
            .then((res) => {
                console.log(res.data)
                const topRatedString = res.data.ToString()
                setTopRated(topRatedString)
            }).catch(err => console.log(err))
    }

    const setTopRatedList = () => {
        const options = {
            method: 'GET',
            url: 'https://moviesdatabase.p.rapidapi.com/titles/x/titles-by-ids',
            params: {
                idsList: topRated,
                info: 'base'
            },
            headers: {
                'content-type': 'application/octet-stream',
                'X-RapidAPI-Key': '61ba4331ccmsh5a094dfeff5cc3dp11e673jsn594e2742bd37',
                'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
            }
        }
        axios.request(options)
            .then((res) => {
                console.log(res.data.results)
                setDisplayMovies(res.data.results)
            }).catch(err => console.log(err))
    }

    return (
        <Grid container justifyContent="space-around" sx={{m:.75}} spacing={2}>
        { 
            displayMovies.map((movie, i) => {
                return (
                    <Grid item component={Card} sx={{m:1}} md={3} key={i}>
                        <CardMedia
                            text={movie.position}
                            component="img"
                            image = {movie.primaryImage.url}
                        />
                        <CardContent style={{alignContent: 'left'}}>
                            <Typography variant="subtitle" style={{color: 'dark gray'}}>{movie.releaseYear.year}</Typography>
                            <Typography variant="subtitle2" ></Typography>
                        </CardContent>
                        <CardActions/>
                    </Grid>
                )
            })
        }
        </Grid>
    );
}