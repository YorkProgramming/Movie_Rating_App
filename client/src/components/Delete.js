import React from 'react';
import axios from 'axios';

const Delete = (props) => {
    const { id, successCallback } = props;
    const deleteMovie = e => {
        axios.delete('http://localhost:8000/api/movies/' + id)
            .then((res) => {
                successCallback();
            }).catch(err => console.log(err))
    }
    return (
        <button className="btn btn-sm btn-danger" 
        onClick={deleteMovie}>Delete</button>
    )
}
export default Delete;