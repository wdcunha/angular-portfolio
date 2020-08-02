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

There is a difference from the code when the ebook was written, so now there's no auth in the call: `await this.afAuth.auth.signInWithEmailAndPassword(email, password)`, neither in other call like signout, then just removing auth is enough for it works.

[Login page](src/app/admin/login/login.component.html) received some lines using boostrap to draw fancy but simple fields as shown below and it is using images from the website https://placeimg.com/128/128/nature that changes randomly:

![login layout](src/assets/images/login_page_fields.jpg)  

## Router Guards

The tutorial implemented with Router Guards in order to secure the app routers and the [admin guard component](src/app/admin/admin.guard.ts). The canActivate() method will return true if the user is logged in or false otherwise. To determine if the guard needs to allow or disallow access to certain routes it uses the arguments below:

1. next: ActivatedRouteSnapshot - the next route that will be activated if the guard is allowing access;
2. state: RouterStateSnapshot - the next router state if the guard is allowing access.

It is used in routes module, so the [admin routing module](src/app/admin/admin-routing.module.ts) was added with `canActivate: [AdminGuard]` in each line of the routes constant which we want to protect. The ProjectListComponent, ProjectCreateComponent and ProjectUpdateComponent components of the admin module from non logged in users. The canActivate property of the path object takes an array which means it can register multiple guards. A detail here is that the default form of the canActivate method is to return true, so it is neeeded to add a if statement to check the is logged in using the method created at the [auth service](src/app/auth/auth.service.ts): `this.authService.isLoggedIn`.

Route Guards return an UrlTree variable which provides the new router state (route) that should be activated, as well a boolean (`Promisse<boolean>` or `Observable<boolean>`). UrlTree is a data structure that represents a parsed URL. 



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
