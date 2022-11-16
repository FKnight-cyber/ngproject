import { Container } from "./Register/style";
import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../contexts/userContext";

export default function Login() {

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const userInfo = useContext(UserContext)

    const navigate = useNavigate();

    function signIn(event:any) {
        event.preventDefault();

        const body = {
            username,
            password
        };

        const promise = axios.post(`${process.env.REACT_APP_API_BASE_URL}/sign-in`,body);

        promise.then((res) => {
            localStorage.setItem('authToken', res.data);
            userInfo.setToken(res.data);
            navigate("/initialpage");
        });
        
        promise.catch(Error => {
            alert(Error.response.data)
        })
    };

    return(
        <Container>
            <img src="https://play-lh.googleusercontent.com/-GYbZDAX58SfJ2sd3sdGe5dvH9pVhFb1EbFpMWM3eKqu_nHbM1jQzVdKwv4lE8fXe7it" alt="" />
            <form onSubmit={signIn}>
                <input 
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    required 
                />
                <input 
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                />
                <button type="submit">Sign In!</button>
            </form>
            <Link to="/sign-up" style={{textDecoration:'none'}}>
                <h2>Don't have an account? Sign Up!</h2>
            </Link>
        </Container>
    );
};