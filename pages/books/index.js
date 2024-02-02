import axios from "axios";
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

const getBooks = async ({ queryKey }) => {
  const { data } = await axios.get(`filter.php?c=${queryKey[1]}`);
  return data?.books || [];
};

const getQueriedBooks = async ({ queryKey }) => {
  const { data } = await axios.get(`search.php?s=${queryKey[1]}`);
  return data?.books || [];
};

const getCategories = async () => {
  // const { data } = await axios.get('/categories.php');
  return categories.data;
};

function Books() {
  // console.log("categories", categories.data)
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
    data: queriedData,
    isLoading: queryIsLoading,
    isError: queryError,
  } = useQuery(["booksByQuery", query], getQueriedBooks, {
    enabled: query !== "",
  });

  const { data, isLoading, isError } = useQuery(
    ["booksByCategory", selectedCategory],
    getBooks,
    {
      enabled: query === "",
    }
  );

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
          data &&
          data.map((book) => <SingleBookCard key={book.idBook} book={book} />)}
        {!queryIsLoading &&
          !queryError &&
          queriedData &&
          queriedData.map((book) => (
            <SingleBookCard key={book.idBook} book={book} />
          ))}
        {data &&
          queriedData &&
          data.length === 0 &&
          queriedData.length === 0 && <Text>No books found</Text>}
      </div>
    </div>
  );
}

export default Books;
