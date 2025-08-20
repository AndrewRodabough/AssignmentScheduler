import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/userContext.jsx';
import './login.css';

function login() {
    const { handleLogin, handleRegister } = useContext(UserContext);
    const [actionType, setActionType] = useState(null);
    const navigate = useNavigate();
    
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Button Clicked")
        console.log(actionType)

        try {
            if (actionType === 'login') {
                console.log("Login Clicked")
                await handleLogin(credentials); // Send Request and update Auth
            }
            else if (actionType === 'register') {
                console.log("Register Clicked")
                await handleRegister(credentials);
            }

            navigate('/main');
        }
        catch(error) {
            alert(error);
            return
        }
    };

    return (
        
        <section className="login-container">
            <section className="box loginBox">
                <h3>Login / Register</h3>
                
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        name="username"
                        value={credentials.username}
                        onChange={handleChange}
                        placeholder="Username" 
                        required 
                    />
                    <br/>
                    <input 
                        type="password" 
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        placeholder="Password" 
                        required 
                    />
                    <br/>
                    <button type="submit" name="login" onClick={() => setActionType('login')}>Login</button>
                    <button type="submit" name="register" onClick={() => setActionType('register')}>Register</button>
                </form>
            </section>
        </section>
    );
}

export default login;