import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { BeatLoader } from 'react-spinners';
import Image from 'next/image';
import { FaHeartBroken, FaHeart } from 'react-icons/fa';
import toast from 'react-hot-toast';

import Title from '../../components/text/Title';
import PointText from '../../components/text/PointText';
import { Button } from '../../components/button/Button';
import Text from '../../components/text/Text';
import classes from './books.module.scss';
import altBookPng from '../../assets/altBook.png';

export const getSingleBook = async ({ queryKey }) => {
  const response = await fetch('/api/books');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  const { books } = data;
  return books
    .filter((book) => book.bookId === parseInt(queryKey[1], 10))
    .reduce((acc, obj) => obj);
};

function SingleBooks() {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading, isError } = useQuery(['id', id], getSingleBook);
  const [isSaved, setIsSaved] = React.useState(false);

  useEffect(() => {
    if (localStorage.getItem('savedBooks')) {
      const savedIds = JSON.parse(localStorage.getItem('savedBooks'));
      if (savedIds.indexOf(parseInt(id, 10)) >= 0) {
        setIsSaved(true);
      } else {
        setIsSaved(false);
      }
    } else {
      localStorage.setItem('books', JSON.stringify([]));
    }
  }, [id]);

  if (isError) {
    return <div>Error</div>;
  }

  if (isLoading || !data) {
    return (
      <div className={classes.footer}>
        <BeatLoader color="#fff" size={30} />
      </div>
    );
  }

  const handleSaveButtonClick = async () => {
    const savedBooks = JSON.parse(localStorage.getItem('savedBooks'));
    if (!isSaved) {
      savedBooks.push(data.bookId);
      localStorage.setItem('savedBooks', JSON.stringify(savedBooks));
      toast.success('Book saved successfully');
      setIsSaved(true);
    } else {
      savedBooks.splice(savedBooks.indexOf(data.bookId), 1);
      localStorage.setItem('savedBooks', JSON.stringify(savedBooks));
      setIsSaved(false);
      toast.error('Book Removed successfully');
    }
  };

  const { bookCategory } = data;

  function formatDate(date) {
    if (date?.match(/^\d{4}-\d{2}-\d{2}$/)) {
      const [year, month, day] = date.split('-');
      return `${day}-${month}-${year}`;
    }
    return date;
  }

  return (
    <div className={classes.pageWrapper}>
      <div className={classes.topContainer}>
        <div className={classes.img} height={400} width={250}>
          <Image
            src={data.bookImg ? data.bookImg : altBookPng}
            height="350px"
            width="240px"
            alt={altBookPng}
          />
        </div>
        <div className={classes.info}>
          <a
            href={data.bookLink}
            target="_blank"
            rel="noopener noreferrer"
            data-toggle="tooltip"
            data-placement="top"
            title="Click here to go to Book.."
          >
            <Title variant="primary">{data.bookName}</Title>
          </a>
          <PointText className={classes.infoText}>
            Author:
            {' '}
            {data.authorName}
          </PointText>
          <PointText className={classes.infoText}>
            Date Of Publish:
            {' '}
            {formatDate(data.dateOfPublish)}
          </PointText>
          <PointText className={classes.infoText}>
            Description:
            {' '}
            {data.description}
          </PointText>
          <div className={classes.mainDiv}>
            {bookCategory?.split(',').map((text) => (
              <div className={classes.subDiv} key={text}>
                {text}
              </div>
            ))}
          </div>

          {isSaved && (
            <Text className={classes.greenText}>
              You already saved the book.
            </Text>
          )}
          <Button
            variant="primary"
            className={classes.saveButton}
            onClickHandler={handleSaveButtonClick}
          >
            {isSaved ? (
              <>
                <FaHeartBroken />
                {' '}
                Remove
              </>
            ) : (
              <>
                <FaHeart className={classes.saveIcon} />
                {' '}
                save
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SingleBooks;
