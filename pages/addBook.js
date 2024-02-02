import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useQueries } from '@tanstack/react-query';
import { BeatLoader } from 'react-spinners';
import PointText from '../components/text/PointText';
import Text from '../components/text/Text';
import Title from '../components/text/Title';
import { getSingleMeal } from './books/[id]';
import classes from './savedBooks.module.scss';

function addBook() {
  const [bookName, setBookName] = useState("");
  const [bookTags, setbookTags] = useState("");

//   const queries = savedMealsId.map((id) => (
//     {
//       queryKey: ['singleMeal', id],
//       queryFn: getSingleMeal,
//     }
//   ));

    const submitBookData = () => {
        debugger
        if (typeof window !== "undefined" && window.localStorage) {
            let books = localStorage.getItem('books');
            if (books) {
                books = JSON.parse(books);
                books.push({bookName, bookTags});
            } else {
                books = [
                    {
                        bookName: bookName, 
                        bookTags: bookTags
                    }
                ];
            }
            localStorage.setItem("books", JSON.stringify(books));
          }
    }

//   const result = useQueries({ queries });

//   useEffect(() => {
//     if (localStorage.getItem('savedMeals')) {
//       setSavedMealsId(JSON.parse(localStorage.getItem('savedMeals')));
//     }
//   }, []);

  return (
    <div className={classes.pageWrapper}>
      <Title variant="primary" className={classes.pageTitle}>Add Book</Title>
      <div className={classes.list_container}>
        <form onSubmit={() => submitBookData()}>
            <input
                className={classes.input}
                value={bookName}
                onChange={(e) => setBookName(e.target.value)}
            />
            <input
                className={classes.input}
                value={bookTags}
                onChange={(e) => setbookTags(e.target.value)}
            />
            <button type='submit'>Add</button>
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
