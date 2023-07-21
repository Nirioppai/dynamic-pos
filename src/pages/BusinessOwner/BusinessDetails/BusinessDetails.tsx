import React from 'react';

import { Box, CircularProgress } from '@mui/material';
import { TextFieldElement } from 'react-hook-form-mui';
import { useQueries } from 'react-query';

import {
  FormContainerComponent,
  PageContentWrapper,
  Section,
} from '~/components';
import { auth } from '~/configs';
import { KEYS } from '~/constants';
import { storeSchema } from '~/schemas';
import { usersService } from '~/services';

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

  const onSubmit = (data: any) => {
    console.log(data);
    // here you can process the form data
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
          }}
          schema={storeSchema}
          onFormSubmit={onSubmit}
          enabledEditing={true}
        >
          <TextFieldElement name='ownerName' label='Owner Name' required />
          <TextFieldElement
            name='businessAddress'
            label='Store Address'
            required
          />
        </FormContainerComponent>
      </Section>
    </PageContentWrapper>
  );
}

export default BusinessDetails;
