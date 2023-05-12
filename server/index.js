import http from "http";
import { expressServer } from "./server.js";

console.log(`${process.env.PORT}`)

// (() => {
//     const server = http.createServer(expressServer());

//     server.listen(process.env.PORT, () => {
//         console.log(`Listening on port ${process.env.PORT}`);
//     })
// }) ();
