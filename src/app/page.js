"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

/**
 * Fetches a menu item by ID.
 * @param {number} id The ID of the menu item to retrieve.
 */
// async function deleteMenu(id) {
//   const res = await fetch(`http://127.0.0.1:8000/api/menu/${id}/`, {
//     method: "DELETE",
//   });
//   if (!res.ok) {
//     throw new Error("Failed to retrieve menu");
//   }
//   return Promise.resolve();
// }

/**
 * Fetches menu data from the server.
 */

const apiServerHost = process.env.NEXT_PUBLIC_API_SERVER_HOST;  // NEXT_PUBLIC_ 추가 (안하면 env 변수 인식 못함)

async function getData() {
  // const res = await fetch("http://127.0.0.1:8000/api/v2/areas/", {
  const res = await fetch(`${apiServerHost}/api/v2/areas/`, {
  // const res = await fetch("/api/v2/areas/", {
    method: "GET",
    // headers: {
    //   // "Content-Type": "application/json",
    //   "Access-Control-Allow-Origin": "http://127.0.0.1:3000",
    //   "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
    //   "Access-Control-Allow-Methods": "GET"
    // }
  });
  // const res = await fetch("/api/v2/areas/");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

async function getData2() {
  // const res = await fetch("http://127.0.0.1:8000/api/v2/users/me/favorite/", {
  const res = await fetch(`${apiServerHost}/api/v2/users/me/favorite/`, {
  // const res = await fetch("/api/v2/users/me/favorite/", {
    method: "GET",
    // headers: {
    //   "Content-Type": "application/json",
    //   "Access-Control-Allow-Origin": "http://127.0.0.1:3000"
    // },
    credentials: "include"
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
/**
 * Represents a single menu item.
 */
const MenuItem = ({ id, name, price, onEdit, onDelete }) => {
  return (
    <div className="menu-item" data-id={id}>
      <div className="menu-item-info">
        <div className="menu-item-name">{name}</div>
        <div className="menu-item-price">${price.toFixed(2)}</div>
      </div>
      <div className="menu-item-actions">
        <button className="edit-button" onClick={onEdit}>
          Edit
        </button>
        <button
          className="delete-button"
          onClick={() => {
            deleteMenu(id).then(() => onDelete(id));
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

/**
 * The main page component.
 */
export default function Page() {
  const [menuItems, setMenuItems] = useState(null);
  const router = useRouter();
  const params = useSearchParams();

  // State for displaying a success message
  const [displaySuccessMessage, setDisplaySuccessMessage] = useState({
    show: false,
    type: "", // either 'add' or 'update'
  });

  // Fetch menu items on component mount
  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      console.log(data.results)
      // setMenuItems(data);
      const data2 = await getData2();
      console.log(data2.results)
      // setMenuItems(data2);
    };
    // fetchData().catch("dkjflkjkljlkj");  // 이것 때문에 두번 호출되고 있었음
    fetchData().catch(console.error);
  }, [menuItems]);

  // Detect changes in URL parameters for success messages
  useEffect(() => {
    if (!!params.get("action")) {
      setDisplaySuccessMessage({
        type: params.get("action"),
        show: true,
      });
      router.replace("/");
    }
  }, [params, router]);

  // Automatically hide the success message after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (displaySuccessMessage.show) {
        setDisplaySuccessMessage({ show: false, type: "" });
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [displaySuccessMessage.show]);

  // Handle deletion of a menu item
  const handleDelete = (id) => {
    setMenuItems((items) => items.filter((item) => item.id !== id));
  };
  // const data = await getData();

  return (
    <div>
      {menuItems}
      {/* <button className="add-button" onClick={() => router.push("/add")}>
        Add
      </button>
      {displaySuccessMessage.show && (
        <p className="success-message">
          {displaySuccessMessage.type === "add" ? "Added a" : "Modified a"} menu
          item.
        </p>
      )}
      {menuItems ? (
        menuItems.map((item) => (
          <MenuItem
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            onEdit={() => router.push(`/update/${item.id}`)}
            onDelete={handleDelete}
          />
        ))
      ) : (
        <p>Loading...</p>
      )} */}
    </div>
  );
}