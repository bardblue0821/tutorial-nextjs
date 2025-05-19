"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import React from 'react';
import Image from 'next/image';

const DeleteItem = (context) => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [email, setEmail] = useState("");

    const router = useRouter();

    // params を unwrap
    const params = React.use(context.params);

    useEffect(() => {
        const getSingleItem = async (id) => {
            const response = await fetch(`http://localhost:3000/api/item/readsingle/${id}`, {
                method: "GET",
                cache: "no-store",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                cache: "no-store",
            });
            const jsonData = await response.json();
            const singleItem = jsonData.singleItem;
            setTitle(singleItem.title);
            setPrice(singleItem.price);
            setImage(singleItem.image);
            setDescription(singleItem.description);
            setEmail(singleItem.email);
        }        
        getSingleItem(params.id);
    }, [params]);

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const response = await fetch(`http://localhost:3000/api/item/delete/${params.id}`, {
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    email: email
                })
            });
            const jsonData = await response.json();
            alert(jsonData.message);
            router.push("/");
            router.refresh();
        } catch {
            console.log("Error delete item");
        }
    };

    return (
        <div>
            <h1>Delete Item</h1>
            <form onSubmit={handleSubmit}>
                <h2>{title}</h2>
                <Image src={image} width={750} height={500} alt="item-image" priority />
                <h3>{price}</h3>
                <p>{description}</p>
                <button type="submit">Delete Item</button>
            </form>
        </div>
    )
}
export default DeleteItem;