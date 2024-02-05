import React, { useState } from "react";
import Title from "../components/text/Title";
import classes from "./savedBooks.module.scss";

function addBook() {
  const [bookName, setBookName] = useState("");
  const [bookCategory, setBookCategory] = useState("");
  const [bookLink, setBookLink] = useState("");
  const [description, setDescription] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [dateOfPublish, setDateOfPublish] = useState("");

  const submitBookData = () => {
    if (typeof window !== "undefined" && window.localStorage) {
      let books = window.localStorage.getItem("books");
      let book = null;
      if (books) {
        books = JSON.parse(books);
        book = {
          id: books.length + 1,
          bookName,
          bookCategory,
          bookLink,
          description,
          authorName,
          dateOfPublish,
        };
        books.push(book);
      } else {
        book = {
          id: 1,
          bookName: bookName,
          bookCategory: bookCategory,
          bookLink: bookLink,
          description: description,
          authorName: authorName,
          dateOfPublish: dateOfPublish,
        };
        books = [book];
      }
      window.localStorage.setItem("books", JSON.stringify(books));
      router.push(`/books/${book.id}`);
    }
  };

  return (
    <div className={classes.pageWrapper}>
      <Title variant="primary" className={classes.pageTitle}>
        Add Book
      </Title>
      <div className={classes.list_container}>
        <form action="/books">
          <input
            placeholder="Book Name"
            className={classes.input}
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
          />
          <input
            placeholder="Book Category"
            className={classes.input}
            value={bookCategory}
            onChange={(e) => setBookCategory(e.target.value)}
          />
          <input
            placeholder="Book Link"
            className={classes.input}
            value={bookLink}
            onChange={(e) => setBookLink(e.target.value)}
          />
          <textarea
            rows={4}
            cols={40}
            placeholder="Description"
            className={classes.textArea}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            placeholder="Author Name"
            className={classes.input}
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
          />
          <input
            type="date"
            placeholder="Date Of Publish"
            className={classes.input}
            value={dateOfPublish}
            onChange={(e) => setDateOfPublish(e.target.value)}
          />
          <button
            className={classes.addButton}
            onClick={() => submitBookData()}
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default addBook;
