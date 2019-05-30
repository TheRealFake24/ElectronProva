/*
//handle setupevents as quickly as possible
const setupEvents = require('./installers/setupEvents')
if (setupEvents.handleSquirrelEvent()) {
   // squirrel event handled and app will exit in 1000ms, so don't do anything else
   return;
}
*/


const { app, BrowserWindow,ipcMain,dialog,Notification } = require('electron')
const url=require('url');
const path=require('path');

const {autoUpdater} = require("electron-updater");
app.on('ready', function()  {
  autoUpdater.checkForUpdatesAndNotify();
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