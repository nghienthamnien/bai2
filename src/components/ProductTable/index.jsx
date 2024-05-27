// src/ProductTable.js
import { useEffect, useState } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import productData from "./data";
import "./index.css";
import Pagination from "../Pagination";

// eslint-disable-next-line react/prop-types
export default function ProductTable({ setIsOpen }) {
  const [products, setProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [inputText, setInputText] = useState("");

  let filteredData;
  if (inputText === "") {
    filteredData = productData;
  } else {
    filteredData = productData.filter((el) =>
      el.name.toLocaleLowerCase().includes(inputText)
    );
  }
  const offset = limit * (currentPage - 1);

  useEffect(() => {
    const currentProduct = filteredData.slice(offset, offset + limit);
    setProduct(currentProduct);
  }, [offset, limit, filteredData]);

  const handleEdit = (id) => {
    console.log(id);
  };
  const handleDelete = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProduct(updatedProducts);
  };
  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleLimit = (e) => {
    const newLimit = parseInt(e.target.value);
    setLimit(newLimit);
  };
  const handeInput = (e) => {
    //convert input text to lower case
    const lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };
  return (
    <>
      <div className="sub-header">
        <div className="search-bar">
          <div className="search-icon">
            <SearchOutlined />
          </div>
          <input
            className="search-bar-input"
            type="text"
            placeholder="Tìm kiếm"
            onChange={handeInput}
          ></input>
        </div>
        <div className="create-btn">
          <button type="primary" onClick={() => setIsOpen(true)}>
            + Tạo mới
          </button>
        </div>
      </div>
      <div className="product-table">
        <table>
          <thead className="table-head">
            <tr className="table-row-header">
              <th className="product-name">TÊN SẢN PHẨM</th>
              <th className="product-price">GIÁ</th>
              <th className="product-quantity">SỐ LƯỢNG</th>
              <th className="product-description">MÔ TẢ</th>
              <th className="product-image">ẢNH</th>
              <th className="product-action">HÀNH ĐỘNG</th>
            </tr>
          </thead>
          <tbody>
            {products.map((element) => (
              <tr key={element.id} className="table-row">
                <td className="product-name">{element.name}</td>
                <td className="product-price">{element.price}</td>
                <td className="product-quantity">{element.quantity}</td>
                <td className="product-description">
                  Lorem ipsum dolor sit amet
                </td>
                <td className="product-image">
                  <img src={element.image} alt={element.name} />
                </td>
                <td className="product-action">
                  <EditOutlined
                    className="action-icon"
                    onClick={() => handleEdit(element.id)}
                  />
                  <DeleteOutlined
                    className="action-icon"
                    onClick={() => handleDelete(element.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="footer">
          <div className="select-number">
            Showing &nbsp;
            <select
              id="number"
              name="number"
              required
              onClick={handleLimit}
              defaultValue={10}
            >
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
            &nbsp; of {filteredData.length}
          </div>
          <Pagination
            length={filteredData.length}
            limit={limit}
            handlePagination={handlePagination}
            currentPage={currentPage}
          />
        </div>
      </div>
    </>
  );
}
