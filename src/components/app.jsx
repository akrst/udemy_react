import React, {Component} from 'react';

import Greeting from './greeting.jsx';

class App extends Component{
	constructor(props){
		super(props);
		this.state = {
			name: 'John',
		};
	}
	handleNameChange(name){
		this.setState({name}); //ショートハンド name: name の省略
	}


	render(){
		return(
			<div>
				<input
					type="text"
					value={this.state.name}
					onChange={e => this.handleNameChange(e.target.value)}
				/>
				<Greeting name={this.state.name} />
			</div>
			);
	}
}

export default App;
