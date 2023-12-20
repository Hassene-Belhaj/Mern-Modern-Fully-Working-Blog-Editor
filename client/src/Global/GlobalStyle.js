import {Link} from 'react-router-dom'
import { createGlobalStyle,styled } from 'styled-components'
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
}

body{
    scroll-behavior: smooth;
}

`

export const Container = styled.div`
display: ${({$display})=>$display};
justify-content: ${({$jc})=>$jc};
align-items: ${({$ai})=>$ai};
flex-direction: ${({$fd})=>$fd};
flex: ${({$flex})=>$flex};
flex-wrap: ${({$fr})=>$fr};
width: ${({$width})=>$width};
max-width: ${({$maxwidth})=>$maxwidth};
height: ${({$height})=>$height};
position: ${({$position})=>$position};
padding: ${({$padding})=>$padding};
margin: ${({$margin})=>$margin};
color: ${({$color})=>$color};
background-color: ${({$bg})=>$bg};
border: ${({$border})=>$border};
border-radius: ${({$br})=>$br};
border-top: ${({$borderT})=>$borderT};
border-bottom: ${({$borderB})=>$borderB};
border-right: ${({$borderR})=>$borderR};
border-left: ${({$borderL})=>$borderL};
gap: ${({$gap})=>$gap};
overflow: hidden;
`

export const Div = styled.div`
display: ${({$display})=>$display};
justify-content: ${({$jc})=>$jc};
align-items: ${({$ai})=>$ai};
flex-direction: ${({$fd})=>$fd};
flex: ${({$flex})=>$flex};
flex-wrap: ${({$fw})=>$fw};
width: ${({$width})=>$width};
max-width: ${({$maxwidth})=>$maxwidth};
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
color: ${({$color})=>$color};
background-color: ${({$bg})=>$bg};
border: ${({$border})=>$border};
border-top: ${({$borderT})=>$borderT};
border-bottom: ${({$borderB})=>$borderB};
border-right: ${({$borderR})=>$borderR};
border-left: ${({$borderL})=>$borderL};
border-radius: ${({$br})=>$br};
gap: ${({$gap})=>$gap};
box-shadow: ${({$boxShadow})=>$boxShadow};
transition: ${({$transition})=>$transition};
@media screen and (min-width : 768px) {
    display: ${({$Lg})=>$Lg};
    justify-content: ${({$jcLg})=>$jcLg};
}
@media screen and (max-width : 768px) {
    display: ${({$Md})=>$Md};
}
&:hover {
    background-color: ${({$bgh})=>$bgh};
    cursor: ${({$cursor})=>$cursor};
}
`
export const Section = styled.section`
display: ${({$display})=>$display};
justify-content: ${({$jc})=>$jc};
align-items: ${({$ai})=>$ai};
flex-direction: ${({$fd})=>$fd};
flex: ${({$flex})=>$flex};
flex-wrap: ${({$fr})=>$fr};
width: ${({$width})=>$width};
max-width: ${({$maxwidth})=>$maxwidth};
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
color: ${({$color})=>$color};
background-color: ${({$bg})=>$bg};
border: ${({$border})=>$border};
border-top: ${({$borderT})=>$borderT};
border-bottom: ${({$borderB})=>$borderB};
border-right: ${({$borderR})=>$borderR};
border-left: ${({$borderL})=>$borderL};
border-radius: ${({$br})=>$br};
gap: ${({$gap})=>$gap};
box-shadow: ${({$boxShadow})=>$boxShadow};
transition: ${({$transition})=>$transition};
@media screen and (min-width : 768px) {
    display: ${({$Lg})=>$Lg};
}
@media screen and (max-width : 768px) {
    display: ${({$Md})=>$Md};
}
&:hover {
    background-color: ${({$bgh})=>$bgh};
    cursor: ${({$cursor})=>$cursor};
}
`


export const Button = styled.button`
display: ${({$display})=>$display};
justify-content: ${({$jc})=>$jc};
align-items: ${({$ai})=>$ai};
flex-wrap: ${({$fr})=>$fr};
width: ${({$width})=>$width};
height: ${({$height})=>$height};
padding: ${({$padding})=>$padding};
margin: ${({$margin})=>$margin};
color: ${({$color})=>$color};
background-color: ${({$bg})=>$bg};
border: ${({$border})=>$border};
border-radius: ${({$br})=>$br};
border-start-start-radius: ${({$bssr})=>$bssr};
gap: ${({$gap})=>$gap};
transition: all ease-in-out 0.3s;
cursor: pointer;
&:hover{
    opacity: ${({$opacity})=>$opacity};
    color: ${({$colorH})=>$colorH};
    background-color: ${({$backgorundH})=>$backgorundH};
}
@media screen and (min-width : 768px) {
    display: ${({$Lg})=>$Lg};
}
@media screen and (max-width : 768px) {
    display: ${({$Md})=>$Md};
}
`

export const Form = styled.form`
display: ${({$display})=>$display};
justify-content: ${({$jc})=>$jc};
align-items: ${({$ai})=>$ai};
flex-direction: ${({$fd})=>$fd};
flex: ${({$flex})=>$flex};
flex-wrap: ${({$fr})=>$fr};
max-width: ${({$maxwidth})=>$maxwidth};
width: ${({$width})=>$width};
height: ${({$height})=>$height};
position: ${({$position})=>$position};
padding: ${({$padding})=>$padding};
margin: ${({$margin})=>$margin};
color: ${({$color})=>$color};
background-color: ${({$bg})=>$bg};
border: ${({$border})=>$border};
border-top: ${({$borderT})=>$borderT};
border-bottom: ${({$borderB})=>$borderB};
border-right: ${({$borderR})=>$borderR};
border-left: ${({$borderL})=>$borderL};
gap: ${({$gap})=>$gap};
`

export const Input = styled.input`
display: ${({$display})=>$display};
justify-content: ${({$jc})=>$jc};
align-items: ${({$ai})=>$ai};
flex-direction: ${({$fd})=>$fd};
flex: ${({$flex})=>$flex};
flex-wrap: ${({$fr})=>$fr};
width: ${({$width})=>$width};
max-width: ${({$maxwidth})=>$maxwidth};
height: ${({$height})=>$height};
padding: ${({$padding})=>$padding};
margin: ${({$margin})=>$margin};
outline: ${({$outline})=>$outline};
border: ${({$border})=>$border};
font-size: ${({$fs})=>$fs};
border-radius: ${({$br})=>$br};
border-start-start-radius: ${({$bssr})=>$bssr};
background-color: ${({$bg})=>$bg};
transition: all ease-in-out 0.5s;
position: ${({$position})=>$position};  
&:focus{  
    border: ${({$borderF})=>$borderF};
}
&::placeholder{
    color: ${({$colorPH})=>$colorPH};
}
`

export const TextArea = styled.textarea`
width: ${({$width})=>$width};
height: ${({$height})=>$height};
padding: ${({$padding})=>$padding};
margin: ${({$margin})=>$margin};
outline: ${({$outline})=>$outline};
border: ${({$border})=>$border};
font-size: ${({$fs})=>$fs};
border-radius: ${({$br})=>$br};
border-start-start-radius: ${({$bssr})=>$bssr};
background-color: ${({$bg})=>$bg};
transition: all ease-in-out 0.5s;
position: ${({$position})=>$position};  
resize: ${({$resize})=>$resize};
text-transform: ${({$tt})=>$tt};
&:focus{  
    border: ${({$borderF})=>$borderF};
}
&::placeholder{
    color: ${({$colorPH})=>$colorPH};
}
`

export const Title = styled.h2`
text-align: ${({$ta})=>$ta};
font-size: ${({$fs})=>$fs};
padding: ${({$padding})=>$padding};
margin: ${({$margin})=>$margin};
font-weight: ${({$fw})=>$fw};
color: ${({$color})=>$color};
border: ${({$border})=>$border};
`

export const Text = styled.p`
text-align: ${({$ta})=>$ta};
font-size: ${({$fs})=>$fs};
font-weight: ${({$fw})=>$fw};
color: ${({$color})=>$color};
text-transform: ${({$tt})=>$tt};
padding: ${({$padding})=>$padding};
margin: ${({$margin})=>$margin};
border: ${({$border})=>$border};
transition: ${({$transition})=>$transition};
outline: ${({$outline})=>$outline};
&:hover {
    background-color: ${({$bgh})=>$bgh};
}
&:focus {
    background-color: ${({$bgf})=>$bgf};
}
`

export const Image = styled.img`
width: ${({$width})=>$width};
height: ${({$height})=>$height};
padding: ${({$padding})=>$padding};
margin: ${({$margin})=>$margin};
object-fit: ${({$of})=>$of};
border-radius: ${({$br})=>$br};
position: ${({$position})=>$position};
z-index: ${({$z})=>$z};
cursor: pointer;
`
export const Span = styled.span`
width: ${({$width})=>$width};
height: ${({$height})=>$height};
padding: ${({$padding})=>$padding};
margin: ${({$margin})=>$margin};
text-align: ${({$ta})=>$ta};
font-size: ${({$fs})=>$fs};
font-weight: ${({$fw})=>$fw};
color: ${({$color})=>$color};
border: ${({$border})=>$border};
border-radius: ${({$br})=>$br};
`
export const Navlink = styled(Link)`
text-align: ${({$ta})=>$ta};
font-size: ${({$fs})=>$fs};
font-weight: ${({$fw})=>$fw};
color: ${({$color})=>$color};
text-decoration: ${({$td})=>$td};
text-underline-offset: 8px;
padding: ${({$padding})=>$padding};
margin: ${({$margin})=>$margin};
transition: all ease-in-out 0.3s;
border-bottom: ${({$borderB})=>$borderB};
&:hover{
    text-decoration: ${({$tdh})=>$tdh};
    text-underline-offset: 8px;
}
&:active{ 
    color :${({$active})=>$active} ;
}
`

