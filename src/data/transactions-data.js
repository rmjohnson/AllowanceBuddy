import _ from 'lodash';
import moment from 'moment';
import websql from 'websql-promisified';

const dateFormat = 'MM/DD/YYYY';
const db = window.openDatabase('allowance_buddy', 'v1', 'AllowanceBuddy Database', 104857600);
const websqlPromise = websql(db);

export default {
	async initializeDatabase() {
		const createTableSql = `
CREATE TABLE IF NOT EXISTS transactions (
	id INTEGER PRIMARY KEY ASC,
	date TEXT,
	amount REAL
)`
		// Also add income now if needed
		await websqlPromise.transaction(tx => {
			tx.executeSql(createTableSql);
		});
	},

	async getBalance() {
		// for now just sum transactions but we could probably cache this
		return _.sumBy(await this.getTransactions(), t => t.amount);
	},

	async getTransactions() {
		const selectSql = `
SELECT
	id,
	date,
	amount
FROM transactions`;

		const results = await websqlPromise.transaction(tx => {
			tx.executeSql(selectSql);
		});
		const transactions = results[0].rows;
		const mappedTransactions = _.chain(transactions)
			.orderBy(t => t.date, 'desc')
			.map(t => ({
				id: t.id,
				date: moment(t.date).format(dateFormat),
				amount: t.amount,
			}))
			.value()
		return mappedTransactions;
	},

	async addTransaction(amount) {
		const insertSql = `
INSERT INTO transactions
(date, amount)
VALUES
(?, ?)`;
		const parameters = [moment(), amount];
		await websqlPromise.transaction(tx => {
			tx.executeSql(insertSql, parameters);
		});

		return await this.getBalance();
	},
}
