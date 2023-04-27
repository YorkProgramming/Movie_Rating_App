import React, {useState} from "react";
import axios from "axios";
import { useNavigate, navigate, Link } from "react-router-dom";

const Register = (props) => {


    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();

    axios
        .post("http://localhost:8000/api/user/new", {
            firstName,
            lastName,
            email,
            password,
        })
        .then((res) => {
            if(res.data.message){
                setErrorMessage(res.data.message);
            } else {
                props.setUser(res.data.user);
                setFirstName("");
                setLastName("");
                setEmail("");
                setPassword("");
                navigate("/dashboard");
            }
        })
        .catch((err) => {
            console.log(err);
        });

    }

    return (
        <div className="register-container">
            <form className="p-3 border rounded" onSubmit={submitHandler}>
                <h1>Register User</h1>
                <div className="form-fields">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        className="form-control"
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}
                        name="firstName"
                        type="text"
                        required
                    />
                </div>
                <div className="form-fields">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        className="form-control"
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                        name="lastName"
                        type="text"
                        required
                    />
                </div>
                <div className="form-fields">
                    <label htmlFor="email">Email</label>
                    <input
                        className="form-control"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        name="email"
                        type="email"
                        required
                    />
                </div>
                <div className="form-fields">
                    <label htmlFor="password">Password</label>
                    <input
                        className="form-control"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        name="password"
                        type="password"
                        required
                    />
                </div>
                <button className="btn btn-primary submit-btn" type="submit">
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;