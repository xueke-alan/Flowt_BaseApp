const devAppName = 'quote';
const port = 5173;

export const devApp = {
  [devAppName]: {
    entry: `http://localhost:${port}/${devAppName}`,
    config: `http://localhost:${port}/${devAppName}/qiankun.config.json`,
  },
};