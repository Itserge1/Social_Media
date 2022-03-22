const mongoose = require("mongoose");


mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
	useUnifiedTopology: true,
})
    .then(() => console.log("Established Connection Successfully!!!"))
    .catch(err => console.log("Connection Failed", err))

