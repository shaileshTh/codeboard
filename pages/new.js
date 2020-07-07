import { useState, useContext } from 'react'
import { Box } from 'reflexbox'
import Head from 'next/head'

import styled from '@emotion/styled'
import Router from 'next/router'
import { Label, Input, Textarea } from '@rebass/forms'
import axios from 'axios'
import { UserContext } from '../context/UserContext'

const New = () => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('')
    const { user } = useContext(UserContext)

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(!user){
            setError('Please log in first')
            return
        }

        if(!title){
            setError('Please enter a title')
            return
        }

        if(!description){
            setError('Please enter the description')
            return
        }
    
        axios.post('https://strp-backend.herokuapp.com/posts', {
            post_title: title,
            description: description,
          },
          {
            headers:{
                'Authorization': `Bearer ${user.jwt}`
            }
          })
          .then(function (response) {
            console.log(response);
            Router.back();
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    return(
        <Box variant = "formContainer" as = "form" onSubmit = {handleSubmit}>
            <Head>
                <title>Add a new Post</title>
            </Head>
            <h2>Create a Post</h2>
            <br/>
            <Label htmlFor='title'>Title</Label>
                <Input
                    id='title'
                    name='title'
                    type='text'
                    value = {title}
                    onChange = {(event) => setTitle(event.target.value)}
                /><br />
                <Label htmlFor='description'>Description</Label>
                    <Textarea
                        id='description'
                        name='description'
                        type='text'
                        value = {description}
                        onChange = {(event) => setDescription(event.target.value)}
                    />
                    {error && <h2 style = {{color:'red'}}><br/>{error}</h2>}
                <ButtonStyled type = "submit" variant = "submitButton">Post</ButtonStyled>
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

export default New