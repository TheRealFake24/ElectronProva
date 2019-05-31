/*
//handle setupevents as quickly as possible
const setupEvents = require('./installers/setupEvents')
if (setupEvents.handleSquirrelEvent()) {
   // squirrel event handled and app will exit in 1000ms, so don't do anything else
   return;
}
*/

if (require('electron-squirrel-startup')) return;
if (handleSquirrelEvent()) {
  // squirrel event handled and app will exit in 1000ms, so don't do anything else
  return;
}
function handleSquirrelEvent() {
  if (process.argv.length === 1) {
    return false;
  }
  const ChildProcess = require('child_process');
  const path = require('path');

  const appFolder = path.resolve(process.execPath, '..');
  const rootAtomFolder = path.resolve(appFolder, '..');
  const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
  const exeName = path.basename(process.execPath);

  const spawn = function(command, args) {
    let spawnedProcess, error;

    try {
      spawnedProcess = ChildProcess.spawn(command, args, {detached: true});
    } catch (error) {}

    return spawnedProcess;
  };

  const spawnUpdate = function(args) {
    return spawn(updateDotExe, args);
  };

  const squirrelEvent = process.argv[1];
  switch (squirrelEvent) {
    case '--squirrel-install':
    case '--squirrel-updated':
      // Optionally do things such as:
      // - Add your .exe to the PATH
      // - Write to the registry for things like file associations and
      //   explorer context menus

      // Install desktop and start menu shortcuts
      spawnUpdate(['--createShortcut', exeName]);

      setTimeout(app.quit, 1000);
      return true;

    case '--squirrel-uninstall':
      // Undo anything you did in the --squirrel-install and
      // --squirrel-updated handlers

      // Remove desktop and start menu shortcuts
      spawnUpdate(['--removeShortcut', exeName]);

      setTimeout(app.quit, 1000);
      return true;

    case '--squirrel-obsolete':
      // This is called on the outgoing version of your app before
      // we update to the new version - it's the opposite of
      // --squirrel-updated

      app.quit();
      return true;
  }
};

const { app, BrowserWindow,ipcMain,dialog,Notification,autoUpdater } = require('electron')
const url=require('url');
const path=require('path');

//const {autoUpdater} = require("electron-updater");
app.on('ready', function()  {
  //const server = "https://hazel.glfichera91.now.sh"
  //const feed = `${server}/update/${process.platform}/${app.getVersion()}`
  //const server=`https://github.com/TheRealFake24/ElectronProva/releases/tag/v${app.getVersion()}`;
  const server="https://electronprova.s3-eu-west-1.amazonaws.com/ReleaseElectron/"
  autoUpdater.setFeedURL(server)
});

autoUpdater.on('update-downloaded', info => {
  // Wait 5 seconds, then quit and install
  // In your application, you don't need to wait 500 ms.
  // You could call autoUpdater.quitAndInstall(); immediately
  autoUpdater.quitAndInstall();
});
autoUpdater.on('checking-for-update', () => {
  
});
autoUpdater.on('update-available', info => {
  dialog.showMessageBox({
    type: 'info',
    buttons: ['Ok', 'Cancel'],
    defaultId: 0,
    cancelId: 1,
    title: 'Update',
    message: 'Aggiornamento disponibile. Il download avverrà a breve',
    detail: 'Message detail'
    })
});
autoUpdater.on('update-not-available', info => {
  /*
  dialog.showMessageBox({
    type: 'info',
    buttons: ['Save', 'Cancel', 'Don\'t Save'],
    defaultId: 0,
    cancelId: 1,
    title: 'Update',
    message: 'Update not available',
    detail: 'Message detail'
    })
    */
});

/*
//-------Update

const server = "https://hazel.glfichera91.now.sh"
const feed = `${server}/update/${process.platform}/${app.getVersion()}`
autoUpdater.setFeedURL(feed)

setInterval(() => {
  autoUpdater.checkForUpdates()
}, 50000)
*/







/*
require('electron-reload')(__dirname, {
  electron: path.join(__dirname, `/dist/angular-electron/index.html`),
  hardResetMethod: 'exit'
});
*/

let win;
let winHome;

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 450,
    height: 700,
    backgroundColor: '#ffffff',
    show: false,
    //frame:false,
    resizable:false
  })
  //win.setMenu(null);
  
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, `/dist/angular-electron/index.html`),
      protocol: 'file:',
      slashes: true,
    })

    
  )
  
  //win.loadURL(`http://localhost:4200/index.html`);

  win.once('ready-to-show', () => {
    win.show();
  })
  win.once('show', () => {
    
    autoUpdater.checkForUpdates();

    if(winHome!=null)
       winHome.close();
  })
  win.on('closed', function () {
    win = null
  })
}

function createWindowHome() {
  winHome = new BrowserWindow({
    width: 800,
    height: 800,
    backgroundColor: '#ffffff',
    show: false,
  })
  winHome.loadURL(
    url.format({
      pathname: path.join(__dirname, `/dist/angular-electron/index.html`),
      protocol: 'file:',
      slashes: true,
      hash: '/home'
    })
  )
  winHome.once('ready-to-show', () => {
    winHome.show();
  })
  winHome.once('show', () => {
    win.close();
  })
  winHome.on('closed', function () {
    winHome = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (win === null) {
    createWindow()
  }
})

ipcMain.on('apriDialog',()=>{
    dialog.showMessageBox({
        type: 'info',
        buttons: ['Save', 'Cancel', 'Don\'t Save'],
        defaultId: 0,
        cancelId: 1,
        title: 'Save Score',
        message: 'Backup your score file?',
        detail: 'Message detail'
        })
});

ipcMain.on('err401',()=>{
  dialog.showMessageBox({
    type: 'error',
    buttons: [],
    title: 'Errore',
    message: 'Unauthorized',
    detail: 'Non si dispone dei permessi necessari per accedere alla risorsa'
    })
})

ipcMain.on('errorLogin', () => {
  dialog.showMessageBox({
    type: 'error',
    buttons: [],
    title: 'Errore',
    message: 'Access Denied',
    detail: 'Username o password errati !'
  })
})

ipcMain.on('errorRegister', () => {
  dialog.showMessageBox({
    type: 'error',
    buttons: [],
    title: 'Errore',
    message: 'Register Error',
    detail: 'Errore in fase di registrazione!'
  })
})

ipcMain.on('apriPaginaHome',createWindowHome);

ipcMain.on('logout',createWindow);

ipcMain.on('notifica',()=>{//per funzionare l'app deve essere installata o almeno così pare
  const option={
    title:'La mia notifica',
    body:'Ciao'
  };
  let notifica=new Notification(option);
  notifica.show();
});