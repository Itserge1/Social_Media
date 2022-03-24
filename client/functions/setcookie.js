const jwt = require("jsonwebtoken");
const cookie = require('cookie')
const axios = require("axios");

exports.handler = async function (event, context, callback) {
    console.log({ message: "event from set-cookies", event: event })
    const parsedBody = await JSON.parse(event.body);

    const twoWeeks = 14 * 24 * 3600000

    const netlifyCookie = cookie.serialize("usertoken", parsedBody, {
        secure: true,
        path: "/",
        maxAge: twoWeeks
    });

    callback(null, {
        statusCode: 200,
        headers: {
            "Set-Cookie": netlifyCookie,
            "Cache-Control": "no-cache"
        },
        body: JSON.stringify({ parsedBody })
    });
};