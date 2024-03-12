import React, { useState, useEffect } from 'react';
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
  const response = await fetch(`/api/book/${queryKey[1]}`);
  if (!response.ok) {
    throw new Error('Book Not Found!!');
  }
  const book = await response.json();
  return book;
};

function SingleBooks() {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading, isError } = useQuery(['id', id], getSingleBook);
  const [isSaved, setIsSaved] = React.useState(false);
  const [showBookFile, setShowBookFile] = useState(false);

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
      <div className={classes.loadingIcon}>
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
    <>
      <div
        className={classes.pageWrapper}
        style={{
          padding: showBookFile ? '20px' : '',
          paddingTop: showBookFile ? '0px' : '',
          marginTop: showBookFile ? '-30px' : '',
        }}
      >
        <div
          className={classes.topContainer}
          style={{ placeContent: showBookFile ? 'center' : '' }}
        >
          {showBookFile ? null : (
            <div className={classes.img} height={400} width={250}>
              <Image
                src={data.bookImg ? data.bookImg : altBookPng}
                height="350px"
                width="240px"
                alt={altBookPng}
              />
            </div>
          )}

          <div className={classes.info}>
            <span>
              <div
                role="button"
                tabIndex={0}
                target="_blank"
                data-toggle="tooltip"
                data-placement="top"
                title={
                  showBookFile
                    ? 'Click here to go to Book Details..'
                    : 'Click here to go to Book..'
                }
                style={{
                  display: 'inline-block',
                  width: 'fit-content',
                }}
                onClick={() => {
                  setShowBookFile(!showBookFile);
                }}
                onKeyDown={null}
              >
                <Title className={classes.linkTextDecoration} variant="primary">
                  {data.bookName}
                </Title>
              </div>
            </span>
            {showBookFile ? null : (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>
      {showBookFile ? (
        <div className={classes.bookPdfViewr}>
          <iframe
            title="BookFileView"
            className={classes.pdfCointainer}
            src={data.bookLink}
          />
          <br />
          <br />
          <br />
        </div>
      ) : null}
    </>
  );
}

export default SingleBooks;
