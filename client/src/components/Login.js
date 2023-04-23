import React, {useState} from "react";
import axios from "axios";
import { useNavigate, navigate, Link } from "react-router-dom";

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
        <div>
            <form onSubmit={submitHandler}>

            <h1>Log In</h1>
                
            <div className="form-fields">
                        <label>Email</label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            name="email"
                            type="text"
                        />
                    </div>

                    
                <div className="form-fields">
                        <label>Password</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            name="password"
                            type="password"
                        />
                    </div>

                    <input className="submit-input" type="submit" value="Login"/>


            </form>
        </div>
    );
}


    export default Login;
