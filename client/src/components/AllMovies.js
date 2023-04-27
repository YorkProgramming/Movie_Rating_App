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


    return (
        <div className="container-fluid">
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

            <div className="row justify-content-center">
                <div className="col-lg-8">
                <h1 className="mt-4 mb-4">Movie List</h1>
                <table className="table table-striped table-dark">
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
                            <Link to={`/edit/${movie._id}`} className="btn btn-sm btn-primary mr-2">Edit</Link>
                            <button onClick={() => deleteHandler(movie._id)} className="btn btn-sm btn-danger">Delete</button>
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
