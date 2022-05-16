const http = require("http");

const port = process.env.port || 5000; // env var
dotenv.config();

const app = express();
