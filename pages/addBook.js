import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { v4 } from 'uuid';
import { getDownloadURL, uploadBytes } from 'firebase/storage';
import { BeatLoader } from 'react-spinners';

import Upload from '../components/upload/Upload';
import { storage } from '../firebase';
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
  const ref = useRef();
  const [isAdding, setIsAdding] = useState(false);
  const [imgRefPreview, setImgRefPreview] = useState('');
  const [eOfImage, setEOfImage] = useState('');
  const [eOfFile, setEOfFile] = useState('');

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

  async function uploadImage() {
    return new Promise((resolve, reject) => {
      const bookImage = ref(storage, `book_Img/${v4()}`);
      uploadBytes(bookImage, eOfImage.target.files[0])
        .then((data) => {
          getDownloadURL(data.ref)
            .then((val) => {
              setBookImg(val);
              resolve(val);
            })
            .catch(reject);
        })
        .catch(reject);
    });
  }

  async function uploadFile() {
    return new Promise((resolve, reject) => {
      const bookFile = ref(
        storage,
        `book_${eOfFile.target.files[0].name.substring(eOfFile.target.files[0].name.lastIndexOf('.') + 1, eOfFile.target.files[0].name.length)}/${v4()}`,
      );
      uploadBytes(bookFile, eOfFile.target.files[0])
        .then((data) => {
          getDownloadURL(data.ref)
            .then((val) => {
              setBookLink(val);
              resolve(val);
            })
            .catch(reject);
        })
        .catch(reject);
    });
  }

  const submitBookData = async () => {
    if (!validateForm()) return;

    setIsAdding(true);

    // instade use of v4() functionwe also use e.target.files[0].name if wee need to store book as same name
    let bLink = null;
    let bImage = null;
    if (eOfImage) {
      bImage = await uploadImage();
    }
    if (eOfFile) {
      bLink = await uploadFile();
    }
    const book = {
      bookId,
      bookName,
      bookCategory,
      bookLink: eOfFile ? bLink : bookLink,
      description,
      authorName,
      dateOfPublish,
      bookImg: eOfImage ? bImage : bookImg,
    };
    fetch('/api/addBook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    }).then((response) => {
      if (response.ok) {
        toast.success('Book Added successfully!');
      } else {
        toast.error('Something went wrong!');
      }

      setIsAdding(false);
      router.push(`/books/${bookId}`);
    });
  };

  return (
    <>
      <div style={{ visibility: isAdding ? 'visible' : 'hidden' }}>
        <BeatLoader
          className={classes.largeBeatLoader}
          size={50}
          color="#fff"
        />
      </div>
      <div
        className={classes.pageWrapper}
        style={{
          filter: isAdding ? 'blur(2px)' : 'none',
          opacity: isAdding ? '0.4' : 'unset',
          pointerEvents: isAdding ? 'none' : 'all',
        }}
      >
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
              {errors.bookName && (
                <span style={styles.error}>{errors.bookName}</span>
              )}
              <input
                placeholder="Book Category*"
                className={classes.input}
                value={bookCategory}
                onChange={(e) => setBookCategory(e.target.value)}
              />
              {errors.bookCategory && (
                <span style={styles.error}>{errors.bookCategory}</span>
              )}

              <div className={classes.borderDiv} style={{ marginTop: '4%' }}>
                <label className={classes.lableInput}>
                  <span>
                    Add Your Book Cover Page
                    <Upload
                      bookImg={bookImg}
                      setEOfImage={setEOfImage}
                      setImgRefPreview={setImgRefPreview}
                      iP="i"
                    />
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
                  style={{
                    marginTop: '1%',
                    width: 'fit-content',
                    textDecorationLine: eOfImage ? 'line-through' : '',
                    color: '#717171',
                    padding: '3rem 12.3rem',
                  }}
                  disabled={eOfImage}
                />
              </div>

              <div className={classes.borderDiv}>
                <label className={classes.lableInput}>
                  <span>
                    Add Your Book!
                    <Upload
                      bookLink={bookLink}
                      setEOfFile={setEOfFile}
                      iP="p"
                    />
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
                  style={{
                    marginTop: '1%',
                    width: 'fit-content',
                    textDecorationLine: eOfFile ? 'line-through' : '',
                    color: '#717171',
                    padding: '3rem 12.3rem',
                  }}
                  disabled={eOfFile}
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
                <span style={styles.error}>{errors.authorName}</span>
              )}
              <input
                ref={ref}
                max={todayDATE()}
                placeholder="Date Of Publish*"
                className={classes.input}
                value={dateOfPublish}
                onChange={(e) => setDateOfPublish(e.target.value)}
                onFocus={() => {
                  ref.current.type = 'date';
                }}
                onBlur={() => {
                  ref.current.type = 'text';
                }}
              />
              {errors.dateOfPublish && (
                <span style={styles.error}>{errors.dateOfPublish}</span>
              )}
              <textarea
                rows={4}
                cols={40}
                placeholder="Description(Max Length:290)"
                className={classes.textArea}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength="290"
              />
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
              src={imgRefPreview || bookImg || altBookPng}
              height={360}
              width={240}
              alt="book"
              style={styles.image}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default AddBook;
