import { useContext } from 'react'
import styled from '@emotion/styled'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { UserContext } from "../context/UserContext";

function Navigation() {

    const {user} = useContext(UserContext)
    const router = useRouter()
    
    return(
        <NavigationStyled>
            <ul>
                {!user &&
                <li>
                    <Link href = "/login">
                        <a className = {router.pathname === '/login' ? 'active' : ''}>LogIn</a>
                    </Link>
                </li>
                }
                {!user &&   
                <li>
                    <Link href = "/signup">
                        <a className = {router.pathname === '/signup' ? 'active' : ''}>SignUp</a>
                    </Link>
                </li>
                }  
                {user &&
                <li>
                    <Link href = "/new">
                        <a className = {router.pathname === '/new' ? 'active' : ''}>Create</a>
                    </Link>
                </li>
                }

            </ul>
        </NavigationStyled>
    )
}

const NavigationStyled = styled.div`
    ul{
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;

        li{
            margin-right: 20px;
        }

        a{
            text-decoration: none;
            color: #000000;

            &:hover{
                text-decoration: underline;
            }

            &.active{
                text-decoration: underline;
                font-weight: bold;
            }
        }
    }
`

export default Navigation