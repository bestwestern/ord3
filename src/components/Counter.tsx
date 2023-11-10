import { h, Fragment } from 'preact';
import './Counter.css';
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
	{ id: 1, done: false, description: 'write some docs' },
	{ id: 2, done: false, description: 'start writing JSConf talk' },
	{ id: 3, done: true, description: 'buy some milk' },
	{ id: 4, done: false, description: 'mow the lawn' },
	{ id: 5, done: false, description: 'feed the turtle' },
	{ id: 6, done: false, description: 'fix some bugs' }
])
export default function Counter({ children, count }) {
useEffect( ()=>{
	supabase
	.from("ord")
	.select("*").then(response=>{
		console.log(response)
	})

},[]);

	let uid = todos.value.length + 1;

	function add(input) {
		console.log(input.value)
		const todo = {
			id: uid++,
			done: false,
			description: input.value
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
		{todos.value.filter((t) => !t.done).map(todo=>	
					<label>
				<input type="checkbox" checked={todo.done} />
				{todo.description}
				<button onClick={e=>remove(todo)}>x</button>
			</label>)
	}
		</div>

	<div class="right">
		<h2>done</h2>
		{todos.value.filter((t) => t.done).map(todo=>	

			<label >
				<input type="checkbox" checked={todo.done} />
				{todo.description}
				<button onClick={e=>remove(todo)}>x</button>

			</label>
)}
	</div>
</div>

	);
}
