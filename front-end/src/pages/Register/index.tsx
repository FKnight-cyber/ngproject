import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "./style";

export default function Register() {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    function signUp(event:any) {
        event.preventDefault();

        const body = {
            username,
            password
        };

        const promise = axios.post(`${process.env.REACT_APP_API_BASE_URL}/sign-up`,body);

        promise.then(() => {
            navigate("/");
        });

        promise.catch(Error => {
            alert(Error.response.data)
        });
    };

    return(
        <Container>
            <img src="https://play-lh.googleusercontent.com/-GYbZDAX58SfJ2sd3sdGe5dvH9pVhFb1EbFpMWM3eKqu_nHbM1jQzVdKwv4lE8fXe7it" alt="" />
            <form onSubmit={signUp}>
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
                <button type="submit">Sign Up!</button>
            </form>
            <Link to="/" style={{textDecoration:'none'}}>
                <h2>Already have an account? Sign In!</h2>
            </Link>
        </Container>
    );
};