
![Alt text](app.png?raw=true "Sykkel utleie")

# ProsjektOppgave IINI1010 og IFUD1110 Objektorientert programmering med systemarbeid (2018 VÅR):


# Technologies:
1. .Net core
2. Angular
3. Electron
4. Mysql

# Dependencies:
1. .Net sdk
2. Angular
3. Npm
4. Node
5. Mysql

# Setup
```shell
    git clone https://github.com/seel93/prosjektOppgaveGruppe2.git
```
Setup for UI:

```shell
    cd prosjektOppgaveGruppe2/UI
```
If you dont have Angular CLI installed you can find it [here](https://angular.io/):

```shell
    npm install
```

Setup for Api:
```shell
    cd prosjektOppgaveGruppe2/api
```
If you don't have .net core sdk installed, you can find it [here](https://www.microsoft.com/net/download/):

```shell
    dotnet build
```
If you dont have mysql on your machine you can find i [here](https://dev.mysql.com/downloads/)

Setup for Database: 
```shell
    mysql -u <your-username> -p < setup_init.sql
```
The password should be: "password123" which is the password we have set in appsettings.json

#Running the App: 
UI:

```shell
    ng build 
```
```shell
    npm run electron
```

Api: 

```shell
    dotnet run
```

#Creating a runnable file for the electron App:

```shell
    ng build 
```
```shell
    npm run package
```
There should appear a folder containing all the files for the app including a .exe or similar file for other plattforms
