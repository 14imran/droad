const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://imran:abc12345678@cluster0.fhlcu.mongodb.net/droad?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });
