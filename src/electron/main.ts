import { join } from "path";
import {
  app,
  Menu,
  BrowserWindow,
  globalShortcut,
  dialog,
  shell,
  ipcMain,
} from "electron";
import isDev from "electron-is-dev";
import { LOCAL_BASE_URL } from "./constants";

const handleError = (title: string, e: unknown) => {
  if (e instanceof Error) {
    dialog.showErrorBox(title, e.message);
  } else {
    dialog.showErrorBox("Unexpected error", e as any);
  }
};

let mainWindow: BrowserWindow | null = null;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      preload: join(__dirname, "preload.js"),
    },
  });

  const url = isDev ? LOCAL_BASE_URL : join(__dirname, "../out/index.html");

  if (isDev) {
    mainWindow.loadURL(url);
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(url);
  }

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });

  Menu.setApplicationMenu(null);

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
};

const registerGlobalShortcut = () => {
  globalShortcut.register("CommandOrControl+F5", () => {
    if (mainWindow && mainWindow.isFocused()) {
      console.log("Reload main window");
      mainWindow.reload();
    }
  });
  globalShortcut.register("CommandOrControl+F9", () => {
    if (!mainWindow) return;
    const wc = mainWindow.webContents;
    const isDevToolsOpen = wc.isDevToolsOpened();
    const isFocus = mainWindow.isFocused();
    const isDevToolsFocus = wc.isDevToolsFocused();
    if (isDevToolsOpen && (isFocus || isDevToolsFocus)) wc.closeDevTools();
    else if (!isDevToolsOpen && isFocus) wc.openDevTools();
  });
};

app
  .whenReady()
  .then(() => {
    if (isDev) {
      registerGlobalShortcut();
    }
  })
  .catch(e => {
    handleError("Failed to start app.", e);
    app.quit();
  });

app.on("ready", createWindow);

app.on("will-quit", () => {
  globalShortcut.unregisterAll();
});

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

ipcMain.handle("HELLO", () => {
  const options: Electron.MessageBoxOptions = {
    type: "info",
    title: "Hello",
    message: 'Hello',
  };
  dialog.showMessageBoxSync(options);
});
