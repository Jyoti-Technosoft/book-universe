import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import Image from 'next/image';
import Upload from '../components/upload/Upload';

import Title from '../components/text/Title';
import classes from './addBook.module.scss';
import altBookPng from '../assets/altBook.png';

function AddBook() {
  const [bookId, setBookId] = useState('');
  const [bookImg, setBookImg] = useState('');
  const [bookName, setBookName] = useState('');
  const [bookCategory, setBookCategory] = useState('');
  const [bookLink, setBookLink] = useState('');
  const [description, setDescription] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [dateOfPublish, setDateOfPublish] = useState('');
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const [isAdding, setIsAdding] = useState(false);

  const styles = {
    error: {
      color: '#E85D04',
      fontSize: '14px',
      marginBottom: '6px',
    },
    image: {
      alignSelf: 'center',
      minHeight: '420px',
      maxHeight: '420px',
      maxWidth: '280px',
    },
  };

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch('/api/books');
        if (response.status === 200) {
          const data = await response.json();
          setBookId(data.books.length + 1);
        } else {
          throw new Error('Network response was not ok');
        }
      } catch (error) {
        toast.error(`Error:${error}`);
      }
    }

    fetchBooks();
  }, []);

  const validateForm = () => {
    const errorsData = {};

    if (!bookName) {
      errorsData.bookName = 'Book Name is required.';
    }
    if (!bookCategory) {
      errorsData.bookCategory = 'Book Category is required.';
    }
    if (!authorName) {
      errorsData.authorName = 'Book Author Name is required.';
    }
    if (!dateOfPublish) {
      errorsData.dateOfPublish = 'Date Of Publish is required.';
    }
    setErrors(errorsData);
    return Object.keys(errorsData).length === 0;
  };

  const todayDATE = () => {
    const today = new Date().toISOString().split('T')[0];
    return today;
  };

  const submitBookData = async () => {
    if (!validateForm()) return;

    setIsAdding(true);

    const response = await fetch('/api/addBook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bookId,
        bookName,
        bookCategory,
        bookLink,
        description,
        authorName,
        dateOfPublish,
        bookImg,
      }),
    });

    if (response.ok) {
      toast.success('Book Added successfully!');
    } else {
      toast.error('Something went wrong!');
    }

    setIsAdding(false);
    router.push(`/books/${bookId}`);
  };

  return (
    <div className={classes.pageWrapper}>
      <Title variant="primary" className={classes.pageTitle}>
        Add Book
      </Title>
      <div className={classes.list_container}>
        <div className={classes.formWrapper}>
          <form>
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
              style={{ marginBottom: '4%' }}
            />
            {errors.bookCategory && (
              <p style={styles.error}>{errors.bookCategory}</p>
            )}

            <div className={classes.borderDiv}>
              <label className={classes.lableInput}>
                <span>
                  Add Your Book Cover Page
                  <Upload setBookImg={setBookImg} iP="i" />
                </span>
              </label>
              <br />
              <label className={classes.orLable}>OR</label>
              <br />
              <input
                placeholder="Book's Cover Image Url"
                className={classes.input}
                value={bookImg}
                onChange={(e) => setBookImg(e.target.value)}
                style={{ marginTop: '1%', width: 'fit-content' }}
              />
            </div>

            <div className={classes.borderDiv}>
              <label className={classes.lableInput}>
                <span>
                  Add Your Book!
                  <Upload setBookLink={setBookLink} iP="p" />
                </span>
              </label>
              <br />
              <label className={classes.orLable}>OR</label>
              <br />
              <input
                placeholder="Book's Link"
                className={classes.input}
                value={bookLink}
                onChange={(e) => setBookLink(e.target.value)}
                style={{ marginTop: '1%', width: 'fit-content' }}
              />
            </div>

            <input
              placeholder="Author Name*"
              className={classes.input}
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              style={{ marginTop: '0%' }}
            />
            {errors.authorName && (
              <p style={styles.error}>{errors.authorName}</p>
            )}
            <input
              type="date"
              max={todayDATE()}
              placeholder="Date Of Publish*"
              className={classes.input}
              value={dateOfPublish}
              onChange={(e) => setDateOfPublish(e.target.value)}
            />
            <textarea
              rows={4}
              cols={40}
              placeholder="Description"
              className={classes.textArea}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {errors.dateOfPublish && (
              <p style={styles.error}>{errors.dateOfPublish}</p>
            )}
            <br />
            <button
              type="button"
              style={{ marginTop: '4%' }}
              className={classes.addButton}
              onClick={() => submitBookData()}
              disabled={isAdding}
            >
              {isAdding ? 'Adding....' : 'Add Book'}
            </button>
          </form>
        </div>

        <div className={classes.img} height={400} width={250}>
          <Image
            src={bookImg || altBookPng}
            height={360}
            width={240}
            alt="book"
            style={styles.image}
          />
        </div>
      </div>
    </div>
  );
}

export default AddBook;
