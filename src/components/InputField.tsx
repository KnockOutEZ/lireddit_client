import { FormControl, FormLabel, Input, FormErrorMessage } from "@chakra-ui/react"
import {useField} from 'formik'
import { InputHTMLAttributes } from "react"

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    name:string
    placeholder?:string
    label:string
    type?:string
}

export const InputField:React.FC<InputFieldProps>=(props)=>{
    const [field,{error}] = useField(props)
    return(
        <FormControl isInvalid={!!error}>
                <FormLabel htmlFor={field.name}>{props.label}</FormLabel>
                <Input {...field} id={field.name} placeholder={props.placeholder} type={props.type}/>
                {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
        </FormControl>
    )
}