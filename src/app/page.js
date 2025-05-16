import Link from "next/link";
import Image from "next/image";

const getAllItems = async () => {
    const response = await fetch("http://localhost:3000/api/item/readall", {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        cache: "no-store",
    });
    const jsonData = await response.json();
    const allItems = jsonData.allItems;
    console.log(jsonData);
    return allItems;
}

const ReadAllItems = async() => {
    const allItems = await getAllItems();
    console.log(allItems);
    return (
        <div>
            <h1>Read All Items</h1>
            {allItems.map(item => 
                <Link href="" key={item._id}>
                    <Image src={item.image} width={750} height={500} alt={item.title} priority/>
                    <div>
                        <h2>{item.price}</h2>
                        <h2>{item.title}</h2>
                        <p>{item.description.substring(0,80)}...</p>
                    </div>
                </Link>
            )}
        </div>
    )
}

export default ReadAllItems;