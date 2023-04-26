import Login from './Login';
import Register from './Register';

function LoginRegister({setUser}) {
    return (
    <div className="LoginRegister">
        <div>
            <Login setUser={setUser}/>
        </div>
        <div>
            <Register setUser={setUser}/>
        </div>
    </div>
    );
}

export default LoginRegister;