import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const ADD_BOOK = gql`
  mutation AddBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    add

    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author
    }
  }
`;

const NewBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState(0);
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [addBook, { loading, error }] = useMutation(ADD_BOOK);

  const handleSubmit = (e) => {
    e.preventDefault();

    addBook({ variables: { title, author, published, genres } })
      .then((response) => {
        console.log("Book added:", response.data.addBook);
        setTitle("");
        setAuthor("");
        setPublished(0);
        setGenres([]);
        setGenre("");
      })
      .catch((error) => {
        console.error("Error adding book:", error);
      });
  };

  const addGenre = () => {
    if (genre.trim()) {
      setGenres([...genres, genre.trim()]);
      setGenre("");
    }
  };

  return (
    <div>
      <h2>Add New Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Author:</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Published:</label>
          <input
            type="number"
            value={published}
            onChange={(e) => setPublished(parseInt(e.target.value))}
            required
          />
        </div>
        <div>
          <label>Genre:</label>
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
          <button type="button" onClick={addGenre}>
            Add Genre
          </button>
        </div>
        <div>
          <label>Genres:</label>
          <ul>
            {genres.map((g, index) => (
              <li key={index}>{g}</li>
            ))}
          </ul>
        </div>
        <button type="submit">Add Book</button>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
      </form>
    </div>
  );
};

export default NewBook;
