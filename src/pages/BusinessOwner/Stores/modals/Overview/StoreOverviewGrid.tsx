import BusinessOwnerStoreModalForm from '../BusinessOwnerStoreModalForm';

import { FormContainerComponent, Section } from '~/components';
import { KEYS } from '~/constants';
import { usePutMutation } from '~/hooks';
import { storeSchema } from '~/schemas';
import { storesService2 } from '~/services';

const StoreOverviewGrid = ({
  defaultValues,
  schema,
  storeId,
}: {
  defaultValues: any;
  schema: typeof storeSchema;
  storeId: string;
}) => {
  const { mutateAsync } = usePutMutation({
    queryKey: KEYS.storeInstances,
    mutationFn: storesService2.putOne,
  });

  const onSubmit = async (values: any) => {
    await mutateAsync({
      id: storeId,
      item: { ...defaultValues, ...values },
    });
  };

  return (
    <div>
      <FormContainerComponent
        defaultValues={defaultValues}
        schema={schema}
        onFormSubmit={onSubmit}
        enabledEditing={defaultValues.status === false ? true : false}
      >
        <Section gutterBottom>
          <BusinessOwnerStoreModalForm />
        </Section>
      </FormContainerComponent>
    </div>
  );
};

export default StoreOverviewGrid;
