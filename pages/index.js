import { Flex, Box } from 'reflexbox'   
import Card from '../components/Card'
import Link from 'next/link'
import Head from 'next/head'
import fetch from 'isomorphic-unfetch'


const HomePage = ({ posts }) => {
    return(
    // max-width: 960px; width: 100%; margin: 0 auto; padding: 30px;
    <Box variant = "container">
        <Head>
            <title>CodeBoard Public Posts</title>
        </Head>
        <Flex justifyContent = "space-between" flexDirection = {{_: "column"}}>
            {posts.map(post => (
                <Box key = {post.id} width = {{_: "100%", md: "80%"}} variant = "post">
                    <Link as="/path/to" href = {`/posts/${post.id}`}><a style = {{textDecoration: "none", color:"black"}}>
                    <Card post = {post} /></a>
                    </Link>
                </Box>
            ))}
        </Flex>
    </Box>
    )
}

export async function getStaticProps(){
    const res = await fetch('https://strp-backend.herokuapp.com/posts');
    const posts = await res.json();

    return{
        props:{
            posts
        }
    }
}

export default HomePage