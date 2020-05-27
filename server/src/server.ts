import { PORT } from './config';
//  import './redis';
import createApp from './app';
import { logger } from './shared/logger';

(async () => {
  try {
    const { server } = createApp();

    server.listen(PORT, () => {
      logger.info(`Server Started on Port : ${PORT}`);
    });
  } catch (err) {
    logger.error(err);
  }
})();
