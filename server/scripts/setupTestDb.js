const fs = require('fs');
const path = require('path');
const { MongoMemoryServer } = require('mongodb-memory-server');

const run = async () => {
  const mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  const targetDir = path.join(__dirname, '..', 'tmp');
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, 'test-db-uri.txt'), uri, 'utf8');
  // eslint-disable-next-line no-console
  console.log(`Test database ready at ${uri}`);
  await mongo.stop();
};

run().catch((error) => {
  // eslint-disable-next-line no-console
  console.error('Failed to prepare test database', error);
  process.exit(1);
});

