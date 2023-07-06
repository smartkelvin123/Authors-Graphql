import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { gql } from "@apollo/client";

const GET_AUTHORS = gql`
  query GetAuthors {
    authors {
      id
      name
      born
    }
  }
`;

const SET_BIRTH_YEAR = gql`
  mutation SetBirthYear($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born) {
      id
      name
      born
    }
  }
`;

const AuthorView = () => {
  const { loading, error, data } = useQuery(GET_AUTHORS);
  const [name, setName] = useState("");
  const [birthYear, setBirthYear] = useState("");

  const [setBirthYearMutation] = useMutation(SET_BIRTH_YEAR, {
    refetchQueries: [{ query: GET_AUTHORS }],
  });

  const handleSetBirthYear = (event) => {
    event.preventDefault();
    setBirthYearMutation({ variables: { name, born: Number(birthYear) } });
    setName("");
    setBirthYear("");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Number of Books</th>
          </tr>
        </thead>
        <tbody>
          {data.authors.map((author) => (
            <tr key={author.id}>
              <td>{author.name}</td>
              <td>{author.born}</td>
              <td>{author.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Set Birth Year</h2>
      <form onSubmit={handleSetBirthYear}>
        <div>
          <label>
            Author Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Birth Year:
            <input
              type="number"
              value={birthYear}
              onChange={(e) => setBirthYear(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">add author</button>
      </form>
    </div>
  );
};

export default AuthorView;
