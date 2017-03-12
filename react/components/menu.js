import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

require('../less/menu.less');

export default class Menu extends Component {
	static propTypes = {
		currentPage: PropTypes.string.isRequired,
		menuItems: PropTypes.arrayOf(PropTypes.object).isRequired,
		pageChangeHandler: PropTypes.func.isRequired,
	}

	render() {
		const { currentPage, menuItems, pageChangeHandler } = this.props;
		
		const menuButtons = menuItems.map(menuItem => {
			const className = `menu__item ${menuItem.token === currentPage ? 'menu__item--active' : ''}`;
			return (
				<button className={className} onClick={() => pageChangeHandler(menuItem.token)} key={menuItem.token}>{menuItem.displayName}</button>
			);
		});

		return (
			<div className="menu">
				{menuButtons}
			</div>
		);
	}
}
