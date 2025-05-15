"use client";
import { useState } from "react";

const Register = () => {
    const [name, setName] = useState("");
    const handleSubmit = () => {
        try {
            fetch("http://localhost:3000/api/user/register", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: "dummy"
            })
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input value={name} onChange={(e) => {
                    setName(e.target.value) 
                    console.log(e)
                }} type="text" name="name" placeholder="Name" required/>
                <input type="text" placeholder="Username" />
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button> register </button>
            </form>
        </div>
    )
}
export default Register