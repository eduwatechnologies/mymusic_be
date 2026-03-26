import 'dotenv/config';

import { connectDb } from './db.js';
import { createApp } from './app.js';

const port = Number(process.env.PORT ?? 4000);
const app = createApp();

async function start() {
  await connectDb();

  app.listen(port, () => {
    process.stdout.write(`Backend listening on http://localhost:${port}\n`);
  });
}

start().catch((err) => {
  process.stderr.write(`${err instanceof Error ? err.stack ?? err.message : String(err)}\n`);
  process.exit(1);
});
