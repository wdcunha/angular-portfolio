# Angular Portfolio

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.4 and it was created following the tutorial from the ebook Practical Angular: Build your first web apps with Angular.

Firebase project was created in the website to be used for authentication purpose. It is just done in [Firebase console](https://console.firebase.google.com/).

AngularFire is needed to be installed because it is the Firebase SDK: `ng add @angular/fire`.

An important detail is about firebase config that contains access data for the project in the Firebase, that's why these data was added to a separate file inside [environment folder](src/environments/firebaseConfig.ts), but it is needed to pay attention for the fact that it is not present in the GitHub repo, because it is being ignored by the gitignore, so if it is necessary to use in another project, it has to be done manually.

            export const environment = {
               production: false,
               firebaseConfig: {
                 apiKey: "YOUR_API_KEY",
                 authDomain: "YOUR_AUTH_DOMAIN",
                 databaseURL: "YOUR_DATABASE_URL",
                 projectId: "YOUR_PROJECT_ID",
                 storageBucket: "YOUR_STORAGE_BUCKET",
                 messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
               }
             };

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
