"use strict";

const crypto = require('crypto');
const {Http400Error} = require('../helpers/http-error');

module.exports = function(sequelize, DataTypes) {
  const cryptoSecret = "7h15i5t#353(12370/=T41s(v)355a63";
  const emailRegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const regexp = /^[A-Za-z0-9][A-Za-z0-9\s]+[A-Za-z0-9]$/;
  const usernameRegExp = /^[A-Za-z0-9]+[A-Za-z0-9]$/;

  // The Model
	const user = sequelize.define("user", {
		name: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        value = value.trim();
        if(value == '') 
          throw new Http400Error("Name Required");

        if(regexp.test(value) === false) 
          throw new Http400Error("Only Alphabets, space and digits allowed in Name");

        this.setDataValue('name', value);
      }
    },
		username: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true,
      set(value) {
        if(value === null) return;
        value = value.trim();
        if(value === '')
          throw new Http400Error("Username required");

        if(usernameRegExp.test(value) === false) 
          throw new Http400Error("Only Alphabets and digits allowed in Username");
        
        this.setDataValue('username', value);
      }
    },
		email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      set(value) {
        value = value.trim();

        if(value === '') 
          throw new Http400Error("Email Required");

        if(emailRegExp.test(value) === false) 
          throw new Http400Error("Invalid Email format");
        
        this.setDataValue('email', value);
      }
    },
		loginSource: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true,
      set(value) {
        value = value.trim();
        this.setDataValue('loginSource', value);
      }
    },
		accessToken: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true,
      set(value) {
        value = value.trim();
        this.setDataValue('accessToken', value);
      }
    },
		password: {
      type: DataTypes.STRING,
      allowNull: true,
      set(value) {
        if(value === null) return;
        if(value === '') 
          throw new Http400Error("Password Required");
        
        const hmac = crypto.createHmac('sha256', cryptoSecret);
        hmac.update(value);
        value = hmac.digest('hex');

        this.setDataValue('password', value);
      }
    }
	});

  user['isUsernameExist'] = async username => {
    let result = await user.findAll({where: {username}});
    return result.length > 0;
  };

  user['isEmailExist'] = async email => {
    let result = await user.findAll({where: {email}});
    return result.length > 0;
  };

	// NOTE: Comment later when not in use. 
	//let u = user.create({name: "Ramesh Sharma", email: "rameshsharma@example.com"});


  // NOTE: Comment later when not in use.
	//user.sync({force: true});

	return user;
};
