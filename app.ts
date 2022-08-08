import { CronJob } from 'cron';
import { CRON_PATTERN, LDES_ENDPOINT_VIEW } from './config';
import Consumer, { Member } from 'ldes-consumer';
import { fetchState, saveState } from './lib/state-persistence';
import { processMember } from './lib/ipdc-client';

let taskIsRunning = false;

const consumerJob = new CronJob(CRON_PATTERN, async () => {
  try {
    if (taskIsRunning) {
      console.log('Another task is still running');
      return;
    }
    taskIsRunning = true;
    const initialState = await fetchState();
    const endpoint = LDES_ENDPOINT_VIEW;
    if (endpoint) {
      const consumer = new Consumer({
        endpoint,
        initialState,
      });
      consumer.listen(
        async (member, state) => {
          try {
            console.log(member.id);
            await processMember(member);
            await saveState(state);
          } catch (e) {
            console.error(e);
          }
        },
        () => (taskIsRunning = false)
      );
    } else {
      throw new Error('No endpoint provided');
    }
  } catch (e) {
    console.error(e);
  }
});

consumerJob.start();
