import { h, Fragment } from 'preact';
import './Adminbutton.css';

export default function Adminbutton({ showingAdmin,count }) {
    const click=()=>{
        showingAdmin.value=!showingAdmin.value}
return	(
<button onClick={click} class="adminbutton">{showingAdmin.value?"Admin":"Hjem"}</button>

)
}
