import { useState } from "react";

const Sellers = () => {
  const [formData, setFormData] = useState([]);
  const [product, setProduct] = useState({
    productId: "",
    sellingPrice: "",
    productName: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const settingId = Date.now().toString();
    const newFormData = [...formData, product];
    setFormData(newFormData);
    localStorage.setItem(`form-data ${settingId}`, JSON.stringify(newFormData));

    setProduct({
      productId: "",
      sellingPrice: "",
      productName: "",
    });
  };

  const totalSellingPrice = formData.reduce(
    (total, item) => total + parseFloat(item.sellingPrice),
    0
  );

  const Removing = (index) => {
    const updatedFormData = [...formData];
    updatedFormData.splice(index, 1); 
    setFormData(updatedFormData);

    const itemKey = `form-data-${index}`;

    localStorage.removeItem(itemKey);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="all-cases-seller">
          <label>Product ID:</label>
          <input
            type="number"
            placeholder="Enter ID"
            name="productId"
            value={product.productId}
            onChange={handleInputChange}
          />
          <label>Selling Price:</label>
          <input
            type="number"
            placeholder="Enter Price"
            name="sellingPrice"
            value={product.sellingPrice}
            onChange={handleInputChange}
          />
          <label>Product Name:</label>
          <input
            type="text"
            placeholder="Enter Product Name"
            name="productName"
            value={product.productName}
            onChange={handleInputChange}
          />
          <button type="submit">Add Product</button>
        </div>
      </form>
      <div>
        <h2>ALL DETAILED INFORMATION:</h2>
        <ul>
          {formData.map((item, index) => (
            <li key={index}>
              Product ID: {item.productId}, Selling Price: ${item.sellingPrice},
              Product Name: {item.productName}
              <button onClick={() => Removing(index)}>Delete</button>
            </li>
          ))}
        </ul>
        <h3>TOTAL SELLING PRICE: ${totalSellingPrice}</h3>
      </div>
    </div>
  );
};

export default Sellers;
