import Login from './Login';
import Register from './Register';

function LoginRegister({setUser}) {
    return (
    <div className="LoginRegister">
        <Login setUser={setUser}/>
        <Register setUser={setUser}/>
    </div>
    );
}

export default LoginRegister;