// src/UserTable.js
import { useEffect, useState } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import userData from "./data";
import "./index.css";
import Pagination from "../Pagination";

// eslint-disable-next-line react/prop-types
export default function UserTable({ setIsOpen }) {
  const [users, setUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [inputText, setInputText] = useState("");

  let filteredData;
  if (inputText === "") {
    filteredData = userData;
  } else {
    filteredData = userData.filter((el) =>
      el.name.toLocaleLowerCase().includes(inputText)
    );
  }
  const offset = limit * (currentPage - 1);

  useEffect(() => {
    const currentUser = filteredData.slice(offset, offset + limit);
    setUser(currentUser);
  }, [offset, limit, filteredData]);

  const handleEdit = (id) => {
    console.log(id);
  };
  const handleDelete = (id) => {
    const updatedusers = users.filter((user) => user.id !== id);
    setUser(updatedusers);
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
      <div className="user-table">
        <table>
          <thead className="table-head">
            <tr className="table-row-header">
              <th className="user-avatar">AVATAR</th>
              <th className="user-name">TÊN NGUỜI DÙNG</th>
              <th className="user-email">EMAIL</th>
              <th className="user-date">NGÀY SINH</th>
              <th className="user-phone">SỐ ĐIỆN THOẠI</th>
              <th className="user-action">HÀNH ĐỘNG</th>
            </tr>
          </thead>
          <tbody>
            {users.map((element) => (
              <tr key={element.id} className="table-row">
                <td className="user-avatar">
                  <img src={element.image} alt={element.name} />
                </td>
                <td className="user-name">{element.name}</td>
                <td className="user-email">{element.email}</td>
                <td className="user-date">{element.date}</td>
                <td className="user-phone">{element.phone}</td>
                <td className="user-action">
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
