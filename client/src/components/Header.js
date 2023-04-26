import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  TextField
} from '@mui/material';
import { useNavigate } from 'react-router-dom'

const Header = (props) => {
  
  const [search, setSearch] = useState("")
  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault();

    const options = {
        method: 'GET',
        url: 'https://moviesdatabase.p.rapidapi.com/titles/search/title/' + search,
        params: {
          exact: 'true',
          titleType: 'movie',
          info: 'base_info',
          limit: '1'
        },
        headers: {
          'content-type': 'application/octet-stream',
          'X-RapidAPI-Key': '61ba4331ccmsh5a094dfeff5cc3dp11e673jsn594e2742bd37',
          'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
        }
      };

    axios.request(options)
      .then((res) => {
        console.log(res.data.results)
        navigate(`/movie-profile/${res.data.results.id}`);
      }).catch(err => console.log(err))
  }

  return (
    <>
      <div>
        <div>
          <h1>Movie Rating Database</h1>
        </div>
        <Box
          component="form"
          onSubmit={submitHandler}
        >
          <TextField
            id="filled-search"
            label="Search"
            type="search"
            variant="filled"
            onChange = {(e) => setSearch(e.target.value)}
          />
        </Box>
      </div>  
    </>
  );
}

export default Header;