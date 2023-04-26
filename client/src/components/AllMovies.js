import { useState, useEffect} from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams} from 'react-router-dom';



const AllMovies = (props) => {

    const [list, setList] = useState([])
    const navigate = useNavigate()
    const{id} = useParams();
    useEffect( () => {
        axios.get('http://localhost:8000/api/movies')
        .then((res) => {
            console.log(res.data)
            setList(res.data)
        }).catch((err) => {
            console.log(err)
        })

    }, [])      //dependency array

    const deleteHandler = () =>{
        axios.delete(`http://localhost:8000/api/movies/${id}`)
        .then((res)=>{
            console.log(res)
            navigate('/movies')
        }).catch((err)=>{
            console.log(err)
        })
    }

const tableStyle = {
    border:'2px solid black',
    width:"50%",
    margin: '5% 25% 5% 25%'
}

    return (
        <div class="container-fluid">
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

            <div class="row justify-content-center">
                <div class="col-lg-8">
                <h1 class="mt-4 mb-4">Movie List</h1>
                <table class="table table-striped table-dark">
                    <thead>
                        <tr>
                            <th style={{textAlign: 'left'}}>Movie</th>
                            <th style={{textAlign: 'left'}}>Rating</th>
                            <th style={{textAlign: 'left'}}>Review</th>
                            <th style={{textAlign: 'left'}}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((movie) => (
                        <tr key={movie._id}>
                            <td>{movie.title}</td>
                            <td>{movie.rating}</td>
                            <td>{movie.review}</td>
                            <td>
                            <Link to={`/edit/${movie._id}`} class="btn btn-sm btn-primary mr-2">Edit</Link>
                            <button onClick={() => deleteHandler(movie._id)} class="btn btn-sm btn-danger">Delete</button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    )
};

export default AllMovies;
