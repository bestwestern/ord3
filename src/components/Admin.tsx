import { h, Fragment } from 'preact';
import './Admin.css';
import { signal } from '@preact/signals';
import { useEffect } from 'preact/hooks';
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://upabdmzybbgsnbonhgmc.supabase.co";
  const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwYWJkbXp5YmJnc25ib25oZ21jIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODExMjg1NTMsImV4cCI6MTk5NjcwNDU1M30.5TeDInNIPfxKeE_KG4GcUEznh4i9wbKjUek935JSq6Y";
  const supabase = createClient(
	"https://upabdmzybbgsnbonhgmc.supabase.co",
	supabaseKey
	);

export default function Counter({ showingAdmin, words }) {
useEffect( ()=>{
	supabase
	.from("ord")
	.select("*").order('id', { ascending: false }).then(({error,data})=>{
		words.value=data
	})

},[]);

	function add(input) {

const ord=input.value
input.value = '';
supabase
.from('ord')
.insert([
	{ ord },
])
.select().then(({data,error})=>{
	if (error)alert ("noget gik galt - ord ikke indsat ordentlig. Genindlæs")
	words.value = [...data, ...words.value];
})
	}
function archive(todo){
	console.log(todo)
const newArchiveValue=!todo.archived;
supabase
.from('ord')
.update({ archived:newArchiveValue })
.eq('id', todo.id)
.select().then(({data,error})=>{
	console.log(data,error)
	if (error) alert("noget gik galt");
let newWords=[...words.value];
let changedWord=newWords.find(el=>el.id===todo.id);
changedWord.archived=newArchiveValue;
words.value=newWords
})
		
	
}
if (!showingAdmin.value)return <span></span>
	return (

<div class="board">
	<input
		class="new-todo"
		placeholder="Nyt ord"
		onKeyDown={e=>e.key==="Enter"&&add(e.target)}
	/>
	<div class="left">
		<h2>Viste ord</h2>
		{words.value.filter((t) => !t.archived).map(todo=>	
					<label>
				<input type="checkbox" checked={todo.archived} onChange={e=>archive(todo)}  />
				{todo.ord}
			</label>)
	}
		</div>

	<div class="right">
		<h2>Skjulte</h2>
		{words.value.filter((t) => t.archived).map(todo=>	

			<label >
				<input type="checkbox" checked={todo.archived} onChange={e=>archive(todo)} />
				{todo.ord}
			</label>
)}
	</div>
</div>

	);
}
