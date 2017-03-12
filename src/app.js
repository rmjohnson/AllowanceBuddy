import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MainPage from './pages/main-page';
import TransactionsPage from './pages/transactions-page';
import Menu from './components/menu';

class App extends Component {
	state = {
		currentPage: 'main',
		keyboardVisible: false
	}

	handlePageChange(newPage) {
		this.setState({
			currentPage: newPage
		});
	}

	componentDidMount(){
		window.addEventListener('native.keyboardhide', () => this.setState({ keyboardVisible: false }), false);
		window.addEventListener('native.keyboardshow', () => this.setState({ keyboardVisible: true }), false);
	}

	componentWillUnmount(){
		window.removeEventListener('native.keyboardhide', () => this.setState({ keyboardVisible: false }), false);
		window.removeEventListener('native.keyboardshow', () => this.setState({ keyboardVisible: true }), false);
	}

	render() {
		const { currentPage, keyboardVisible } = this.state;

		const pages = [
			{
				token: "main",
				component: <MainPage />,
				displayName: "Home",
			},
			{
				token: "transactions",
				component: <TransactionsPage />,
				displayName: "Transactions",
			}
		];

		const currentPageComponent = pages.find(p => p.token === currentPage).component;
		const menuComponent = keyboardVisible ? null : (<Menu currentPage={currentPage} menuItems={pages} pageChangeHandler={newPage => this.handlePageChange(newPage)} />);
		return (
			<div>
				{currentPageComponent}
				{menuComponent}
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'))