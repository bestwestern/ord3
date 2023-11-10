import { h, Fragment } from 'preact';
import './Adminbutton.css';
import { AddCount } from './Admin';
export default function Home({ showingAdmin,words,currentWord }) {
    const click=()=>{
        
        const currentId=currentWord.value?currentWord.value.id:0;
        console.log(currentId)
        if (currentId)AddCount(currentId)
        //     let changedWord=words.value.find(el=>el.id===CurrentId);
        //     const showcount=changedWord.showcount;
            // supabase
            // .from('ord')
            // .update({ showcount:showcount+1 })
            // .eq('id', currentId)
            // .select().then(({data,error})=>{
            //     console.log(data,error)
            //     if (error) alert("noget gik galt");
            // // let newWords=[...words.value];
          
            // // changedWord.archived=newArchiveValue;
            // // words.value=newWords
            // })

        // }
        const possibleWords=words.value.filter(x=>!x.archived);
        let newWord= possibleWords[Math.floor(Math.random()*possibleWords.length)];
        while (newWord.id==currentId){
            newWord = possibleWords[Math.floor(Math.random()*possibleWords.length)];
        }
        console.log({newWord})
        currentWord.value=newWord

    
    }
    if (showingAdmin.value) return <span></span>
    if (words.value==="loading")return <span></span>
    if (words.value.filter(x=>!x.archived).length<2)return <i>ikke nok ord</i>
return	(
    <div style={{marginTop:"30px"}}>

<button onClick={click} class="adminbutton">{currentWord.value?"Næste":"Start"}</button>
  <strong style={{marginLeft:"20px"}}>{currentWord.value.ord}</strong>
    </div>

)
}
