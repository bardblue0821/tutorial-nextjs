"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const CreateItem = () => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");

    const router = useRouter();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const response = await fetch("http://localhost:3000/api/item/create", {
                method: "POST",
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
                    email: "dummy"
                })
            });
            const jsonData = await response.json();
            alert(jsonData.message);
            router.push("/");
            router.refresh();
        } catch {
            console.log("Error creating item");
        }
    };

    return (
        <div>
            <h1>Create Item</h1>
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
                }  name="details" placeholder="Item Details" required></textarea>
                
                <button type="submit">Create Item</button>
            </form>
        </div>
    )
}
export default CreateItem;