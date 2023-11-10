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
export default function Counter({ children, count }) {
useEffect( ()=>{
	supabase
	.from("ord")
	.select("*").then(({error,data})=>{
		console.log(data)
		todos.value=data
		
	})

},[]);

	let uid = todos.value.length + 1;

	function add(input) {
		console.log(input.value)
		const todo = {
			id: uid++,
			archived: false,
			ord: input.value
		};
console.log(todos.value)
todos.value = [todo, ...todos.value];
		input.value = '';
	}

	function remove(todo) {
		todos.value = todos.value.filter((t) => t !== todo);
	}

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
				<input type="checkbox" checked={todo.archived}  />
				{todo.ord}
			</label>)
	}
		</div>

	<div class="right">
		<h2>archived</h2>
		{todos.value.filter((t) => t.archived).map(todo=>	

			<label >
				<input type="checkbox" checked={todo.archived} />
				{todo.ord}
				<button onClick={e=>remove(todo)}>x</button>

			</label>
)}
	</div>
</div>

	);
}
