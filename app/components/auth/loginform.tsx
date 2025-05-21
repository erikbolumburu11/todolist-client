import axios from "axios";
import { useState } from "react";

export function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        axios.post('http://localhost:8080/auth/login/', {
            username: username,
            password: password
        }, {
            withCredentials: true
        })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const authStatus = () => {
        axios.get('http://localhost:8080/auth/status/', {
            withCredentials: true
        })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <input name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit">Log-in</button>
            </form>
            <button onClick={authStatus}>Check auth status</button>
        </div>
    );
}
