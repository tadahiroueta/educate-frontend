import { useEffect, useState } from "react";
import axios from "axios";

import { BlogPreview, Button } from "../components";

export default function BlogDashboard() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get("/api/get_blogs")
      .then((response) => {
        console.log('API Response:', response.data);
        setArticles(response.data);
      })
      .catch((err) => {
        console.log('Error fetching data:', err);
      });
  }, []);

  return (
    // outside container
    <div className="grow w-full flex justify-center bg-educate-blue-100 px-20 pt-10 pb-44">
      {/* inside container */}
      <div className="flex flex-col items-center gap-8 w-3/4">
        <h1 className="text-3xl font-plain font-medium text-center">The E-ducate Blog ✏️</h1>
        {/* articles */}
        <div className="w-full grid grid-cols-2 gap-3">
          { !articles.length ? null : articles.map((article, index) => <BlogPreview key={ index } thumbnail={ article.thumbnail } title={ article.title } description={ article.description } topic={ article.topic } date={ article.date } />) }
        </div>
      </div>
    </div>
  );
}