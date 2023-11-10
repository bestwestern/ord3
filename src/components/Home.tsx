import { h, Fragment } from 'preact';
import './Adminbutton.css';
export default function Home({ showingAdmin,words,currentWord }) {
    const click=()=>{
        console.log("click")
        const currentId=currentWord.value?currentWord.value.id:0;
        const possibleWords=words.value.filter(x=>!x.archived);
        let newWord= possibleWords[Math.floor(Math.random()*possibleWords.length)];
        while (newWord.id==currentId){
            newWord = possibleWords[Math.floor(Math.random()*possibleWords.length)];
        }
        console.log({newWord})
        currentWord.value=newWord

    
    }
    if (showingAdmin.value) return <span></span>
return	(
    <div style={{marginTop:"30px"}}>

<button onClick={click} class="adminbutton">{currentWord.value?"Næste":"Start"}</button>
  <strong style={{marginLeft:"20px"}}>{currentWord.value.ord}</strong>
    </div>

)
}
