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
const todos = signal([
])
export default function Counter({ showingAdmin, count }) {
useEffect( ()=>{
	supabase
	.from("ord")
	.select("*").order('id', { ascending: false }).then(({error,data})=>{
		console.log(data)
		todos.value=data
		
	})

},[]);

	let uid = todos.value.length + 1;

	function add(input) {
		const todo = {
			id: uid++,
			archived: false,
			ord: input.value
		};
console.log(todos.value)
input.value = '';
		
supabase
.from('ord')
.insert([
	{ ord: todo.ord },
])
.select().then(({data,error})=>{
	if (error)alert ("noget gik galt - ord ikke indsat ordentlig. Genindlæs")
	todos.value = [...data, ...todos.value];

})
		
	}
function archive(todo){
	console.log(todo)

supabase
.from('ord')
.update({ archived:!todo.archived })
.eq('id', todo.id)
.select()
		
	
}
	function remove(todo) {
		todos.value = todos.value.filter((t) => t !== todo);
	}
	console.log(showingAdmin.value)
if (!showingAdmin.value)return <span></span>
	return (

<div class="board">
	<input
		class="new-todo"
		placeholder="Nyt ord"
		onKeyDown={e=>e.key==="Enter"&&add(e.target)}
	/>
	<div class="left">
		<h2>todo</h2>
		{todos.value.filter((t) => !t.archived).map(todo=>	
					<label>
				<input type="checkbox" checked={todo.archived} onChange={e=>archive(todo)}  />
				{todo.ord}
			</label>)
	}
		</div>

	<div class="right">
		<h2>archived</h2>
		{todos.value.filter((t) => t.archived).map(todo=>	

			<label >
				<input type="checkbox" checked={todo.archived} onChange={e=>archive(todo)} />
				{todo.ord}
				<button onClick={e=>remove(todo)}>x</button>

			</label>
)}
	</div>
</div>

	);
}
