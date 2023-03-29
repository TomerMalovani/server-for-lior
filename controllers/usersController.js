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
	const query = req.query;
	let {id} = query;

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


module.exports.updateConnection =  (req, res) => {
	const body = req.body;
	let{mac, status} = body
	const cryptedMac = crypto.createHash('sha256').update(mac).digest('hex');
	const sql = `UPDATE users SET status = '${status}' WHERE crypted_mac = '${cryptedMac}'`;
	db.query(sql, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			console.log(result)
			res.send(result);
		}
	});
}

module.exports.getConnection = (req, res) => {
	const query = req.query;
	let {id} = query;
	const sql = `SELECT status FROM users WHERE id = ${id}`;
	db.query(sql, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			console.log(result)
			res.send(result);
		}
	});
}

module.exports.updateDetails = (req, res) => {
	const body = req.body;
	let {id, first_name, last_name, phone_number, current_dosage, email} = body;
	const sql = `UPDATE users SET first_name = '${first_name}', last_name = '${last_name}', phone_number = '${phone_number}', current_dosage = '${current_dosage}', email = '${email}' WHERE id = ${id}`;
	db.query(sql, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			console.log(result)
			res.send(result);//maybe send int?
		}
	});
}

module.exports.fallDetection = (req, res) => {
	const body = req.body;
	let {mac} = body;
	let sqlquery;
	const cryptedMac = crypto.createHash('sha256').update(mac).digest('hex');
	const sql = `SELECT id, first_name, last_name FROM users WHERE crypted_mac = '${cryptedMac}'`;
	db.query(sql, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			sqlquery = `SELECT email FROM contacts WHERE id = '${user_id}'`;
			db.query(sqlquery, (err, result) => {
				if (err) {
					console.log(err);
				} else {
					//StableFunctions.send_email(sqlquery.email, sql[0].first_name, sql[0].last_name);//need to write this function
					res.send(result);
				}
			});
		}
	});
}



