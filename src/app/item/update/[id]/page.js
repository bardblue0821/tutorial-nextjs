"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import React from 'react';

const UpdateItem = (context) => {
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
            const response = await fetch(`http://localhost:3000/api/item/update/${params.id}`, {
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    title: title,
                    price: price,
                    image: image,
                    description: description,
                    email: email
                })
            });
            const jsonData = await response.json();
            alert(jsonData.message);
            router.push("/");
            router.refresh();
        } catch {
            console.log("Error update item");
        }
    };

    return (
        <div>
            <h1>Update Item</h1>
            <form onSubmit={handleSubmit}>
                <input value={title} onChange={
                    (e) => {
                        setTitle(e.target.value);
                    }
                }
                type="text" name="title" placeholder="Item Name" required />
                
                <input value={price} onChange={
                    (e) => {
                        setPrice(e.target.value);
                    }
                } 
                type="text" name="price" placeholder="Item Price" required />
                
                <input value={image} onChange={
                    (e) => {
                        setImage(e.target.value);
                    }
                } type="text" name="image" placeholder="Item Image URL" required />

                <textarea value={description} onChange={
                    (e) => {
                        setDescription(e.target.value);
                    }
                }  name="details" rows={15} placeholder="Item Details" required></textarea>
                
                <button type="submit">Update Item</button>
            </form>
        </div>
    )
}
export default UpdateItem;