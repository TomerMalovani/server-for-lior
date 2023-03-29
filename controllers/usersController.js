const db = require('../config/db');
const crypto = require('crypto');


// body (json object) req
// req.body
// query string req
// req.query


module.exports.registerUser = (req, res) => {
	console.log(req.body)
	
	const body = req.body;

	let { mac, first_name, last_name, phone_number, current_dosage, email } = body;
	const cryptedMac = crypto.createHash('sha256').update(mac).digest('hex');
	const sql = `INSERT INTO users (first_name, last_name, phone_number, current_dosage, email,crypted_mac) VALUES ( '${first_name}', '${last_name}', '${phone_number}', '${current_dosage}', '${email}','${cryptedMac}')`;
	console.log("sql",sql)
	db.query(sql, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			console.log(result)
			res.send(result);
		}
	}
	);
}

module.exports.getUserContacts =  (req, res) => {
	const body = req.body;
	let {id} = body;

	const sql = `SELECT * FROM contacts WHERE id = ${id}`;
	db.query(sql, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			console.log(result)
			res.send(result);
		}
	});

}