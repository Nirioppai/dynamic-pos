import React, { useState } from 'react';

import { Box, CircularProgress, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { useSnackbar } from 'notistack';
import { TextFieldElement } from 'react-hook-form-mui';
import { useQueries } from 'react-query';

import {
  Dropzone,
  FormContainerComponent,
  PageContentWrapper,
  Section,
} from '~/components';
import { auth } from '~/configs';
import { KEYS } from '~/constants';
import { usePostMutation } from '~/hooks';
import { StoreSchema, storeSchema } from '~/schemas';
import { storesService, usersService } from '~/services';

function BusinessDetails() {
  const queries = useQueries([
    {
      queryKey: KEYS.users,
      queryFn: () => usersService.getUser(auth?.currentUser?.uid || ''),
    },
  ]);

  const users = queries[0].data || [];

  const isLoading = queries.some((q) => q.isLoading);

  const currentUserName = users[0]?.name || '';

  const [filesFirst, setFilesFirst] = useState([]);
  const [filesSecond, setFilesSecond] = useState([]);
  const [filesThird, setFilesThird] = useState([]);

  async function storePDF(pdf: any) {
    return new Promise((resolve, reject) => {
      const storage = getStorage();
      const filename = `${Date.now()}-${pdf.name}`;
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

  const { mutateAsync } = usePostMutation({
    queryKey: KEYS.storeInstances,
    mutationFn: storesService.postOne,
  });
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (data: any) => {
    const fields = {
      name: 'Name',
      ownerName: 'Owner Name',
      businessName: 'Name of Business',
      businessAddress: 'Business Address',
      businessTIN: 'Business TIN Number',
      businessNature: 'Nature of Business',
    };

    const documentFields = {
      filesFirst: 'Document DTI Business Name',
      filesSecond: "Document Mayor's Permit",
      filesThird: 'Document BIR Permit',
    };

    const emptyFields = [];

    for (const field in fields) {
      if (!data[field].trim()) {
        // @ts-ignore
        emptyFields.push(fields[field]);
      }
    }

    for (const field in documentFields) {
      if (!eval(field).length) {
        // Evaluates the string `field` to get the array variable
        // @ts-ignore
        emptyFields.push(documentFields[field]);
      }
    }

    if (emptyFields.length) {
      enqueueSnackbar(`${emptyFields.join(', ')} cannot be empty.`, {
        variant: 'error',
      });
      return false;
    }

    const files = [...filesFirst, ...filesSecond, ...filesThird];
    for (const file of files) {
      try {
        const downloadURL = await storePDF(file);
        console.log('PDF uploaded successfully. Download URL is', downloadURL);
      } catch (error) {
        console.error('Failed to upload PDF:', error);
      }
    }

    // Creating a new store with the form data and file URLs
    const store: StoreSchema = {
      ...data,
      documentDTIBusinessName: filesFirst.length
        ? await storePDF(filesFirst[0])
        : '',
      documentMayorsPermit: filesSecond.length
        ? await storePDF(filesSecond[0])
        : '',
      documentBIRPermit: filesThird.length ? await storePDF(filesThird[0]) : '',
    };
    try {
      // Attempt to create the store in the database
      const response = await mutateAsync(store);
      console.log('Store created successfully. Response:', response);
    } catch (error) {
      console.error('Failed to create store:', error);
    }
  };

  // Handle changes in the first dropzone
  const handleChangeStatusFirst = (fileWithMeta: any, status: any) => {
    console.log(fileWithMeta, status);
    if (status === 'done') {
      // @ts-ignore
      setFilesFirst((oldFiles) => [...oldFiles, fileWithMeta.file]);
    }
  };

  // Handle changes in the second dropzone
  const handleChangeStatusSecond = (fileWithMeta: any, status: any) => {
    console.log(fileWithMeta, status);
    if (status === 'done') {
      // @ts-ignore
      setFilesSecond((oldFiles) => [...oldFiles, fileWithMeta.file]);
    }
  };

  // Handle changes in the third dropzone
  const handleChangeStatusThird = (fileWithMeta: any, status: any) => {
    console.log(fileWithMeta, status);
    if (status === 'done') {
      // @ts-ignore
      setFilesThird((oldFiles) => [...oldFiles, fileWithMeta.file]);
    }
  };

  // Render a loading spinner until all data has been fetched
  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <PageContentWrapper title='Business Registration'>
      <Section gutterBottom>
        <FormContainerComponent
          defaultValues={{
            name: currentUserName,
            ownerName: '',
            businessAddress: '',
            businessTIN: '',
            businessName: '',
            businessNature: '',
            ownerId: auth?.currentUser?.uid || '',
            documentDTIBusinessName: '',
            documentMayorsPermit: '',
            documentBIRPermit: '',
            status: false,
            remarks: '',
          }}
          schema={storeSchema}
          onFormSubmit={onSubmit}
          enabledEditing={true}
        >
          <Typography variant='h2' gutterBottom sx={{ mb: '20px' }}>
            Business Details
          </Typography>

          <TextFieldElement name='ownerName' label='Owner Name' required />
          <TextFieldElement
            name='businessName'
            label='Name of Business'
            required
          />
          <TextFieldElement
            name='businessAddress'
            label='Business Address'
            required
          />
          <TextFieldElement
            name='businessTIN'
            label='Business TIN Number'
            required
          />
          <TextFieldElement
            name='businessNature'
            label='Nature of Business'
            required
          />

          <Typography variant='h2' gutterBottom sx={{ mb: '20px' }}>
            Business Documents
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography variant='h4' gutterBottom sx={{ mt: '20px' }}>
                DTI business name registration:
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant='h4' gutterBottom sx={{ mt: '20px' }}>
                Baranggay Permit/Mayor&apos;s permit:
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant='h4' gutterBottom sx={{ mt: '20px' }}>
                BIR Permit:
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Dropzone
                onChangeStatus={handleChangeStatusFirst}
                maxFiles={1} // Limit the file upload to one file at a time
                accept='application/pdf'
              />
            </Grid>
            <Grid item xs={4}>
              <Dropzone
                onChangeStatus={handleChangeStatusSecond}
                maxFiles={1} // Limit the file upload to one file at a time
                accept='application/pdf'
              />
            </Grid>
            <Grid item xs={4}>
              <Dropzone
                onChangeStatus={handleChangeStatusThird}
                maxFiles={1} // Limit the file upload to one file at a time
                accept='application/pdf'
              />
            </Grid>
            <Grid item xs={12}></Grid>
          </Grid>
        </FormContainerComponent>
      </Section>
    </PageContentWrapper>
  );
}

export default BusinessDetails;
