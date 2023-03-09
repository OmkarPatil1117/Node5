import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const Register = (props) => {
    const [credentials, setCredentials] = useState({name: "", email: "", password: "", phone: ""})
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name, email, password, phone} = credentials;
        const response = await fetch("http://localhost:5000/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, password, phone})
        });
        const json = await response.json()
        console.log(json);
        if (json.success){
            navigate("/login");
            props.showAlert("Account Created Successfully", "success");
        }
        else{
            props.showAlert("Invalid credentials", "danger");
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    return (
        <div className='mt-3'>
        <h2>Register to continue</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" name='name' id="name" onChange={onChange} aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" name='email' id="email" onChange={onChange} aria-describedby="emailHelp" />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" name='password' id="password" onChange={onChange} minLength={5} required />
            </div>
            <div className="mb-3">
                <label htmlFor="cpassword" className="form-label">Phone Number</label>
                <input type="number" className="form-control" name='phone' id="phone" onChange={onChange} minLength={10} required />
            </div>
            <button type="submit" className="btn btn-primary">Register</button>
        </form>
        </div>
    );
}

export default Register;