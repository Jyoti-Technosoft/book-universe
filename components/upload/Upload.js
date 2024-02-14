import React from 'react';
import toast from 'react-hot-toast';
import classes from './Upload.module.scss';

function Upload({
  iP,
  bookImg,
  bookLink,
  setImgRefPreview,
  setEOfImage,
  setEOfFile,
}) {
  const handlechange = (e) => {
    switch (e.target.files[0]?.type.split('/')[0]) {
      case 'image':
        setImgRefPreview(URL.createObjectURL(e.target.files[0]));
        setEOfImage(e);
        break;
      case 'application':
      case 'text':
      case '':
        // console.log(e.target.files[0]);
        setEOfFile(e);
        break;
      default:
        if (e.target.accept === 'image/*') {
          setImgRefPreview('');
          setEOfImage('');
        } else {
          setEOfFile('');
        }
        toast.error('This File Format Is Not Valid To Upload!');
    }
  };

  return (
    <div>
      <input
        className={classes.inputFile}
        type="file"
        onChange={handlechange}
        accept={iP === 'i' ? 'image/*' : 'text/*, application/*'}
        disabled={iP === 'i' ? bookImg : bookLink}
      />
    </div>
  );
}

export default Upload;
