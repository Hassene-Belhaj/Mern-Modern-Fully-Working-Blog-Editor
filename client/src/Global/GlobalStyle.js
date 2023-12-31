import {Link} from 'react-router-dom'
import { createGlobalStyle,css,styled } from 'styled-components'

export const GlobalStyleApp=createGlobalStyle`
*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
    /* font-family: 'Karla', sans-serif; */
}
body{
    scroll-behavior: smooth;
    overflow-x: hidden;
}
`


const sharedProps = css`
display: ${({$display})=>$display};
justify-content: ${({$jc})=>$jc};
align-items: ${({$ai})=>$ai};
flex-direction: ${({$fd})=>$fd};
flex: ${({$flex})=>$flex};
flex-wrap: ${({$fw})=>$fw};
order : ${({$order})=>$order};
width: ${({$width})=>$width};
max-width: ${({$maxwidth})=>$maxwidth};
max-height: ${({$maxheight})=>$maxheight};
height: ${({$height})=>$height};
position: ${({$position})=>$position};
z-index: ${({$z})=>$z};
top: ${({$top})=>$top};
left: ${({$left})=>$left};
right: ${({$right})=>$right};
bottom: ${({$bottom})=>$bottom};
transform:${({$transform})=>$transform} ;
padding: ${({$padding})=>$padding};
margin: ${({$margin})=>$margin};
text-align: ${({$ta})=>$ta};
text-decoration: ${({$td})=>$td};
font-size: ${({$fs})=>$fs};
font-weight: ${({$fw})=>$fw};
color: ${({$color})=>$color};
background-color: ${({$bg})=>$bg};
outline: ${({$outline})=>$outline};
border: ${({$border})=>$border};
border-top: ${({$borderT})=>$borderT};
border-bottom: ${({$borderB})=>$borderB};
border-right: ${({$borderR})=>$borderR};
border-left: ${({$borderL})=>$borderL};
border-radius: ${({$br})=>$br};
box-shadow: ${({$boxShadow})=>$boxShadow};
gap: ${({$gap})=>$gap};
object-fit: ${({$of})=>$of};
resize: ${({$resize})=>$resize};
transition:${({$transition})=>$transition};
text-transform: ${({$tt})=>$tt};

&:hover {
    background-color: ${({$bgh})=>$bgh};
    cursor: ${({$cursor})=>$cursor};
    opacity: ${({$opacity})=>$opacity};
    color: ${({$colorH})=>$colorH};
}

&:active{ 
    color :${({$active})=>$active} ;
}

&:focus{  
    border: ${({$borderF})=>$borderF};
}

&::placeholder{
    color: ${({$colorPH})=>$colorPH};
}


@media screen and (min-width : 250px) {

    display: ${({$XS_display})=>$XS_display};
    width : ${({$XS_width})=>$XS_width} ;
    flex-direction: ${({$XS_fd})=>$XS_fd};
    order : ${({$XS_order})=>$XS_order} ;
    display: ${({$XS_display})=>$XS_display};
    justify-content: ${({$XS_jc})=>$XS_jc};
    align-items: ${({$XS_ai})=>$XS_ai};
    width: ${({$XS_width})=>$XS_width};
    height: ${({$XS_height})=>$XS_height};
    gap : ${({$XS_gap})=>$XS_gap} ;

}

@media screen and (min-width : 640px) {
    
    display: ${({$SM_display})=>$SM_display};
    flex-direction: ${({$SM_fd})=>$SM_fd};
    order : ${({$SM_order})=>$SM_order} ;
    justify-content: ${({$SM_jc})=>$SM_jc};
    align-items: ${({$SM_ai})=>$SM_ai};
    width: ${({$SM_width})=>$SM_width};
    height: ${({$SM_height})=>$SM_height};
    margin: ${({$SM_margin})=>$SM_margin};
    gap : ${({$SM_gap})=>$SM_gap} ;
    width : ${({$SM_width})=>$SM_width} ;
    flex: ${({$SM_flex})=>$SM_flex};
    
}

@media screen and (min-width : 768px) {
    
    display: ${({$MD_display})=>$MD_display};
    flex-direction: ${({$MD_fd})=>$MD_fd};
    justify-content: ${({$MD_jc})=>$MD_jc};
    order : ${({$MD_order})=>$MD_order} ;
    align-items: ${({$MD_ai})=>$MD_ai};
    width: ${({$MD_width})=>$MD_width};
    height: ${({$MD_height})=>$MD_height};
    margin: ${({$MD_margin})=>$MD_margin};
    gap : ${({$MD_gap})=>$MD_gap} ;
    width : ${({$MD_width})=>$MD_width} ;
    flex: ${({$MD_flex})=>$MD_flex};
    
}


@media screen and (min-width : 1024px) {
    display: ${({$LG_display})=>$LG_display};
    flex-direction: ${({$LG_fd})=>$LG_fd};
    justify-content: ${({$LG_jc})=>$LG_jc};
    order : ${({$LG_order})=>$LG_order} ;
    align-items: ${({$LG_ai})=>$LG_ai};
    width: ${({$LG_width})=>$LG_width};
    height: ${({$LG_height})=>$LG_height};
    margin: ${({$LG_margin})=>$LG_margin};
    gap : ${({$LG_gap})=>$LG_gap} ;
    width : ${({$LG_width})=>$LG_width} ;
    flex: ${({$LG_flex})=>$LG_flex};
}

@media screen and (min-width : 1280px) {
    display: ${({$XL_display})=>$XL_display};
    flex-direction: ${({$XL_fd})=>$XL_fd};
    justify-content: ${({$XL_jc})=>$XL_jc};
    order : ${({$XL_order})=>$XL_order} ;
    align-items: ${({$XL_ai})=>$XL_ai};
    width: ${({$XL_width})=>$XL_width};
    height: ${({$XL_height})=>$XL_height};
    margin: ${({$XL_margin})=>$XL_margin};
    gap : ${({$XL_gap})=>$XL_gap} ;
    width : ${({$XL_width})=>$XL_width} ;
    flex: ${({$XL_flex})=>$XL_flex};
}

@media screen and (min-width : 1536px) {
    display: ${({$2XL_display})=>$2XL_display};
    flex-direction: ${({$2XL_fd})=>$2XL_fd};
    justify-content: ${({$2XL_jc})=>$2XL_jc};
    order : ${({$2XL_order})=>$2XL_order} ;
    align-items: ${({$2XL_ai})=>$2XL_ai};
    width: ${({$2XL_width})=>$2XL_width};
    height: ${({$2XL_height})=>$2XL_height};
    margin: ${({$2XL_margin})=>$2XL_margin};
    gap : ${({$2XL_gap})=>$2XL_gap} ;
    width : ${({$2XL_width})=>$2XL_width} ;
    flex: ${({$2XL_flex})=>$2XL_flex};

}

`



export const Container = styled.div`
${sharedProps};
`

export const Nav = styled.nav`
${sharedProps};
`

export const Header = styled.header`
${sharedProps};
`

export const Div = styled.div`
${sharedProps}
`


export const Section = styled.section`
${sharedProps}
`


export const Button = styled.button`
${sharedProps} ;
cursor: pointer;
`

export const Form = styled.form`
${sharedProps};
`

export const Input = styled.input`
${sharedProps};
`

export const TextArea = styled.textarea`
${sharedProps} ;
`

export const Title = styled.h2`
${sharedProps};
`

export const Text = styled.p`
${sharedProps} ;
`

export const Image = styled.img`
${sharedProps};
`


export const Span = styled.span`
${sharedProps};
`

export const Navlink = styled(Link)`
${sharedProps};
`

// export const Blue = '#818cf8'




