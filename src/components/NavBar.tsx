import { Box, Flex, useQuery } from "@chakra-ui/react"
import Link from "next/link"
import router from "next/router";
import { useEffect, useState } from "react";
import { useMutation } from "urql";

interface NavBarProps {}

const MY_DATA_MUTATION = 
`
mutation Me($token:String!){
  Me(token:$token)
}
`

export const NavBar:React.FC<NavBarProps>=({})=>{
    const [myName,setMyName] = useState()
    const [,Me] = useMutation(MY_DATA_MUTATION)
    useEffect(() => {
        let token = localStorage.getItem('token')
        // redirect to home if already logged in
        async function tokenChecker(){
            if (localStorage.getItem('token')) {
                const response = await Me({token})
                const parsedData = JSON.parse(response.data.Me)
                setMyName(parsedData.name)
            }
        }

        tokenChecker()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    
    return(
        <Flex>
            <Box>
               {!myName
                ?(<><Link href={{ pathname: '/login', }}>Login</Link><Link href={{ pathname: '/register', }}>Register</Link></>)
                :(<Box>{myName}</Box>)
               }
            </Box>
        </Flex>
    )
}