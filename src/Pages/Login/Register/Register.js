import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import toast from 'react-hot-toast';

const Register = () => {
    const { createUser, updateUserProfile, verifyEmail } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [accepted, setAccepted] = useState(false);

    const handelSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const photoURL = form.photoURL.value;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(name, photoURL, email, password);

        createUser(email, password)
            .then((result) => {
                const user = result.user;
                console.log(user);
                setError('');
                form.reset();
                handelUpdateUserProfile(name, photoURL);
                handelEmailVerification();
                toast.success('Please verify your email address before login');
            })
            .catch(e => {
                console.error(e);
                setError(e.message);
            })
    }

    const handelChecked = (event) =>{
        setAccepted(event.target.checked);
    }

    const handelUpdateUserProfile = (name, photoURL) =>{
        const profile = {
            displayName : name,
            photoURL: photoURL
        };
        updateUserProfile(profile)
        .then(() => {})
        .catch(e => console.error(e))
    }

    const handelEmailVerification = () =>{
        verifyEmail()
        .then(()=>{})
        .catch(e => console.error(e))
    }

    return (
        <Form onSubmit={handelSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Your Name</Form.Label>
                <Form.Control name="name" type="text" placeholder="Your Name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPhotoURL">
                <Form.Label>PhotoURL</Form.Label>
                <Form.Control name="photoURL" type="text" placeholder="PhotoURL" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control name="email" type="email" placeholder="Enter email" required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" type="password" placeholder="Password" required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check 
                onClick={handelChecked}
                type="checkbox"  
                label={<>Accept <Link to='/terms'>Terms And Conditions</Link></>} />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={!accepted}>
                Register
            </Button>
            
            <Form.Text className="text-danger">
                {error}
            </Form.Text>
        </Form>
    );
};

export default Register;