import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useQueries } from "@tanstack/react-query";
import { BeatLoader } from "react-spinners";
import PointText from "../components/text/PointText";
import Text from "../components/text/Text";
import Title from "../components/text/Title";
import { getSingleMeal } from "./books/[id]";
import classes from "./savedBooks.module.scss";
import ButtonWithLink from "../components/button/Button";

function addBook() {
  const [bookName, setBookName] = useState("");
  const [bookCategory, setBookCategory] = useState("");
  const [bookLink, setBookLink] = useState("");
  const [description, setDescription] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [dateOfPublish, setDateOfPublish] = useState("");

  //   const queries = savedMealsId.map((id) => (
  //     {
  //       queryKey: ['singleMeal', id],
  //       queryFn: getSingleMeal,
  //     }
  //   ));

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

  //   const result = useQueries({ queries });

  //   useEffect(() => {
  //     if (localStorage.getItem('savedMeals')) {
  //       setSavedMealsId(JSON.parse(localStorage.getItem('savedMeals')));
  //     }
  //   }, []);

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
        {/* {savedMealsId.length <= 0 && <Text>You have no saved meals</Text>}
        {result && result.map(({ data, isLoading }, index) => {
          if (isLoading) {
            return (
              <BeatLoader key={savedMealsId[[index]]} color="#fff" loading={isLoading} size={20} />
            );
          }

          return (
            <Link href={`/books/${data.idMeal}`} key={data.idMeal}>
              <a className={classes.singleMeal}>
                <Title variant="secondary" className={classes.mealTitle}>{data.strMeal}</Title>
                <PointText>
                  Category:
                  {' '}
                  {data.strCategory}
                </PointText>
                <PointText>
                  Area:
                  {' '}
                  {data.strArea}
                </PointText>
              </a>
            </Link>
          );
        })} */}
      </div>
    </div>
  );
}

export default addBook;
