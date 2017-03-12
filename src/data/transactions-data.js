import _ from 'lodash';
import moment from 'moment';

const privates = {
	transactions: [
		{
			id: 3,
			date: moment('3/12/2017'),
			amount: 200,
		},
		{
			id: 2,
			date: moment('3/11/2017'),
			amount: -10,
		},
		{
			id: 1,
			date: moment('3/09/2017'),
			amount: -50,
		},
		{
			id: 0,
			date: moment('3/08/2017'),
			amount: -100,
		}
	],
	dateFormat: 'MM/DD/YYYY'
};

export default {
	getBalance() {
		// for now just sum transactions but we could probably cache this
		return _.sumBy(this.getTransactions(), t => t.amount);
	},

	getTransactions() {
		return _.chain(privates.transactions)
			.orderBy(t => t.date, 'desc')
			.map(t => ({
				id: t.id,
				date: t.date.format(privates.dateFormat),
				amount: t.amount,
			}))
			.value();
	},

	addTransaction(amount) {
		const transaction = {
			id: privates.transactions.length, //hack
			date: moment(),
			amount: amount
		};
		privates.transactions.push(transaction);
	}
}
