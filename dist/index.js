"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = __importDefault(require("./classes/server"));
var mongoose_1 = __importDefault(require("mongoose"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var express_fileupload_1 = __importDefault(require("express-fileupload"));
var usuario_1 = __importDefault(require("./routes/usuario"));
var post_1 = __importDefault(require("./routes/post"));
var server = new server_1.default();
//Body parser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
// FileUpload
server.app.use(express_fileupload_1.default({ useTempFiles: true }));
//Configurar CORS
server.app.use(cors_1.default({ origin: true, credentials: true }));
//Rutas de mi app
server.app.use('/user', usuario_1.default);
server.app.use('/posts', post_1.default);
//Conectar DB
mongoose_1.default.connect('mongodb://localhost:27017/fotosgram', { useNewUrlParser: true, useCreateIndex: true }, function (err) {
    if (err)
        throw err;
    console.log('Base de datos ONLINE');
});
//Levantar express
server.start(function () {
    console.log("Servidor corriendo en puerto " + server.port);
});
