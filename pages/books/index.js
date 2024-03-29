import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import BeatLoader from 'react-spinners/BeatLoader';

import Categories from '../../components/category/Categories';
import SearchBar from '../../components/booksPage/SearchBar';
import SingleBookCard from '../../components/booksPage/SingleBookCard';
import PointText from '../../components/text/PointText';
import Text from '../../components/text/Text';
import classes from './books.module.scss';

const override = {
  display: 'inline-block',
  margin: '0 auto',
};

let AllBookData;

const getCategories = async () => {
  const response = await fetch('/api/books');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  const storedBooks = data.books;
  AllBookData = storedBooks;
  // console.log("here data\n", AllBookData);

  const categories = storedBooks.reduce((acc, book) => {
    const bookCategories = book.bookCategory.split(', ');
    bookCategories.forEach((category) => {
      const trimmedCategory = category.trim().toLowerCase();
      if (!acc.includes(trimmedCategory)) {
        acc.push(trimmedCategory);
      }
    });
    return acc;
  }, []);

  return categories;
};

const getBooks = async (selectedCategory) => {
  if (selectedCategory.queryKey[1] === undefined) {
    return AllBookData;
  }
  return AllBookData.filter((book) => book.bookCategory
    .toLowerCase()
    .includes(selectedCategory.queryKey[1].toLowerCase()));
};

const getQueriedBook = async (query) => {
  if (query.queryKey[1] === undefined) {
    return AllBookData;
  }
  return AllBookData.filter((book) => book.bookName.toLowerCase().includes(query.queryKey[1].toLowerCase()));
};

function Books() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchText, setSearchText] = useState('');
  const [query, setQuery] = useState('');

  const {
    data: categories,
    isLoading: categoryIsLoading,
    isError: categoryIsError,
    error: categoryError,
  } = useQuery(['catagories'], getCategories);

  const { data: queriedData } = useQuery(
    ['booksByQuery', query],
    getQueriedBook,
    {
      enabled: query !== '',
    },
  );

  const { data: books, isLoading } = useQuery(
    ['booksByCategory', selectedCategory],
    getBooks,
    {
      enabled: query === '',
    },
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchText) {
        setQuery(searchText);
        setSelectedCategory('');
      } else {
        setQuery('');
        if (categories) {
          setSelectedCategory(categories[0].strCategory);
        }
      }
    }, 300);
    return () => {
      setQuery('');
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
      <PointText className={classes.text}>Search Books</PointText>

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
        {!queriedData
          && books
          && books?.map((book) => (
            <SingleBookCard key={book.bookId} book={book} />
          ))}

        {queriedData
          && queriedData?.map((book) => (
            <SingleBookCard key={book.bookId} book={book} />
          ))}

        {queriedData?.length === 0 && <Text>No books found</Text>}

        {books && !queriedData && books?.length === 0 && (
          <Text>No books found</Text>
        )}
      </div>
    </div>
  );
}

export default Books;
