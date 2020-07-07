import { useState, useContext, useEffect } from 'react'
import { UserContext } from '../context/UserContext'
import Head from 'next/head'

import Router from 'next/router'
import { Box } from 'reflexbox'
import { Label, Input } from '@rebass/forms'
import styled from '@emotion/styled'
import axios from 'axios'


const SignUp = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const {user, setUser} = useContext(UserContext)
    // console.log(user)

    useEffect(() => {
        if(user){
            Router.back()
        }
    }, [user])

    const handleSubmit = async (event) => {
        event.preventDefault()

        axios
        .post('https://strp-backend.herokuapp.com/auth/local/register',{
            username: email,
            email,
            password,
        })
        .then(response => {
            setUser(response.data)
        })
        .catch(error => 
            {
            setError(error.response.data.message[0].messages[0].message)
        })
    }

    return(
        <Box variant = "formContainer" as = "form" onSubmit = {handleSubmit}>
            <Head><title>SignUp for CodeBoard</title></Head>
            <h2>Sign Up</h2>
            <br/>
            <Label htmlFor='email'>Email</Label>
                <Input
                    id='email'
                    name='email'
                    type='email'
                    value = {email}
                    onChange = {(event) => {
                        setEmail(event.target.value)
                        setError('')
                    }}
                /><br />
                <Label htmlFor='password'>Password</Label>
                <Input
                    id='password'
                    name='password'
                    type='password'
                    value = {password}
                    onChange = {(event) => {
                        setPassword(event.target.value)
                    }}
                />
                    {error && <h2 style = {{color:'red'}}><br/>{error}</h2>}
                <ButtonStyled type = "submit" variant = "submitButton">SignUp</ButtonStyled>
        </Box>
    )
}

const ButtonStyled = styled.button`
    border: 1px solid black;
    height: 30px;
    width: 70px;
    font-weight: bold;
    margin-top: 20px;
`
export default SignUp