import { FC } from 'react';

import { Typography } from '@mui/material';

import { CsvDropzone } from '~/components';
import { auth } from '~/configs';
import { KEYS } from '~/constants';
import { ServiceSchema, serviceSchema } from '~/schemas';
import { servicesService } from '~/services';
import { createHashMap, validateCsvRow } from '~/utils';

const ImportServices: FC = () => {
  return (
    <CsvDropzone<ServiceSchema>
      error={false}
      sampleFileName='Services Sample File'
      // eslint-disable-next-line prettier/prettier
      csvHeaders={['name', 'price', 'description', 'availability']}
      queryKey={KEYS.services}
      uniqueColumns={['name']}
      unflattenObject
      nonStringAssignments={{
        price: parseFloat,
      }}
      //  @ts-ignore
      dynamicAssignments={async (content) => {
        const services = await servicesService.getServices(
          auth?.currentUser?.uid || ''
        );

        //const categories = await categoriesService.getServiceCategories(
        //  auth?.currentUser?.uid || ''
        //);
        //const categoriesMap = createHashMap(categories, 'name');
        const namesMap = createHashMap(services, 'name');

        //console.log('categoriesMap: ');

        // ** This is to replace the modified content above
        const modifiedContent = content.map((row) => ({
          ...row,
          ownerId: auth?.currentUser?.uid,
          storeId: '',
        }));

        console.log(modifiedContent);

        // content validation moved here
        // this is to reduce the number of requests to the server
        const mergedContent = content.map((row, idx) => ({
          ...row,
          ...modifiedContent[idx],
        }));

        mergedContent.forEach((row, index) => {
          validateCsvRow({
            index,
            value: row.name,
            validationFn: (value: any) => !namesMap.has(value),
            errorText: 'Service with name already exists.',
          });
          //validateCsvRow({
          //  index,
          //  value: row.category,
          //  validationFn: (value: any) => categoriesMap.has(value),
          //  errorText: 'Service Category does not exist.',
          //});
        });

        return mergedContent;
      }}
      validationSchema={serviceSchema}
      mutationFn={servicesService.postMany}
    >
      <details>
        <Typography component='summary'>Required fields:</Typography>
        <Typography component='ul'>
          <li>name</li>
          <li>price</li>
          <li>
            availability: &apos;Available&apos; or &apos;Unavailable&apos;
          </li>
        </Typography>
      </details>
    </CsvDropzone>
  );
};

export default ImportServices;
