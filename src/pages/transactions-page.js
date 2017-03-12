import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TransactionsData from '../data/transactions-data';

require('../less/transactions.less');

export default class TransactionsPage extends Component {
	state = {
		transactions: []
	}

	componentDidMount() {
		// get transactions from database
		const transactions = TransactionsData.getTransactions();
		this.setState({ 
			transactions: transactions
		});
	}

	render() {
		const { transactions } = this.state;

		const transactionRows = transactions.map(transaction => {
			const transactionAmountModifier = transaction.amount < 0 ? "transaction__amount--negative" : "transaction__amount--positive";
			const transactionAmountClassName = `transaction__amount ${transactionAmountModifier}`;
			return (
				<tr key={transaction.id} className="transaction">
					<td className="transaction__date">{transaction.date}</td>
					<td className={transactionAmountClassName}>{transaction.amount}</td>
				</tr>
			);
		});

		return (
			<div className="transactions-page">
				<table>
					<thead>
						<tr>
							<th>Date</th>
							<th>Amount</th>
						</tr>
					</thead>
					<tbody>
						{transactionRows}
					</tbody>
				</table>
			</div>
		);
	}
}