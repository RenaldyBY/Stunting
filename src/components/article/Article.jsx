// ArticleList.js

import React from "react";

const ArticleList = ({ articles }) => {
  return (
    <div className="container px-3 mx-auto mt-8 md:px-0">
      <ul>
        {articles.map((article, index) => (
          <li key={index} className="mb-4">
            <h2 className="text-xl font-semibold cursor-pointer">
              {article.judul}
            </h2>
            <p className="text-gray-600">{article.konten}</p>
            <hr className="my-2" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticleList;
