import React from 'react';
import { v4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import toast from 'react-hot-toast';
import { storage } from '../../firebase';
import classes from './Upload.module.scss';

function Upload({ setBookImg, setBookLink, iP }) {
  // instade use of v4() functionwe also use e.target.files[0].name if wee need to store book as same name

  const handlechange = (e) => {
    let bookImg = '';
    let bookPdf = '';
    switch (e.target.files[0].type.split('/')[0]) {
      case 'image':
        bookImg = ref(storage, `book_Img/${v4()}`);
        uploadBytes(bookImg, e.target.files[0]).then((data) => {
          getDownloadURL(data.ref).then((val) => {
            setBookImg(val);
          });
        });
        break;
      case 'application':
      case 'text':
        bookPdf = ref(
          storage,
          `book_${e.target.files[0].name.substring(e.target.files[0].name.lastIndexOf('.') + 1, e.target.files[0].name.length)}/${v4()}`,
        );
        uploadBytes(bookPdf, e.target.files[0]).then((data) => {
          getDownloadURL(data.ref).then((val) => {
            setBookLink(val);
          });
        });
        break;
      default:
        toast.error('This File Format Is Not Valid To Upload!');
    }
  };

  return (
    <div>
      <input
        className={classes.inputFile}
        type="file"
        id="Image"
        onChange={handlechange}
        accept={iP === 'i' ? 'image/*' : 'text/*, application/*'}
      />
    </div>
  );
}

export default Upload;
