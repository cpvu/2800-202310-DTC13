import http from "http";
import { expressServer } from "./server.js";

(() => {
    const server = http.createServer(expressServer());

    server.listen(5000, () => {
        console.log(`Listening on port 5000`)
    })
}) ();