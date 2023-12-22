import {Link} from 'react-router-dom'
import { createGlobalStyle,css,styled } from 'styled-components'
import { MdOutlineLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";


export const DarkModeIcon = styled(MdDarkMode)`
`

export const LightModeIcon = styled(MdOutlineLightMode)`
`

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
}
`





const sharedProps = css`
display: ${({$display})=>$display};
justify-content: ${({$jc})=>$jc};
align-items: ${({$ai})=>$ai};
flex-direction: ${({$fd})=>$fd};
flex: ${({$flex})=>$flex};
flex-wrap: ${({$fw})=>$fw};
width: ${({$width})=>$width};
max-width: ${({$maxwidth})=>$maxwidth};
height: ${({$height})=>$height};
max-height: ${({$maxheight})=>$maxheight};
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

@media screen and (min-width : 475px) {

    display: ${({$XS_display})=>$XS_display};
    justify-content: ${({$XS_jc})=>$XS_jc};
    align-items: ${({$XS_ai})=>$XS_ai};
    width: ${({$XS_width})=>$XS_width};
    height: ${({$XS_height})=>$XS_height};
    gap : ${({$XS_gap})=>$XS_gap} ;

}


@media screen and (min-width : 640px) {

    display: ${({$SM_display})=>$SM_display};
    justify-content: ${({$SM_jc})=>$SM_jc};
    align-items: ${({$SM_ai})=>$SM_ai};
    width: ${({$SM_width})=>$SM_width};
    height: ${({$SM_height})=>$SM_height};
    margin: ${({$SM_margin})=>$SM_margin};
    gap : ${({$SM_gap})=>$SM_gap} ;
    
}

@media screen and (min-width : 768px) {
    
    display: ${({$MD_display})=>$MD_display};
    justify-content: ${({$MD_jc})=>$MD_jc};
    align-items: ${({$MD_ai})=>$MD_ai};
    width: ${({$MD_width})=>$MD_width};
    height: ${({$MD_height})=>$MD_height};
    margin: ${({$MD_margin})=>$MD_margin};
    gap : ${({$MD_gap})=>$MD_gap} ;
    
}

@media screen and (min-width : 1024px) {
    display: ${({$LG_display})=>$LG_display};
    justify-content: ${({$LG_jc})=>$LG_jc};
    

}

@media screen and (min-width : 1280px) {
    display: ${({$XL_display})=>$XL_display};
}

@media screen and (min-width : 1536px) {
    display: ${({$2XL_display})=>$2XL_display};
}

`



export const Container = styled.div`
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




