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
import { toErrorMap } from '../Utils/toErrorMap';

interface registerProps {}

const REGISTER_MUTATION = 
`
mutation Register($username:String!,$email:String!,$password:String!){
  register(options:{username:$username,email:$email,password:$password}){
    errors{
      field,
      message
    },
    userData{
      user{
        id,
        username,
        email
      }
      token
    }
  }
}
`

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();

  useEffect(() => {
    // redirect to home if already logged in
    if (localStorage.getItem('token')) {
        router.push('/');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  const [,register] = useMutation(REGISTER_MUTATION)
    return (
        <Wrapper variant="small">
          <Formik initialValues={{ username: '',email:'',password:'' }}
        onSubmit={async (values,{setErrors}) => {
          console.log(values)
            const response = await register(values);
            if(response.data?.register.errors){
              setErrors(toErrorMap(response.data.register.errors))
            }else if(response.data?.register.userData[0].token){
              router.push('/')
            }
            console.log(response.data.register.userData[0].user)
            console.log(response.data.register.userData[0].token)
            localStorage.setItem('token',response.data.register.userData[0].token)
      
        }}
      >
        {({isSubmitting})=>(
          <Form>
          <InputField name="username" label="User Name" placeholder="John Doe"></InputField>
          <InputField name="email" label="Email" placeholder="joh@email.com" type="email"></InputField>
          <InputField name="password" label="Password" type="password" ></InputField>
          <Button mt={4} type="submit" isLoading={isSubmitting} colorScheme="teal" variant="solid">Register</Button>
          </Form>
        )}
      </Formik>
        </Wrapper>
    )
}

export default Register
