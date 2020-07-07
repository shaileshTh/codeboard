import { useState, useContext, useEffect } from 'react'
import Head from 'next/head'

import Router from 'next/router'
import { UserContext } from '../context/UserContext'
import { Box } from 'reflexbox'
import { Label, Input } from '@rebass/forms'
import styled from '@emotion/styled'
import axios from 'axios'


const LogIn = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const {user, setUser}  = useContext(UserContext)
    
    console.log(user)

    useEffect(() => {
        if(user){
            Router.back()
        }
    }, [user])

    const handleSubmit = async (event) => {
        event.preventDefault()

        axios
        .post('https://agile-reef-24551.herokuapp.com/auth/local',{
            identifier: email,
            password,
        })
        .then(response => {
            setUser(response.data)
        })
        .catch(error => 
            {
            // console.log(error.message)
            setError(error.response.data.data[0].messages[0].message)
        })
    }

    return(
        <Box variant = "formContainer" as = "form" onSubmit = {handleSubmit}>
            <Head><title>Login to CodeBoard</title></Head>
            <h2>Log In</h2>
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
                        setError('')
                    }}
                />
                {error && <h2 style = {{color:'red'}}><br/>{error}</h2>}
                <ButtonStyled type = "submit" variant = "submitButton">Login</ButtonStyled>
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
export default LogIn