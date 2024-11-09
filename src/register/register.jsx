import React from 'react';
import '../app.css';
import { NavLink } from 'react-router-dom';

function Register() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            
            <section className="box loginBox">

                <h3> Register</h3>

                <div>
                    <input type="text" id="text" name="varText" placeholder="Username" required pattern="[Aa].*" />
                    <br/>
                    <input type="password" id="text" name="varText" placeholder="Password" required pattern="[Aa].*" />
                    <br/>
                    <input type="password" id="text" name="varText" placeholder="Retype Password" required pattern="[Aa].*" />
                    <br/>
                </div>
            
                <br/>
    
                <NavLink to="/main"> <button type="submit">Register</button> </NavLink>
            </section>

        </div>
    );
}
export default Register;