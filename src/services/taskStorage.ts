import { Platform } from 'react-native';

export type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
};

const TASKS_KEY = 'TASKS_V1';

let AsyncStorage: any = null;
if (Platform.OS !== 'web') {
  try {
    // require here to avoid bundling issues on web
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    // Use eval to prevent Metro from statically resolving this dependency during web bundling
    // eslint-disable-next-line no-eval
    // @ts-ignore
    AsyncStorage = eval("require('@react-native-async-storage/async-storage').default");
  } catch (err) {
    AsyncStorage = null;
  }
}

const webGet = async (): Promise<string | null> => {
  try {
    return Promise.resolve(window.localStorage.getItem(TASKS_KEY));
  } catch {
    return Promise.resolve(null);
  }
};

const webSet = async (value: string): Promise<void> => {
  try {
    window.localStorage.setItem(TASKS_KEY, value);
    return Promise.resolve();
  } catch {
    return Promise.resolve();
  }
};

export const getTasks = async (): Promise<Task[]> => {
  try {
    const raw = AsyncStorage ? await AsyncStorage.getItem(TASKS_KEY) : await webGet();
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Task[];
    return parsed;
  } catch (err) {
    // fallback to empty list on error
    // eslint-disable-next-line no-console
    console.warn('getTasks error', err);
    return [];
  }
};

export const saveTasks = async (tasks: Task[]): Promise<void> => {
  const payload = JSON.stringify(tasks);
  try {
    if (AsyncStorage) {
      await AsyncStorage.setItem(TASKS_KEY, payload);
    } else {
      await webSet(payload);
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('saveTasks error', err);
  }
};
