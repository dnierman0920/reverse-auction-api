import { connectToDatabase } from "./services/database.service";
import createServer from "./server";

var app = createServer();

function startServer() {
  const app = createServer();
  const port: number = parseInt(<string>process.env.PORT, 10) || 3000;
  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
  });
}

connectToDatabase()
  .then(() => {
    startServer();
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
  });
