import React, { Component } from 'react';
import ReactDOM from 'react-dom';

require('../less/main.less');

export default class MainPage extends Component {
	state = {
		balance: 0,
		transactionAmount: '',
	}

	componentDidMount() {
		// get balance from database
		const balance = 200;
		this.setState({ 
			balance: balance
		});
	}

	handleTransactionAmountChange(event) {
		this.setState({
			transactionAmount: parseInt(event.target.value),
		});
	}

	submitTransaction() {
		// add transaction to database
		const { balance, transactionAmount } = this.state;
		this.setState({
			balance: balance - transactionAmount,
			transactionAmount: '',
		});
	}

	render() {
		const { balance, transactionAmount } = this.state;

		return (
			<div className="main-page">
				<h1 className="balance">{balance}</h1>
				<div className="transaction-input">
					<span className="transaction-input__dollar-sign">$</span>
					<input type="number" value={transactionAmount} onChange={e => this.handleTransactionAmountChange(e)} className="transaction-input__box" min="0.00" step="0.01" placeholder="0.00" />
				</div>
				<button className="transaction-button" onClick={() => this.submitTransaction()}>Submit Transaction</button>
			</div>
		);
	}
}