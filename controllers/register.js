const handleRegister = (req, res, db, bcrypt) => {
	const { email , name , password } = req.body;

	if (!name || !email || !password) {
		return res.status(400).json('incorrect details');
	}

	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(password, salt);

	db.transaction(trx => {
		trx.insert({
			hash : hash,
			email : email
		})
		.into('login')
		.returning('email')
		.then(logInEmail => {
			return trx('users')
			.returning('*')
			.insert(
					{
						name : name,
						email : logInEmail[0],
						joined : new Date()
					}
				)
				.then(user => {
					res.json(user[0]);
				})
		})
		.then(trx.commit)
		.catch(trx.rollbck)
	})
		
	.catch(err => res.status(400).json('unable to register'))
			
}

module.exports = {
	handleRegister  : handleRegister
}