import * as path from "path";
import { app, BrowserWindow, ipcMain } from "electron";
import { RobotHunt, OptionsT, ItemT } from "./robot_hunt";
import { shell } from "electron";

const robotHunt = new RobotHunt();
let mainWindow: Electron.BrowserWindow | null;
app.allowRendererProcessReuse = true;

const W = 700;
const H = 600;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: W,
    height: H,
    minWidth: W,
    minHeight: H,
    maxWidth: W,
    maxHeight: H,
    title: "狩猎大战辅助工具",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadURL("http://localhost:3000/");

  mainWindow.webContents.openDevTools();

  mainWindow.webContents.on("did-finish-load", () => {
    const list: Array<ItemT> = [
      "DN_INSTALL_DIR",
      "JJC_ICON_LOCATION",
      "HUNT_MATCH_LOCATION",
      "HUNT_START_LOCATION",
      "HUNT_SURRENDDER_LOCATION",
      "HUNT_STOP_LOCATION",
    ];
    // 导航完成时触发
    mainWindow?.webContents.send("hunt-init", list);
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on("hunt-start", (event, options: OptionsT) => {
  robotHunt.send = (text) => {
    mainWindow?.webContents.send("hunt-logs", text);
  };
  robotHunt.changeOptions(options);
  robotHunt.start();
});

ipcMain.on("hunt-end", (event) => {
  robotHunt.stop();
});

ipcMain.on("open-url", (event, url) => {
  shell.openExternal(url);
});
