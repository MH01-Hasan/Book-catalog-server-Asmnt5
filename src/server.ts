import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config';

let server: Server;

process.on('uncaughtException', error => {
  console.log(error);
  process.exit(1);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM is received.');
  if (server) {
    server.close();
  }
});

async function connect() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log('Database Connected successfully!!!');

    server = app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  } catch (error) {
    console.log('Database Connection failure!!!', error);
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        console.log(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

connect();
