const {user} = require('../models');
const {Http401Error} = require('./http-error');

const theModule = {};

theModule['authenticate'] = async headers => {
  let accessToken = headers.authorization.split(' ')[1];
  let theUser = await user.findOne({where: {
    accessToken
  }});

  if(theUser === null)
    throw new Http401Error("Unauthorized");
  
  return theUser;
}

module.exports = theModule;
