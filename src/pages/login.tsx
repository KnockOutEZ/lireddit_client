import React, { useEffect } from 'react'
import {
  Button,
    FormControl,
    FormLabel,
    Input,
    Stack,
  } from '@chakra-ui/react'

import { Formik, Form } from "formik";
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useMutation } from 'urql';
import { useRouter } from 'next/router';

interface loginProps {}

const LOGIN_MUTATION = 
`
mutation login($username:String!,$password:String!){
  login(options:{username:$username,password:$password}){
    errors{
      field,
      message
    },
    userData{
      user{
        id,
        username,
      }
      token
    }
  }
}
`

const Login: React.FC<loginProps> = ({}) => {
  const router = useRouter();
  const [,login] = useMutation(LOGIN_MUTATION)

  useEffect(() => {
    // redirect to home if already logged in
    if (localStorage.getItem('token')) {
        router.push('/');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

    return (
        <Wrapper variant="small">
          <Formik initialValues={{ username: '',password:'' }}
        onSubmit={async (values) => {
          console.log(values)
            const a = await login(values);
            console.log(a.data.login.userData[0].user)
            console.log(a.data.login.userData[0].token)
            localStorage.setItem('token',a.data.login.userData[0].token)
      
        }}
      >
        {({isSubmitting})=>(
          <Form>
          <InputField name="username" label="User Name" placeholder="John Doe"></InputField>
          <InputField name="password" label="Password" type="password" ></InputField>
          <Button mt={4} type="submit" isLoading={isSubmitting} colorScheme="teal" variant="solid">Login</Button>
          </Form>
        )}
      </Formik>
        </Wrapper>
    )
}

export default Login