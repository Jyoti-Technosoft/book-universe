import React, { useState } from "react";
import { useRouter } from "next/router";

import Title from "../components/text/Title";
import classes from "./savedBooks.module.scss";

function addBook() {
  const [bookImg, setBookImg] = useState("");
  const [bookName, setBookName] = useState("");
  const [bookCategory, setBookCategory] = useState("");
  const [bookLink, setBookLink] = useState("");
  const [description, setDescription] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [dateOfPublish, setDateOfPublish] = useState("");
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const validateForm = () => {
    let errors = {};

    if (!bookName) {
      errors.bookName = "Book Name is required.";
    }
    if (!bookCategory) {
      errors.bookCategory = "Book Category is required.";
    }
    if (!authorName) {
      errors.authorName = "Book Author Name is required.";
    }
    if (!dateOfPublish) {
      errors.dateOfPublish = "Date Of Publish is required.";
    } else if (isDateInTheFuture(dateOfPublish)) {
      errors.dateOfPublish = "Date Of Publish is invalid.";
    }

    setErrors(errors);
  };

  const isDateInTheFuture = (date) => {
    const currentDate = new Date();
    const selectedDate = new Date(date);
    return selectedDate > currentDate;
  };

  const submitBookData = async () => {
    validateForm();

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
          bookImg,
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
          bookImg: bookImg,
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
        <form>
          <input
            placeholder="Book Image Url"
            className={classes.input}
            value={bookImg}
            onChange={(e) => setBookImg(e.target.value)}
          />

          <input
            placeholder="Book Name*"
            className={classes.input}
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
          />
          {errors.bookName && <p style={styles.error}>{errors.bookName}</p>}
          <input
            placeholder="Book Category*"
            className={classes.input}
            value={bookCategory}
            onChange={(e) => setBookCategory(e.target.value)}
          />
          {errors.bookCategory && (
            <p style={styles.error}>{errors.bookCategory}</p>
          )}
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
            placeholder="Author Name*"
            className={classes.input}
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
          />
          {errors.authorName && <p style={styles.error}>{errors.authorName}</p>}
          <input
            type="date"
            max="2024-02-05"
            placeholder="Date Of Publish*"
            className={classes.input}
            value={dateOfPublish}
            onChange={(e) => setDateOfPublish(e.target.value)}
          />
          {errors.dateOfPublish && (
            <p style={styles.error}>{errors.dateOfPublish}</p>
          )}
          <button
            type="button"
            style={{ marginTop: "4%" }}
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
const styles = {
  error: {
    color: "red",
    fontSize: "14px",
    marginBottom: "6px",
  },
};
export default addBook;
