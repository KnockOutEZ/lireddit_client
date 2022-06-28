import React from 'react'
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

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
    return (
        <Wrapper variant="small">
          <Formik initialValues={{ username: '',email:'',password:'' }}
        onSubmit={(values) => {
          console.log(values)
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