import { child, get, getDatabase, push, ref, set } from "firebase/database";
import React, { useState } from "react";
import { useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form"
function Admin() {
    const [item, setItem] = useState({ url: "", description: "", price: "" })
    const [itemCategory, setItemCategory] = useState("")
    const [category, setCategory] = useState({ url: "", description: "", type: "" })
    const [categoryList, setCategoryList] = useState({});

    const reference = ref(getDatabase(), "categories");
    useEffect(() => {
        get(reference).then(snapshot => {
            if (snapshot.exists())
                setCategoryList(snapshot.val());
        })
    }, [])

    return (
        <div style={{ width: "50%", marginLeft: "25%" }}>
            <h2>Add Item</h2>
            <Form.Label>Photo URL</Form.Label>
            <Form.Control value={item.url} onChange={e => setItem({ ...item, url: e.target.value })} />
            <Form.Label>Description</Form.Label>
            <Form.Control value={item.description} onChange={e => setItem({ ...item, description: e.target.value })} />
            <Form.Label>Price</Form.Label>
            <Form.Control value={item.price} onChange={e => {
                if (!isNaN(e.target.value))
                    setItem({ ...item, price: e.target.value })
            }} />
            <Form.Label>Category</Form.Label>
            <Form.Select onChange={e => setItemCategory(e.target.value)}>
                <option>Please select...</option>
                {Object.keys(categoryList).map(key =>
                    <option>{categoryList[key].type}</option>
                )}
            </Form.Select>
            <Button onClick={() => {
                console.log(itemCategory);
                if (item.price > 0 && item.url.length > 0 && item.description.length > 0 && itemCategory != "Please select...")
                    push(child(reference, itemCategory + "/items"), item).then(() => setItem({ url: "", description: "", price: "" }));
            }}>Add</Button>
            <h2>Add Category</h2>
            <Form.Label>Name</Form.Label>
            <Form.Control value={category.type} onChange={e => setCategory({ ...category, type: e.target.value })} />
            <Form.Label>Photo URL</Form.Label>
            <Form.Control value={category.url} onChange={e => setCategory({ ...category, url: e.target.value })} />
            <Form.Label>Description</Form.Label>
            <Form.Control value={category.description} onChange={e => setCategory({ ...category, description: e.target.value })} />
            <Button onClick={() => {
                if (category.url.length > 0 && category.description.length > 0 && category.type.length > 0)
                    set(child(reference, category.type), category).then(() => setCategory({ url: "", description: "", type: "" }))
            }}>Add</Button>
        </div>
    )
}
export default Admin;