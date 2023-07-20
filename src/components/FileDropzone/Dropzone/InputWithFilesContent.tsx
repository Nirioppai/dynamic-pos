import React, { FC, Fragment } from 'react';

import { Plus as PlusIcon } from 'mdi-material-ui';

const InputWithFilesContentWithContext = () => {
  return (
    <Fragment key='InputWithFilesContent'>
      <PlusIcon style={{ marginLeft: -6, marginRight: 6 }} />{' '}
      {'YYYYYYYYYYYYYYYYYYYYYYY'}
    </Fragment>
  );
};

const InputWithFilesContent: FC = () => <InputWithFilesContentWithContext />;

export default InputWithFilesContent;
