import fs from 'fs';
import path from 'path';
import settings from './settings';

const { API_ENTRY_POINT, BASE_DIR, COMPONENT_DIR } = settings;

const isRoute = (file) => file.toLowerCase().endsWith('.route.js');
function loadApi(dirPath, app) {
  fs.readdir(BASE_DIR + dirPath, (err, files) => {
    for (const file of files) {
      const filePath = path.join(__dirname, `${dirPath + file}`);
      if (fs.statSync(filePath).isDirectory()) {
        loadApi(`${dirPath + file}/`, app);
      } else if (isRoute(file)) {
        const filename = dirPath + path.basename(file);
        const route = require(`./${filename}`);
        app.use(`${API_ENTRY_POINT}/${route.autoPath}`, route.default);
      }
    }
  });
}

export default function customAPI(app) {
  loadApi(COMPONENT_DIR, app);
}
