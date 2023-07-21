import React from 'react';

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';

import { Dropzone } from '~/components';
import { auth } from '~/configs';

function ImportProductCategories() {
  async function storePDF(pdf: any) {
    return new Promise((resolve, reject) => {
      const storage = getStorage();
      const filename = `${auth.currentUser?.uid || ''}-${pdf.name}`;
      const storageRef = ref(storage, filename);
      const uploadTask = uploadBytesResumable(storageRef, pdf);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL: any) => {
            resolve(downloadURL);
          });
        }
      );
    });
  }

  const handlePdfSubmit = async (files: any) => {
    // this function is called when files are submitted from the dropzone
    // files contain an array of all files submitted
    // you can process these files as needed

    // Here we assume that only one file is being uploaded at a time.
    // If multiple files could be uploaded, you might want to loop over `files` instead.
    const file = files[0].file;

    try {
      const downloadURL = await storePDF(file);
      console.log('PDF uploaded successfully. Download URL is', downloadURL);
    } catch (error) {
      console.error('Failed to upload PDF:', error);
    }
  };

  return (
    <div>
      <Dropzone
        onChangeStatus={(file, status) => console.log(file, status)}
        onSubmit={handlePdfSubmit}
        maxFiles={1} // Limit the file upload to one file at a time
        accept='application/pdf'
      />
    </div>
  );
}

export default ImportProductCategories;
