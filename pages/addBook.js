import React, { useState } from 'react';

import Title from '../components/text/Title';
import { getSingleBook } from './books/[id]';
import classes from './savedBooks.module.scss';

function addBook() {
  const [bookName, setBookName] = useState("");
  const [bookTags, setbookTags] = useState("");

//   const queries = savedBooksId.map((id) => (
//     {
//       queryKey: ['singleBook', id],
//       queryFn: getSingleBook,
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
//     if (localStorage.getItem('savedBooks')) {
//       setSavedMealsId(JSON.parse(localStorage.getItem('savedBooks')));
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
        {/* {savedMealsId.length <= 0 && <Text>You have no saved books</Text>}
        {result && result.map(({ data, isLoading }, index) => {
          if (isLoading) {
            return (
              <BeatLoader key={savedMealsId[[index]]} color="#fff" loading={isLoading} size={20} />
            );
          }

          return (
            <Link href={`/books/${data.idBook}`} key={data.idBook}>
              <a className={classes.singleBook}>
                <Title variant="secondary" className={classes.bookTitle}>{data.strBook}</Title>
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
