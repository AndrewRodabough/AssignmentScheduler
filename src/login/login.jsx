import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../app'; // Adjust path as needed

function Login() {
    const { handleLogin, handleRegister } = useContext(AuthContext);
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

    const handleSubmit = (e) => {
        e.preventDefault();

        const buttonClicked = e.submitter.name;

        if (buttonClicked === 'login') {
            handleLogin(credentials); // Send Request and update Auth
        }
        else if (buttonClicked === 'register') {
            handleRegister(credentials);
        }
        // TODO verify credentials
        navigate('/main');
    };

    return (
        
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
                    <button type="submit" name="login">Login</button>
                    <button type="submit"name="register">Register</button>
                </form>
            </section>
        </div>
    );
}

export default Login;
