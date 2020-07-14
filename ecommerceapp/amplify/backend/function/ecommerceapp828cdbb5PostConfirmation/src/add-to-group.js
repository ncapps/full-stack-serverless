const aws = require("aws-sdk");

exports.handler = async (event, context, callback) => {
  const cognitoProvider = new aws.CognitoIdentityServiceProvider({
    apiVersion: "2016-04-18",
  });

  let isAdmin = false;
  // update this array to include any admin emails you would like to enable
  const adminEmails = ["nickcapps10@gmail.com"];

  // if the user is one of the admins, set the isAdmin variable to true
  if (adminEmails.indexOf(event.request.userAttributes.email) !== -1) {
    isAdmin = true;
  }

  if (isAdmin) {
    const groupParams = {
      UserPoolId: event.userPoolId,
      GroupName: "Admin",
    };
    const userParams = {
      UserPoolId: event.userPoolId,
      Username: event.userName,
      GroupName: "Admin",
    };

    // first check to see if the groups exists, and if not create the group
    try {
      await cognitoProvider.getGroup(groupParams).promise();
    } catch (e) {
      await cognitoProvider.createGroup(groupParams).promise();
    }
    // the user is an administrator, place them in the Admin group
    try {
      await cognitoProvider.adminAddUserToGroup(userParams).promise();
      callback(null, event);
    } catch (e) {
      callback(e);
    }
  } else {
    // if the user is in neither group, proceed with no action
    callback(null, event);
  }
};
