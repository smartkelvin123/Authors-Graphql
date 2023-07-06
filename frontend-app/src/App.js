import React, { useState } from "react";
import AuthorView from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";

const App = () => {
  const [page, setPage] = useState("authors");

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>Authors</button>
        <button onClick={() => setPage("books")}>Books</button>
        <button onClick={() => setPage("add")}>Add Book</button>
      </div>

      {page === "authors" && <AuthorView />}
      {page === "books" && <Books />}
      {page === "add" && <NewBook />}
    </div>
  );
};

export default App;
