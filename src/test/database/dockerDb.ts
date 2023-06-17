import * as mongoDB from "mongodb";

import { exec } from "child_process";

export async function runMongoDBDockerImage(): Promise<string> {
  await new Promise<void>((resolve, reject) => {
    console.log("downloading mongo image");
    exec("docker-compose create mongo_db", (error, stdout, stderr) => {
      console.log(stdout);
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
  await new Promise<void>((resolve, reject) => {
    console.log("starting mongo image");
    exec("docker-compose start mongo_db ", (error, stdout, stderr) => {
      console.log(stdout);
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });

  // Execute 'docker inspect' command to retrieve the container IP
  return new Promise<string>((resolve, reject) => {
    exec(
      'docker inspect -f "{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}" $(docker-compose ps -q mongo_db)',
      (error, stdout, stderr) => {
        if (error) {
          reject(error);
        } else {
          const containerIPAddress = stdout.trim();
          const connectionString = `mongodb://${containerIPAddress}:27017`;
          console.log("the connection string is: ", connectionString);
          resolve(connectionString);
        }
      }
    );
  });
}
