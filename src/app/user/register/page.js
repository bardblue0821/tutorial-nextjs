"use client";
import { useState } from "react";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/api/user/register", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "name": name,
                    "email": email,
                    "password": password
                })
            });
            const jsonData = await response.json();
            alert(jsonData.message);
        } catch (error) {
            alert("ユーザー登録失敗");
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
                }} type="text" name="name" placeholder="名前" required/>
                <input value={email} onChange={(e) => {
                    setEmail(e.target.value) 
                    console.log(e)
                }} type="text" name="email" placeholder="メール" required/>
                <input value={password} onChange={(e) => {
                    setPassword(e.target.value) 
                    console.log(e)
                }} type="text" name="password" placeholder="パスワード" required/>
                <button> register </button>
            </form>
        </div>
    )
}
export default Register