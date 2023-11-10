import { h, Fragment } from 'preact';
import './Adminbutton.css';

export default function Adminbutton({ showingAdmin }) {
    console.log(showingAdmin.value)
    const click=()=>{
        showingAdmin.value=!showingAdmin.value}
return	(
<button onClick={click} class="adminbutton">{showingAdmin.value?"Hjem":"Admin"}</button>

)
}
