# SmartGarage

This is the final project for Telerik Academy - Alpha JavaScript Track (A27) - by  Krasimir Mladenov and Delyana Yordanova. 

SmartGarage is a Full-stack web application designed to streamline the day-to-day operations of auto repair shop owners. It provides a comprehensive set of features that enable efficient management of cars, services, customers, and service history.

## Table of Contents
- [SmartGarage](#smartgarage)
  - [Table of Contents](#table-of-contents)
  - [Project Description](#project-description)
    - [Cars and Services Management](#cars-and-services-management)
    - [Customer Management](#customer-management)
    - [Service History and Reporting](#service-history-and-reporting)
    - [New Customer Profile Generation](#new-customer-profile-generation)
  - [Technologies Used](#technologies-used)
  - [Installation](#installation)
  - [Usage](#usage)
  - [License](#license)
  - [Images](#images)
      - [Customers List](#customers-list)
      - [Customers - Edit Profile](#customers---edit-profile)
      - [Customers - Add Car](#customers---add-car)
      - [Customers - Car List](#customers---car-list)
      - [Create Car Repair Visit](#create-car-repair-visit)
      - [Created Car Repair Visit](#created-car-repair-visit)
      - [Created New Customer](#created-new-customer)
      - [All Cars List](#all-cars-list)
      - [All Repair Services List](#all-repair-services-list)
      - [All Car Parts List](#all-car-parts-list)
      - [Admin User Profile](#admin-user-profile)
      - [PDF Invoice - Car Repair Visit](#pdf-invoice---car-repair-visit)
      - [Forgotten password functionality](#forgotten-password-functionality)
      - [Mobile view - User Profile](#mobile-view---user-profile)
      - [Mobile view - Cars List](#mobile-view---cars-list)
      - [Mobile view - View/Edit Car Details](#mobile-view---viewedit-car-details)

## Project Description

The goal of this project is to develop a web application that empowers auto repair shop owners to effectively manage their daily tasks. The application must include the following key functionalities:

### Cars and Services Management

- Maintain a list of cars, including details such as manufacturer and model.
- Manage a comprehensive list of available services, specifying service names, descriptions, and corresponding prices.
- Enable easy association of specific cars with customers.
- Capture essential identification details for each car, including registration plate and vehicle identification number.

### Customer Management

- Maintain a centralized list of customers, including their contact information such as name, phone number, and email address.
- Facilitate seamless linkage of customers with their respective cars.
- Ensure customer profiles are easily accessible and editable via the web user interface.

### Service History and Reporting

- Keep a detailed history of all services performed on customers' cars.
- Provide the ability to generate a comprehensive report for a specific visit to the shop.
  - The report should include a breakdown of all services rendered during the visit, along with the corresponding total price.
  - The currency for the total price should be configurable, either based on the default currency or as per the preference of the employee or customer.
- Optional: Implement functionality to generate PDF reports that encompass all services performed on a specific car, along with the corresponding total price. The choice of currency should be customizable by the customer.

### New Customer Profile Generation

- Enable the generation of profiles for new customers by the system administrator.
- Automatically send login information, including the customer's email address as the username and a randomly generated password, to the customer via email.
- Ensure that all customers can access and manage their personal information conveniently through the web UI.

## Technologies Used

The SmartGarage web application will be developed using the following technologies:

- Front-end: React.js, JavaScript, HTML, CSS, Redux, Bootstrap, Material-UI
- Back-end: Node.js, Express.js, TypeScript, MariaDB/ MySQL
- Authentication: JSON Web Tokens (JWT)
- Additional Libraries and Tools:  React Router, Passport, Bcrypt, Nodemailer

## Installation

Back-end:

1. Clone the repository: `git clone https://github.com/kdmladenov/Smart-Garage-backend.git`
2. Install the necessary dependencies: `npm install`
3. Set up the database and configure the connection settings in the `.env` file.

Front-end:

1. Clone the repository: `git clone https://github.com/kdmladenov/Smart-Garage-frontend.git`
2. Install the necessary dependencies: `npm install`

## Usage

1. Start the backend API in the main folder : `npm run dev`
1. Start the development server in the frontend folder: `npm start`
1. Access the site in your browser at `http://localhost:3000`


## License

This project is a restricted personal project of Krasimir Mladenov and Delyana Yordanova. All rights reserved. Unauthorized copying, reproduction, or distribution of this repository, either in its entirety or any part of it, is strictly prohibited. Modification or commercial use of the source code or any associated materials without explicit permission from Krasimir Mladenov and Delyana Yordanova is not allowed.

Please note that this license only applies to the specific project owned by Krasimir Mladenov and Delyana Yordanova and may not be applicable to any other projects or repositories.


## Images

#### Customers List
![](/assets/images/1.png)


#### Customers - Edit Profile
![](/assets/images/2.png)


#### Customers - Add Car
![](/assets/images/3.png)


#### Customers - Car List
![](/assets/images/4.png)

#### Create Car Repair Visit
![](/assets/images/5.png)

#### Created Car Repair Visit
![](/assets/images/6.png)

#### Created New Customer
![](/assets/images/7.png)

#### All Cars List
![](/assets/images/8.png)

#### All Repair Services List
![](/assets/images/9.png)

#### All Car Parts List
![](/assets/images/10.png)

#### Admin User Profile
![](/assets/images/11.png)

#### PDF Invoice - Car Repair Visit
![](/assets/images/12.png)

#### Forgotten password functionality
![](/assets/images/13.png)

#### Mobile view - User Profile
![](/assets/images/14.png)

#### Mobile view - Cars List
![](/assets/images/15.png)

#### Mobile view - View/Edit Car Details
![](/assets/images/16.png)