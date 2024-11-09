import React from 'react';
import '../app.css';
import { NavLink } from 'react-router-dom';

function Login() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <section className="box loginBox">
                
                <h3> Login / Register</h3>
                
                <div>
                    <input type="text" id="logintext" name="varText" placeholder="Username" required pattern="[Aa].*" />
                    <br/>
                    <input type="password" id="loginpassword" name="varPassword" placeholder="Password" required pattern="[Aa].*" />
                </div>
                
                <br/>
                <NavLink to="/main"> <button type="submit">Login</button> </NavLink>
                <NavLink to="/main"> <button type="submit">Register</button> </NavLink>

            </section>
        </div>
    );
}
export default Login;