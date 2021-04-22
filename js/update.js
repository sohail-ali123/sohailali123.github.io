const form_data = document.getElementById('form-data');
const db = openDatabase('GROCERY_DB', '1.0', 'Grocery DB', 2 * 1024 * 1024);
const options = ['BOUGHT', 'PENDING', 'NOT AVAILABLE'];

const update_id = window.location.href.split('#').pop();
console.log(update_id);
db.transaction(function (tx) {
	tx.executeSql(
		`SELECT * FROM new_grocery_items where id = ${update_id}`,
		[],
		function (tx, results) {
			var res = results.rows[0];

			const grocery_item = document.createElement('div');
			grocery_item.classList.add('col-lg-4');

			if (options.includes(res.item_status)) {
				const item_index = options.indexOf(res.item_status);
				options.splice(item_index, 1);
			}
			form_data.innerHTML = `<div class="form-group">
                    <label>Item name</label>
                    <input type="text" class="form-control" placeholder="Item name" value="${res.item_name}" id="item-name"/>
                </div>
                <div class="form-group">
                    <label>Item quantity</label>
                    <input type="text" class="form-control" placeholder="Item quantity" value="${res.item_quantity}PCS" id="item-quantity"/>
                </div>
                <div class="form-group">
                    <label>Item status</label>
                    <select class="form-control" id='item-status'>
                        <option value="1">${res.item_status}</option>
                        <option value="1">${options[0]}</option>
                        <option value="1">${options[1]}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Date</label>
                    <input type="date" class="form-control" placeholder="Date" value="${res.item_date}" id='item-date'>
                </div>
                <div class="form-group">
                    <input type="submit" value="Update" class="btn btn-danger">
                </div>`;
		},
		null
	);
});

const data = document.getElementById('form-data');

data.addEventListener('click', event => {
	if (event.target.value == 'Update') {
		const item_name = document.getElementById('item-name');
		const item_quantity = document.getElementById('item-quantity');
		const item_status = document.getElementById('item-status');
		const item_date = document.getElementById('item-date');

        item_quantity.value =item_quantity.value.replace(new RegExp(/\D/g), ' ').trim();
        console.log()

		db.transaction(function (tx) {
			tx.executeSql(
				`UPDATE new_grocery_items SET item_name = "${item_name.value}",item_quantity = "${item_quantity.value}",item_status = "${item_status.value}",item_date = "${item_date.value}" WHERE id = ${update_id}`
			);
		});
	}
});
