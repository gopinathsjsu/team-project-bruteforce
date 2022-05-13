# Hotel Management Application by Team Brute Force
[Link to Sprint Report](https://docs.google.com/spreadsheets/d/1N_YAxDElzVTV7xWyxAjk_7LDUGHTmtO2qs2-PweUnzY/edit#gid=1312521409)

[Link to Sprint Journal](https://docs.google.com/spreadsheets/d/1aMi2fXvU-WYp2BQTQM51rN9wIKzLv9uOepR2EarMBTo/edit#gid=1832506498)

[Deployed Application link](http://3.137.199.112:3000/)

## Team Members
Asha Yalla - (016006250) <br/>
Sandeep Reddy Kandi - (015324621) <br/>
Satyadivya Maddipudi - (016011775) <br/>
Sai Manasa Yadlapalli - (015999659) <br/>

## Scrum Meeting Days - Tuesday, Friday

## Technologies used
MongoDB Atlas for Database <br/>
ExpressJS and NodeJS: Backend <br/>
ReactJS: Frontend <br/>
Deployment AWS EC2 with load balancing 

## Tools
 Visual Studio Code, Git 
 
 ### XP Values <br/>
 - Communication <br/>
 - Respect <br/>
 - Simplicity <br/>
 - Courage <br/>
 - Feedback <br/>
Together, we followed the above XP values during entire course of Project.

## Use Case Diagram
![image](https://user-images.githubusercontent.com/87613567/167996483-33063050-fc60-4317-877a-6bbe8adaad02.png)

## Architecture Diagram
![image](https://user-images.githubusercontent.com/87613567/167996715-22244d2f-2fa2-47e9-abea-2192fd7280c2.png)

## Component Diagram
![image](https://user-images.githubusercontent.com/87613567/168157219-ee0d1839-b3d1-4766-b0c5-abe965f90b38.png)

## Deployment Diagram
![image](https://user-images.githubusercontent.com/87613567/168156493-cc4264da-f72d-496e-a31a-e98f7f78f968.png)


# Design Decisions:

### Database 
Why NoSQL?

- we picked NoSQL because of its own access languages to interpret data being saved, rather than using a relational model.
- It has developer-centric database, makes designing of databases and  access to application programming interfaces easier. 
- Developers need not be bothered by inner workings of databases before using them.
- NoSQL databases, gives the flexibility to work on what is required rather than forcing the schema on the database.

Why MongoDB ?

- Mongo db supports multiple hierarchy of data. 
- Allows flexibility in Datamodel because of the secondary indexes. 
- Mongo DB is schemaless and hence we not define the schema in the start. 


## Rest Over GraphQL
- Managing errors is easier using Rest as Graphql sends 200 OK code irrespective of the errors processed.
- GraphQL limits MongoDB's Flexible schema with its fixed schema. 

## Why MERN Stack
- Performance and UI rendering
When it comes to UI layer abstraction, React JS is the finest. Because React is merely a library, you may construct the application and organize the code anyway you wish. As a result, it outperforms Angular in terms of UI rendering and speed.

- Budget-Friendly
Because MERN Stack employs only one language throughout, Javascript, it will be advantageous for a corporation to recruit only Javascript experts rather than specialists for each technology. This decision will save both time and money.

- Free and Open Source
All of the technologies used in MERN are open-source. This feature enables a developer to obtain answers to issues that may arise during development from the accessible open sources.

## Hosting on Amazon EC2 with Load Balancer 
- Easy web scale computing : application can automatically scale itself up and down depending on its needs based on the web API's written
- RELIABLE: Amazon EC2 offers a highly reliable environment where replacement instances can be rapidly and predictably commissioned. 
- INEXPENSIVE Amazon EC2 passes on to you the financial benefits of Amazon’s scale. You pay a very low rate for the compute capacity you actually consume.
It technically free for student developers deploying smaller applications. 


# Feature Set
## Employee:
- can add available Room 
- can add Peak price season
- can view bookings
- can view users

## Customer:
- can login into the application
- can register themselves into the application
- can check available rooms for selected period of time
- can search for hotels in a particular location
- can add guest count
- can add amenities 
- can confirm booking
- can edit booking
- can cancel booking
- can select a checkin and checkout date


## Steps to run code on localhost
1) git clone https://github.com/gopinathsjsu/team-project-bruteforce.git
2) Install dependencies for both frontend and backend ```npm install```
3) Run backend - ```npm run start``` <br/>
   Run frontend - ```npm run start```


# Screens

Login Screen

<img width="1440" alt="image" src="https://user-images.githubusercontent.com/12370049/168184086-6d8a28ed-bf04-46ca-b4ed-1d19831520a2.png">

Register Screen

<img width="1429" alt="image" src="https://user-images.githubusercontent.com/12370049/168184195-bb6e4f9b-0d72-475f-9991-44d94ac00aec.png">

## Hotel Employee Screens

All boookings page

<img width="1431" alt="image" src="https://user-images.githubusercontent.com/12370049/168184759-c341c955-56a8-474c-a47c-726e98dc374d.png">

All Rooms Page

<img width="1440" alt="image" src="https://user-images.githubusercontent.com/12370049/168184878-222f5bc8-3174-4888-a41a-49580cf4f195.png">


Add Room Page

<img width="1437" alt="image" src="https://user-images.githubusercontent.com/12370049/168184953-d1c18c72-c2f8-4539-a57d-dc7a3edc4780.png">


Users Page

<img width="1437" alt="image" src="https://user-images.githubusercontent.com/12370049/168184977-af8a29e0-645a-45a5-9df3-e8ff8be4ff94.png">


Add Peak Price

<img width="1438" alt="image" src="https://user-images.githubusercontent.com/12370049/168184995-942c6773-4760-4ec9-b01c-bec033950bcf.png">


Update Peak Price

<img width="1436" alt="image" src="https://user-images.githubusercontent.com/12370049/168185013-7e30e0bf-7e8c-4525-8745-f607d73c43ba.png">

## User Module Screens

Booking Page

<img width="1421" alt="image" src="https://user-images.githubusercontent.com/30898620/168185126-89ec941c-9578-4ce6-b08b-ba2320fe5aa0.png">

Hotel Overview Page

<img width="1431" alt="image" src="https://user-images.githubusercontent.com/30898620/168185277-44196434-f561-4cde-924e-b770fa75732b.png">

Checkout Page

<img width="1432" alt="image" src="https://user-images.githubusercontent.com/30898620/168185198-b3f845db-104f-4f18-be28-eb74c9bfa84e.png">

User Profile Page

<img width="1428" alt="image" src="https://user-images.githubusercontent.com/30898620/168185359-595ee78e-5ce9-46a1-a6bf-1c7f6f083b7b.png">

Booking History Page

<img width="1410" alt="image" src="https://user-images.githubusercontent.com/30898620/168185424-82faca2f-6787-456f-a9ed-459178a84337.png">

Edit Bookings Page

<img width="1426" alt="image" src="https://user-images.githubusercontent.com/30898620/168185480-a811b405-4c84-48dd-857e-8ab85737eaf9.png">

## Deployment Screenshots

<img width="1368" alt="image" src="https://user-images.githubusercontent.com/12370049/168185627-24cdb817-aea3-42d5-9897-b51b19ee1f79.png">

<img width="1440" alt="image" src="https://user-images.githubusercontent.com/12370049/168185655-59274632-5bae-42e1-8619-fc02f1ccc22e.png">

<img width="1439" alt="image" src="https://user-images.githubusercontent.com/12370049/168185903-3881afc2-165c-4e42-bd95-4e402c9a3eab.png">
