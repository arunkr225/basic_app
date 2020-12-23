const mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	SALT_WORK_FACTOR = 10;

let UserSchema = new Schema({
	name: {
		type: String,
		trim: true
	},
	email: {
		type: String,
		trim: true,
		index: true,
        required: 'Please fill in an email address',
        unique: 'Email already in the database',
		match: [/.+\@.+\..+/, 'Please fill a valid email address']
	},
	password: {
        type: String,
        required: true
	},
	created: {
		type: Date,
		default: Date.now
	}
});

/**
 * Hook a pre save method to hash the password
 */
UserSchema.pre('save', function(next) {
	let user = this;

	// generate a salt
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
		if (err) return next(err);

		// hash the password using our new salt
		bcrypt.hash(user.password, salt, function(err, hash) {
			if (err) return next(err);

			// override the cleartext password with the hashed one
			user.password = hash;
			next();
		});
	});
});

module.exports = mongoose.model('User', UserSchema);