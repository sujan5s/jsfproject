import React, { useState } from "react";


export default function AddProduct() {
  const [plant, setPlant] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });

  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setPlant({ ...plant, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      setMessage("Please upload a plant image!");
      return;
    }

    const formData = new FormData();
    formData.append("name", plant.name);
    formData.append("description", plant.description);
    formData.append("price", plant.price);
    formData.append("stock", plant.stock);
    formData.append("image", image);

    try {
      const response = await fetch("http://localhost:8080/api/plants/add", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to add plant");
      }

      setMessage("Plant added successfully!");
      setPlant({ name: "", description: "", price: "", stock: "" });
      setImage(null);
    } catch (error) {
      setMessage("Error adding plant");
    }
  };

  return (
    <div className="addplant-container">
      <form className="addplant-box" onSubmit={handleSubmit}>
        <h2>Add New Plant 🌿</h2>

        {message && <p className="msg">{message}</p>}

        <input
          type="text"
          name="name"
          placeholder="Plant Name"
          value={plant.name}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={plant.description}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={plant.price}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock Quantity"
          value={plant.stock}
          onChange={handleChange}
          required
        />

        <label className="upload-label">Upload Image</label>
        <input type="file" accept="image/*" onChange={handleImage} required />

        <button type="submit" className="btn">Add Plant</button>
      </form>
    </div>
  );
}