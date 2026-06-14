import { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";
import "./Signup.css";

function Signup() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        phoneNumber: "",
        role: 1
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSignup = async (event) => {

        event.preventDefault();

        try {

            await API.post("/auth/signup", formData);

            alert("Signup Successful");

            navigate("/");

        } catch (error) {

            console.log(error);
            alert("Signup Failed");

        }
    };

    return (
        <div className="signup-container">

            <form className="signup-box" onSubmit={handleSignup}>

                <div className="signup-brand">
                    <img src="/logo.png" alt="Logo" />
                    <span>Support Desk</span>
                </div>

                <h1>Create account</h1>

                <p>
                    Join the customer support workspace and start tracking
                    tickets with your team.
                </p>

                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    onChange={handleChange}
                />

                <select
                    name="role"
                    onChange={handleChange}
                >
                    <option value="1">USER</option>
                    <option value="2">MANAGER</option>
                    <option value="3">ADMIN</option>
                </select>

                <button type="submit">
                    Signup
                </button>

                <p className="signup-login-link">
                    Already have an account?{" "}
                    <span onClick={() => navigate("/")}>
                        Login
                    </span>
                </p>

            </form>

        </div>
    );
}

export default Signup;
