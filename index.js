const grpc = require("grpc");
const uuidv1 = require("uuid/v1");
const notesProto = grpc.load("notes.proto");
const notes = [
  { id: "1", title: "Note 1", content: "Content 1" },
  { id: "2", title: "Note 2", content: "Content 2" }
];

const server = new grpc.Server();

server.addService(notesProto.NoteService.service, {
  List: (_, callback) => {
    callback(null, notes);
  },
  Insert: (call, callback) => {
    let note = call.request;
    note.id = uuidv1();
    notes.push(note);
    callback(null, note);
  }
});

server.bind("127.0.0.1:50051", grpc.ServerCredentials.createInsecure());
console.log("Server running at localhost:50051");
server.start();
