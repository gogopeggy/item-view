import Item from './view/home';
import items from './data/items.json';
import './App.css';

function App() {
	return (
		<>
			<Item items={items} />
		</>
	);
}

export default App;
