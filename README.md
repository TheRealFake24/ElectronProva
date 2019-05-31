# ElectronProva
Per creare un exe della nostra applicazione che sia direttamente eseguibile senza installazione
ho aggiunto "electron-packager" come dipendenza e ho eseguito il seguente script:

"package-win": "electron-packager . angularelectron --overwrite --asar=true --platform=win32 --arch=ia32  --prune=true --out=release-builds --version-string.CompanyName=CE --version-string.FileDescription=CE --version-string.ProductName=\"ElectronProva\"",

dove 'angularelectron' è il nome dell'app e 'ElectronProva' è il productName. Entrambe queste
informazioni si trovano nel package.json.

Per creare un pacchetto di installazione ho aggiunto come dipendenza il package:
'electron-installer-windows' ed eseguito il seguente script:

"setup": "electron-installer-windows --src release-builds/angularelectron-win32-ia32/ --dest release-builds/installers/""

dove 'release-builds/angularelectron-win32-ia32/' è la directory in cui si trova il pacchetto creato con lo step precedente,mentre 'release-builds/installers/' rappresenta la cartella di destinazione del pacchetto di installazione. Per evitare errori occorre che nel package.json venga aggiunto anche
l'autore,la descrizione, e si espliciti il fatto che non si vuole creare un file .msi nel seguente modo:
"noMsi":true.

Un altro modo per creare l'installer è stato utilizzare il package electron-winstaller che con l'ausilio
di Squirrel permette di creare anche l'icona dell'eseguibuile sul desktop. Questo è il metodo che ho utilizzato.

Per eseguire gli update è necessario aver compiuto i due step precedenti.
Esistono diversi modi per eseguire gli update. Il modo più semplice è di creare la build dell'app,
pacchettizare l' app,creare il pacchetto di installazione e poi eseguire l'upload dei file che vengono fuori
su un sito che può conservarli come github o Amazon S3. Io li ho messi su S3.
Quello che resta da fare è utilizzare il modulo già presente in electron che si chiama autoUpdater.
Con autoUpdater.checkUpdates() eseguiamo la ricerca di eventuali update. Prima però bisogna settare l'url su cui
l'autoUpdater deve eseguire la ricerca.Lo facciamo con autoUpdater.setFeedUrl('url').
AutoUpdater fornisce anche diversi eventi consultabili nella documentazione ufficiale grazie ai quali
è possibile vedere se ci sono aggiornamenti,se il dowaload di questi è stato completato ecc..
Grazie poi a Squirell è possibile settare l'icona sul desktop e sulla taskbar.

Per eseguire il packaging e la creazione dell'installer fare riferimento alla guida di Chris Engvall.
In questa guida viene creato un file .js in cui si tiene conto degli eventi squirell. Io non lo considero e
gestisco tutto nel main.js .
