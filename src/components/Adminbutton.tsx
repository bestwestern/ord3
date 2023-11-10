import { h, Fragment } from 'preact';
import './Adminbutton.css';

export default function Adminbutton({ showingAdmin,count }) {
    const click=()=>showingAdmin.value=!showingAdmin.value
    const subtract = () => count.value--;
console.log(showingAdmin.value)
return	(
<div>
    <h3>{count}</h3>
<button onClick={subtract}>-</button>
<button onClick={click} class="adminbutton">{showingAdmin.value?"Admin":"Hjem"}</button>
</div>

)
}
