import { FC } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import { Typography } from '@mui/material';
// import { useSnackbar } from 'notistack';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { TextFieldElement } from 'react-hook-form-mui';
// import { useNavigate } from 'react-router-dom';

import { AuthBase, FormContainer } from '~/components';
import { LoginSchema, loginSchema } from '~/schemas';

interface LoginProps {
  userType: {
    label: string;
    value: string;
  };
}

const Login: FC<LoginProps> = ({ userType }) => {
  // const navigate = useNavigate();
  // const { enqueueSnackbar } = useSnackbar();

  const formContext = useForm({
    defaultValues: {
      accountNumber: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = formContext;

  const onSubmit = async (values: LoginSchema) => {
    console.log(values);
    // TODO: LOGIN SERVICE
    // try {
    //   // pag yung current route is pang supervisor tapos yung usertype faculty, throw error
    //   const data = await authService.login({
    //     ...values,
    //     userType: userType.value,
    //   });
    //   localStorage.setItem('accessToken', data.accessToken);
    //   localStorage.setItem('refreshToken', data.refreshToken);
    //   navigate(`/${userType.value}`, { replace: true });
    // } catch (err: any) {
    //   enqueueSnackbar(err?.response?.data?.message || 'Something went wrong.', {
    //     variant: 'error',
    //   });
    // }
  };

  return (
    <AuthBase>
      <Helmet title={`${userType.label} Login`} />
      <Typography sx={{ textAlign: 'center', mb: 4 }}>
        Sign in to start your session!
      </Typography>
      <FormContainer
        formContext={formContext}
        handleSubmit={handleSubmit(onSubmit)}
      >
        <TextFieldElement
          name='accountNumber'
          label='User ID or Webmail'
          required
        />
        <TextFieldElement
          name='password'
          label='Password'
          type='password'
          required
        />

        <LoadingButton type='submit' fullWidth loading={isSubmitting}>
          Sign in
        </LoadingButton>
      </FormContainer>
    </AuthBase>
  );
};

export default Login;
