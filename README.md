# 🌍 WanderLust

A full-stack travel and property listing platform inspired by Airbnb. WanderLust allows users to explore, create, manage, and review unique property rentals around the world. 

Currently, the project has a robust and fully functioning backend with complete CRUD operations, secure user authentication, and strict database-level authorization.

## 🚀 Features

* **Property Management (CRUD):** Users can create, read, update, and delete their own property listings.
* **User Authentication:** Secure signup, login, and session management using Passport.js.
* **Authorization Security:** Custom middleware ensures users can only edit or delete listings they personally own.
* **Database Referencing:** Seamless integration between Users and Listings collections in MongoDB.
* **Responsive UI (WIP):** Frontend built with EJS templating, currently being styled and refined.

## 🛠️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB, Mongoose
* **Frontend:** EJS (Embedded JavaScript templates), HTML, CSS
* **Authentication:** Passport.js (Local Strategy)
* **Routing:** Express Router

## ⚙️ Installation and Setup

To run this project locally, follow these steps:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/) installed on your machine.

### 1. Clone the repository
```bash
git clone [https://github.com/](https://github.com/)[Your-Username]/wanderLust.git
cd wanderLust
