import styled from '@emotion/styled'
import { rem } from 'polished'
import Navigation from './Navigation'
import Link from 'next/link'
import { Box } from 'reflexbox'

function Header({isDark}) {
    return(
        <HeaderStyled isDark = {isDark}>
            <div className = "container">
                <div className = "logo">
                    <SpanStyled className = "logo-text">
                        <Link href = "/"><a>CodeBoard</a></Link>
                    </SpanStyled>
                </div>
                <div className = "nav-link-signup">
                    <Navigation />
                </div>
            </div>
        </HeaderStyled>
    )
}
const SpanStyled = styled.span`
    a{
        text-decoration: none;
        color: #000000;

        &:hover{
            text-decoration: underline;
       }

        &.active{
            color: #EF6800;
        }
    }
`
const HeaderStyled = styled.header`
    .nav-link-signup{
        width:111px;
        float:right;
    }
    background: ${props => props.isDark ? '#000000' : '#efefef'};
    padding-bottom: 15px;
    .logo{
        display: flex;
        align-items: center;
        width:111px;
        float: left;
    }
    .logo-text{
        font-weight: bold;
        color: ${props => props.isDark ? '#efefef' : '#000000'};
        font-size: ${rem(20)};
    }
`

export default Header