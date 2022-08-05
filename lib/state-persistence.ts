import { State } from 'ldes-consumer';
import fs from 'fs';
import path from 'path';
import { DATA_FOLDER } from '../config';
export async function fetchState(): Promise<State | undefined> {
  try {
    const data = fs.readFileSync(path.join(DATA_FOLDER, 'state.json'), 'utf-8');
    const parsed = JSON.parse(data, (key, value) => {
      if (key === 'timestamp') return new Date(value);
      else {
        return value;
      }
    });
    return parsed;
  } catch (e) {
    return;
  }
}

export async function saveState(state: State): Promise<void> {
  return fs.writeFileSync(
    path.join(DATA_FOLDER, 'state.json'),
    JSON.stringify(state)
  );
}
