const cookie = require("cookie");
const jwt = require("jsonwebtoken");

exports.handler = function (event, context, callback) {
    const { headers } = event;
    const cookieHeader = headers.cookie || "";
    const cookies = cookie.parse(cookieHeader);

    let decodedToken, roles, message, originalToken;
    try {
        originalToken = cookies.usertoken;
        decodedToken = jwt.decode(cookies.usertoken, { complete: true });
        // roles =
        //     decodedToken !== null
        //         ? decodedToken.payload.app_metadata.authorization.roles
        //         : [];
    } catch (e) {
        console.log(e);
    }
    callback(null, {
        statusCode: 200,
        body: JSON.stringify({ originalToken, decodedToken, message })
    });
};