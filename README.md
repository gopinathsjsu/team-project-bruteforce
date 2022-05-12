# Hotel Management Application by Team Brute Force
[Link to Sprint Report](https://docs.google.com/spreadsheets/d/1N_YAxDElzVTV7xWyxAjk_7LDUGHTmtO2qs2-PweUnzY/edit#gid=1312521409)

[Link to Sprint Journal](https://docs.google.com/spreadsheets/d/1aMi2fXvU-WYp2BQTQM51rN9wIKzLv9uOepR2EarMBTo/edit#gid=1832506498)

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




