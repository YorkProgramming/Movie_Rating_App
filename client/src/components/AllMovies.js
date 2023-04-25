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
            navigate('/mando')
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
        <div style={{}}>
            <a href='/' style={{margin:"10px 30px 10px 30px", textDecoration:'none', color: "white"}}>Home</a>
            <a href='/sell' style={{margin:"10px 30px 10px 30px", textDecoration:'none', color: "white"}}>Sell</a>
            <a href='/mando' style={{margin:"10px 30px 10px 30px", textDecoration:'none', color: "white"}}>Browse</a>


            <h1>Welcome</h1>
            <div >
                <table style={tableStyle}>

                    <tr >
                        <th style={{width:"15%", textAlign:'left', borderRight:"solid black 2px", backgroundColor: '#fff', color:'#000'}}>Movie</th>
                        <th style={{width:"15%", textAlign:'left', borderRight:"solid black 2px", backgroundColor: '#fff', color:'#000'}}>Rating</th>
                        <th  style={{width:"15%", textAlign:'left', backgroundColor: '#fff', color:'#000'}}>Review</th>
                    </tr>

                {

                    list.map((movie) => [
                        <tr>
                            <td style={{width:"15%", borderRight:"solid black 2px", backgroundColor: '#fff', color:'#000'}}>{movie.title}</td>
                            <td style={{width:"15%", borderRight:"solid black 2px", backgroundColor: '#fff', color:'#000'}}>{movie.rating}</td>
                            <td style={{width:"15%", borderRight:"solid black 2px", backgroundColor: '#fff', color:'#000'}}>{movie.review}</td>

                            <td style={{width:"15%", backgroundColor: '#fff', color:'#000'}}>
                                <Link style={{textDecoration: "none", color: '#000'}} to={`/edit/${movie._id}`}>Edit</Link>
                                <button onClick={deleteHandler}>Delete</button>
                            </td>

                        </tr>
                    ])
                }
                </table>
            </div>
            

        </div>
    )
}

export default AllMovies;
