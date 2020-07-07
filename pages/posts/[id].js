import fetch from 'isomorphic-unfetch'
import { useContext, useState } from 'react'
import Head from 'next/head'

import Router from 'next/router'
import axios from 'axios'
import styled from '@emotion/styled';
import { Box } from 'reflexbox'
import SingleCard from '../../components/SingleCard'
import { UserContext } from "../../context/UserContext";

const Post = ({post}) => { 
    const  { user, setUser } = useContext(UserContext);
    const [error, setError] = useState('')
    
    const handleDelete = async () => {

        axios.delete(`https://strp-backend.herokuapp.com/posts/${post.id}`, {
            headers:{
                'Authorization': `Bearer ${user.jwt}`
            }
        }).then(response => {
            setError('Post deleted. You might need to refresh the page')
            Router.back()
        }).catch(error => {
            setError('This is not your post')
        })
    }

    return (
        <Box variant = "container">
            <Head>
                <title>{post.post_title}</title>
            </Head>
            <Box width = {{_: "100%", md: "80%"}} variant = "post">
                <SingleCard post = {post} />
                {user &&
                <ButtonStyled onClick={handleDelete}>Delete</ButtonStyled>                
                }
                {error && <h2 style = {{color:'red'}}><br/>{error}</h2>}
            </Box>
        </Box>
    )
}

const ButtonStyled = styled.button`
    border: 1px solid red;
    color: red;
    height: 30px;
    width: 70px;
    font-weight: bold;
    margin: 20px 0 0 50px;
`

export async function getStaticPaths(){
    const res = await fetch('https://strp-backend.herokuapp.com/posts');
    const posts = await res.json();

    const paths = posts.map((post) => ({
        params: { id: post.id.toString() }
    }))

    return{ paths, fallback: false }
}

export async function getStaticProps({ params }){
    const res = await fetch(`https://strp-backend.herokuapp.com/posts/${params.id}`);
    const post = await res.json();

    return { props: { post } }
}

export default Post