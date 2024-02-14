import React, { useState } from 'react';
import { ref, deleteObject } from 'firebase/storage';
import toast from 'react-hot-toast';
import classes from './deleteBook.module.scss';
import { storage } from '../firebase';

import Title from '../components/text/Title';
import PointText from '../components/text/PointText';

function DeleteBook() {
  const [auth, setAuth] = useState(true);
  const [adminId, setAdminId] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [bookId, setBookId] = useState('');
  const [bookData, setBookData] = useState('');
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/getBook?bookId=${bookId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch book data');
      }
      const data = await response.json();
      setBookData(data);
      setError('');
    } catch (e1) {
      setBookData('');
      setError(e1.message);
    }
  };

  async function validAdminAuth() {
    if (adminId === 'admin_jt_dev' && adminPass === 'books-universe-jt') {
      setAuth(false);
      toast.success('Welcome To Delete Admin..');
    } else {
      setAuth(true);
      setAdminId('');
      setAdminPass('');
      toast.error('Your Are Not Admin..');
      toast.error('Leave This Page..');
    }
  }

  async function DeleteBookData() {
    if (bookData.bookImg.includes('books-universe-jt.appspot.com')) {
      try {
        const deleteImgRef = ref(storage, bookData.bookImg);
        await deleteObject(deleteImgRef);
        toast.success('Image deleted successfully');
      } catch (e2) {
        // console.warn("Image Link:: ", bookData.bookImg);
        toast.error('Failed to delete Image...');
      }
    }
    if (bookData.bookLink.includes('books-universe-jt.appspot.com')) {
      try {
        const deleteLinkRef = ref(storage, bookData.bookLink);
        await deleteObject(deleteLinkRef);
        toast.success('File deleted successfully');
      } catch (e3) {
        // console.warn("File Link:: ", bookData.bookLink);
        toast.error('Failed to delete File...');
      }
    }
  }

  const handleDelete = async () => {
    if (bookData === '') {
      toast.error('you neet get Data First!!');
      return;
    }

    await DeleteBookData();

    try {
      const response = await fetch(`/api/deleteBook?bookId=${bookId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookId }),
      });

      if (response.ok) {
        setBookId('');
        setBookData('');
        toast.success(`Book Deleted:- ${bookId}`);
      } else {
        toast.error('Somthing Went Wrong!!');
      }
    } catch (e4) {
      toast.error('An error occurred');
    }
  };

  return (
    <div className={classes.pageWrapper}>
      <Title variant="primary" className={classes.pageTitle}>
        Delete Book
      </Title>
      <div className={classes.list_container}>
        {auth ? (
          <div className={classes.formWrapper}>
            <form>
              <input
                type="text"
                placeholder="Admin Id"
                className={classes.input}
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
              />
              <br />
              <input
                type="password"
                placeholder="Admin Password"
                className={classes.input}
                value={adminPass}
                onChange={(e) => setAdminPass(e.target.value)}
              />
            </form>
            <br />
            <button
              type="button"
              style={{ marginTop: '7%', marginLeft: '50%' }}
              className={classes.deleteButton}
              onClick={validAdminAuth}
            >
              Authenticate
            </button>
          </div>
        ) : (
          <div className={classes.formWrapper}>
            <form>
              <input
                type="number"
                placeholder="Book id"
                className={classes.input}
                value={bookId}
                onChange={(e) => setBookId(e.target.value)}
              />
              <br />
              <button
                type="button"
                style={{ marginTop: '7%', backgroundColor: '#0a6720' }}
                className={classes.deleteButton}
                onClick={fetchData}
              >
                Get Data
              </button>
              <button
                type="button"
                style={{ marginTop: '7%', backgroundColor: '#670a0a' }}
                className={classes.deleteButton}
                onClick={handleDelete}
              >
                Delete
              </button>
            </form>
            {error && <PointText variant="error">{error}</PointText>}
            {bookData && (
              <div>
                <hr />
                <h2>Book Data:</h2>
                <p>
                  bookId :
                  {bookData.bookId}
                </p>
                <p>
                  bookName :
                  {bookData.bookName}
                </p>
                <p>
                  dateOfPublish:
                  {bookData.dateOfPublish}
                </p>
                <p>
                  authorName:
                  {bookData.authorName}
                </p>
                <p>
                  bookCategory:
                  {bookData.bookCategory}
                </p>
                <p>
                  bookImg :
                  {bookData.bookImg}
                </p>
                <p>
                  bookLink :
                  {bookData.bookLink}
                </p>
                <p>
                  description :
                  {bookData.description}
                </p>
                <hr />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default DeleteBook;
