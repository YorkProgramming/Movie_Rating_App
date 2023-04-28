import React, {useState} from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();

    axios
        .post("http://localhost:8000/api/login_user", {
            email,
            password,
        })
        .then((res) => {
            if(res.data.message){
                setErrorMessage(res.data.message);
            } else {
                props.setUser(res.data.user);
                setEmail("");
                setPassword("");
                navigate("/dashboard");
            }
        })
        .catch((err) => {
            console.log(err);
        });

    }

    return(
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-sm-8 col-md-6 col-lg-4">
                    <form onSubmit={submitHandler} className="p-3 border rounded">
                        <h1 className="text-center mb-4">Log In</h1>

                        <div className="form-group">
                            <label>Email</label>
                            <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            name="email"
                            type="text"
                            className="form-control"
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            name="password"
                            type="password"
                            className="form-control"
                            />
                        </div>

                        <div className="form-group">
                            <button className="btn btn-primary btn-block" type="submit">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;