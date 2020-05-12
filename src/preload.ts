import { ipcRenderer } from "electron";

window.robotHunt = {
  start: function (options) {
    try {
      const config = JSON.parse(options);
      ipcRenderer.send("hunt-start", config);
    } catch (err) {
      alert("aaaa");
    }
  },
  end: function () {
    ipcRenderer.send("hunt-end");
  },
};

ipcRenderer.on("hunt-init", (event, list) => {
  if (window.robotHunt.init) {
    window.robotHunt.init(list);
  }
});

ipcRenderer.on("hunt-logs", (event, text) => {
  if (window.robotHunt.logs) {
    window.robotHunt.logs(text);
  }
});

declare global {
  interface Window {
    robotHunt: IRobotHunt;
  }
}
type IRobotHunt = {
  readonly start: (optinos: string) => void;
  readonly end: () => void;
  logs?: (text: string) => void;
  init?: (config: string) => void;
};
