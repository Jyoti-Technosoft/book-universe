import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import BeatLoader from "react-spinners/BeatLoader";

import Categories from "../../components/category/Categories";
import SearchBar from "../../components/booksPage/SearchBar";
import SingleBookCard from "../../components/booksPage/SingleBookCard";
import PointText from "../../components/text/PointText";
import Text from "../../components/text/Text";
import categories from "../../assets/categories.json";
import classes from "./books.module.scss";

const override = {
  display: "inline-block",
  margin: "0 auto",
};

const getCategories = async () => {
  return categories.data;
};

const getBooks = async () => {
  const storedBooks = JSON.parse(localStorage.getItem("books")) || [];
  return storedBooks;
};

function Books() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchText, setSearchText] = useState("");
  const [query, setQuery] = useState("");

  const {
    data: categories,
    isLoading: categoryIsLoading,
    isError: categoryIsError,
    error: categoryError,
  } = useQuery(["catagories"], getCategories);

  const {
    data: books,
    isLoading,
    isError,
  } = useQuery(["booksByCategory", selectedCategory], getBooks, {
    enabled: query === "",
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchText) {
        setQuery(searchText);
        setSelectedCategory("");
      } else {
        setQuery("");
        if (categories) {
          setSelectedCategory(categories[0].strCategory);
        }
      }
    }, 300);
    return () => {
      setQuery("");
      clearTimeout(timeout);
    };
  }, [searchText, categories]);

  useEffect(() => {
    if (categories) {
      setSelectedCategory(categories[0].strCategory);
    }
  }, [categories]);

  return (
    <div className={classes.books__page}>
      <SearchBar searchText={searchText} setSearchText={setSearchText} />
      <PointText className={classes.text}>search books</PointText>

      <Categories
        setSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
        categories={categories}
        categoryIsLoading={categoryIsLoading}
        categoryIsError={categoryIsError}
        categoryError={categoryError}
        setQuery={setQuery}
      />

      {isLoading || categoryIsLoading ? (
        <div className={classes.loadingSpinner}>
          <BeatLoader
            color="#fff"
            loading={isLoading || categoryIsLoading}
            cssOverride={override}
            size={20}
          />
        </div>
      ) : null}

      <div className={classes.books__container}>
        {!isLoading &&
          !isError &&
          books &&
          books.map((book) => <SingleBookCard key={book.id} book={book} />)}

        {books && books.length === 0 && <Text>No books found</Text>}
      </div>
    </div>
  );
}

export default Books;
