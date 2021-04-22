const grocery_data = document.getElementById('row');
const flag_type = {
	PENDING: 'text-info',
	BOUGHT: 'text-success',
	'NOT AVAILABLE': 'text-danger',
};
const db = openDatabase('GROCERY_DB', '1.0', 'Test DB', 2 * 1024 * 1024);

db.transaction(function (tx) {
	tx.executeSql(
		'SELECT * FROM new_grocery_items',
		[],
		function (tx, results) {
			var len = results.rows.length;

			for (let i = 0; i < len; i++) {
				const grocery_item = document.createElement('div');
				grocery_item.classList.add('col-lg-4');
				const url = 'update.html#' + results.rows.item(i).id;
				grocery_item.innerHTML = ` <div class="card">
						<div class="card-body">
							<h5 class="card-title">${results.rows.item(i).item_name}</h5>
							<h6 class="card-subtitle mb-2 text-muted">${results.rows.item(i).item_quantity} Pcs.</h6>
							<p class="${flag_type[`${results.rows.item(i).item_status}`]}">${results.rows.item(i).item_status}</p>
                            <a href="${url}" index=${results.rows.item(i).id}>Update</a>
                            <a href="#" style="margin:20px" index=${results.rows.item(i).id}>Delete</a>
						</div>
					</div>`;
				grocery_data.append(grocery_item);
			}
		},
		null
	);
});

const row = document.getElementById('container');
row.addEventListener('click', e => {
	if (e.target.innerText == 'Delete') {
		console.log(e.target.innerText);
		const grocery_id = e.target.getAttribute('index');
		db.transaction(function (tx) {
			tx.executeSql(`DELETE FROM new_grocery_items WHERE id = ${grocery_id}`);
		});
		const parent_div = e.target.parentElement.parentElement;
		parent_div.remove();

		window.location.reload();
	}
});
