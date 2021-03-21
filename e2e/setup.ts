import { startServer, loadConfiguration } from 'snowpack';
const { NODE_ENV = 'development' } = process.env;

export default async function startDevServer() {
  const server = await startServer({
    lockfile: null,
    config: await loadConfiguration({}, './snowpack.config.js')
  });
  return server.shutdown
}