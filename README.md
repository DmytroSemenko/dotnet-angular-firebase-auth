# .NET Angular Firebas Authentication Simple Example
## Stack
- .NET
- Angular
- Firebase

## Features
- Sign In (Sign Up) with Email and Password
- Sign In with Google (and other services if you will configure)
- Sign Out
- Delete account
- Call secured API endpoint

## Installation

Clone repository.

Restore all npm packages. Run in client folder.
```sh
npm install
```
Create Firebase Account and Web App Client and replace placeholders in two files.
- client/src/environments/environment.ts
- Server/Server.API/appsettings.json

Run .NET backend on using Visual Studio or command
```sh
dotnet run
```
in Server/Server.API folder.

And run Angular frontend in client folder using command
```sh
ng serve -o
```
Enjoy✨