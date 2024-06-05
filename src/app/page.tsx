"use client";
// app/page.tsx
import axios from "axios";
import { useEffect, useState } from "react";

interface Item {
  id: number;
  name: string;
}

const Home = () => {
  const [data, setData] = useState<Item[]>([]);

  useEffect(() => {
    axios.get("https://localhost:7148/api/items").then((response) => {
      setData(response.data);
    });
  }, []);

  return (
    <div>
      <h1>CMS Client</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
