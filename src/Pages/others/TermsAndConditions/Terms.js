import React from 'react';
import { Link } from 'react-router-dom';

const Terms = () => {
    return (
        <div>
            <h2>Here is the terms and conditions</h2>
            <>Go back to : <Link to='/register'>Register</Link></>
        </div>
    );
};

export default Terms;