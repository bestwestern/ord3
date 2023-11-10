import { h, Fragment } from 'preact';
import './Adminbutton.css';

export default function Adminbutton({ showingAdmin,words }) {
    const click=()=>{
        showingAdmin.value=!showingAdmin.value}
        if (words.value==="loading")return <span></span>
return	(
<button onClick={click} class="adminbutton">{showingAdmin.value?"Hjem":"Admin"}</button>

)
}
