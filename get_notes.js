const client = require("./client");

client.List({}, (error, notes) => {
  if (!error) {
    console.log("successfully fetch list notes");
    console.log(notes);
  } else {
    console.error(error);
  }
});
