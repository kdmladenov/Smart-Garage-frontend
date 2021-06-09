# SMART GARAGE APPLICATION


**SMART GARAGE APP** is the final project for Telerik Academy - Alpha JavaScript Track (A27) - by Delyana Yordanova and Krasimir Mladenov. 

## 1. Project Description
**SMART GARAGE APP** is a Full Stack Single Page Application that enables the owners of an auto repair shop to manage their day-to-day job.
Employees of the auto repair shop can browse and manage (create, update and delete) vehicles, customers, services, spare parts, shop visits, view detailed repair reports.
Customers are able to view, filter and sort visit history via a timeline. They are also able to download detailed report  for a visit as a PDF file.
Implemented authentication, as well as forgotten password option.


## 2. Technologies & Tools Used

### Front-end
  - React
  - MDBootstrap
### Back-end
  - Node.js
  - Express.js
  - JWT
  - MariaDB
  - TypeScript (Back-end)
  - MySQL Workbench


## 3. Server (Back-end) npm packages setup
The main server application git folder is located here https://gitlab.com/DelyanaYo/smart-garage-server.git
In order to run the application you will need to set it up. You will be working in the `smart-garage-server` folder. This will be designated as the **root** folder, where `package.json` is placed.

You need to install all the packages in the root folder: `npm i`.

The project can be run in two ways:

- `npm start` - will run the current version of the code and will **not** reflect any changes done to the code until this command is executed again
- `npm run dev` - will run the code in *development* mode, meaning every change done to the code will trigger the program to restart and reflect the changes made

<br>


## 4. Setup MySQL Workbench

We will be using **MySQL Workbench** for storing the data. If you don't have it installed, please do so. You can use the following link **[MySQL Workbench](https://www.mysql.com/products/workbench/)**.

We have provided you with the database which you can import in your MySQL Workbench - please use `smart_garage.sql` for the import. 

After you connect to the database `"smart_garage"` and examine the major tables, you can use the database for all tasks.

## 5. Dotenv

You will be using dotenv to help manage your environment variables. The **.env** file is stored in your .gitignore file.
You will have to create it in the **root** folder, where `package.json` is placed, as a separate file. 

You can use the following content for your **.env** file. Keep in mind that you might need to replace `USER` and `PASSWORD` with the ones you have set in your `MySQL Workbench`. Also make sure that `DATABASE` name corresponds to the one with the data you will be using to run the application.

```
PORT=5555
HOST=triton.rdb.superhosting.bg
DBPORT=3306
USER=fwraptea_didi
PASSWORD=Parola12345678
DATABASE=fwraptea_didi
LIMIT=2
PRIVATE_KEY=sekreten_chasten_klu4
TOKEN_LIFETIME=3600
EMAIL_SERVICE=hotmail
EMAIL_USER=smartgaragekd@outlook.com
EMAIL_PASSWORD=BestSuperSekretenklu4
```

<br>


## 6. Implemented Endpoints with corresponding functionalities

### **Public part** - accessible without authentication:

- `/auth/login` - POST - User Login
- `/auth/logout` - DELETE - User Logout
- `/users` - POST - User Registration
- `/users` - POST - User Registration


### **Private part** - accessible for registered users only:

-`/users?[query]` - GET - GET all customers filtered by multiple criteria
-`/users` - POST - Register new customer
-`/users/:userId` - DELETE - Delete a customer
-`/users/:userId` - GET - Get a single customer by userId
-`/users/:userId` - PUT - Update customer by userId
-`/users/:userId/change-password` - PATCH - Update password
-`/users/forgotten-password` - POST Request a password reset link
-`/users/reset-password/:userId/:token` - POST Reset password

- `/vehicles?[query]` - GET - Get all vehicles filtered by multiple criteria
- `/vehicles` - POST - Register new vehicle
- `/vehicles/:vehicleId` - GET - Get a single vehicle by vehicleId
- `/vehicles/:vehicleId` - PUT - Update vehicle by vehicleId

-`/visits?[query]` - GET - Get all visits, filtered by multiple criteria
- `/visits` - POST - Register new visit
- `/visits/visitId` - GET - Get a single visit by visitId
- `/visits/visitId` - PUT - Update a visit by visitId

- `/services?[query]` - GET - Get all services filtered by multiple criteria
- `/services` POST - Create new service
- `/services/:serviceId` GET - Get a single service by serviceId
- `/services/:serviceId` PUT - Update a service by serviceId
- `/services/:serviceId` DELETE - Delete a service by serviceId
  
- `/parts?[query]` - GET - Get all parts filtered by multiple criteria
- `/parts` POST - Create new part
- `/parts/:partId` GET - Get a single part by partId
- `/parts/:partId` PUT - Update a part by partId
- `/parts/:partId` DELETE - Delete a part by partId

- `/models` - GET - Get all models registered in the database


<br>

## 7. Front-end (client side) npm packages setup

The main application front-end git folder is located here https://gitlab.com/DelyanaYo/smart-garage-app.git
In order to run the front-ebd of the application you will need to set it up. You will be working in the `smart-garage-app` folder. This will be designated as the **root** folder, where `package.json` is placed.

You need to install all the packages in the root folder: `npm i`.

To run the front-end in the project directory, you can run: 
### `npm start`

Thee app will be run in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
<br>

## 10. Front-end project structure

The main part of the client-side code is in `library/src`.

- `common` - contains all constants and enums 
- `components` - contains all the components of the project
- `containers` - contains all the main book and user containers of the project
- `hooks` - contains some custom hooks
- `providers` - context provider which state to be shared across components
- `App.js` - navigates to the components
- `index.js` - the entry point of the project

<br>