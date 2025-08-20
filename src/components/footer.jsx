/**
 * Footer - Displays a link to the project's GitHub and author information.
 *
 * @returns {React.ReactNode} The footer component.
*/

import React, { useContext } from 'react';

const Footer = () => {
    return (

        <div>
            <a href="https://github.com/AndrewRodabough/startup.git">Github</a>
            <br />
            Author: Andrew Rodabough
        </div>
    );
}

export default Footer;