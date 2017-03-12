import React, { Component } from 'react';
import ReactDOM from 'react-dom';

require('../less/transactions.less');

export default class TransactionsPage extends Component {
	state = {
		transactions: []
	}

	componentDidMount() {
		// get transactions from database
		const transactions = [
			{
				id: 4,
				date: "3/15/2017",
				amount: 100,
			},
			{
				id: 3,
				date: "3/11/2017",
				amount: -10,
			},
			{
				id: 2,
				date: "3/09/2017",
				amount: -50,
			},
			{
				id: 1,
				date: "3/08/2017",
				amount: -100,
			}
		];
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