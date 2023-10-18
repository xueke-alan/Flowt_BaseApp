const devAppName = 'fileLibrary';
const port = 5173;

let devApp = {}

if (devAppName) {
  devApp = {
    [devAppName]: {
      entry: `http://localhost:${port}/${devAppName}`,
      config: `http://localhost:${port}/${devAppName}/micoApp.config.json`,
    },
  };
}

export { devApp } 
