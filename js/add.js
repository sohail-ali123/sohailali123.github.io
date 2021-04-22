const submit = document.getElementById('submit');
const item_name = document.getElementById('item-name');
const item_quantity = document.getElementById('item-quantity');
const item_status = document.getElementById('item-status');
const item_date = document.getElementById('item-date');
const db = openDatabase('GROCERY_DB', '1.0', 'Grocery DB', 2 * 1024 * 1024);

submit.addEventListener('click', e => {
	db.transaction(function (tx) {
		tx.executeSql(
			'CREATE TABLE IF NOT EXISTS new_grocery_items (id INTEGER PRIMARY KEY,item_name,item_quantity,item_status,item_date)'
		);
		tx.executeSql(
			`INSERT INTO new_grocery_items (item_name,item_quantity,item_status,item_date) VALUES ("${item_name.value}","${item_quantity.value}","${item_status.value}","${item_date.value}")`
		);
	});
});
