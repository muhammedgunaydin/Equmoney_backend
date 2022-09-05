# EqumoneyBackend

<img src="https://user-images.githubusercontent.com/69458980/128169264-5dd902c7-cc9a-4a17-a36d-6492800ca301.jpg">

The Project: Equmoney is a budget management application. It helps the user to edit the budget as quickly as possible.
It is designed to help achieve a goal or save money.

For the project frontend click [here](https://github.com/muhammedgunaydin/Equmoney_frontend.git)

API example is written in Javascript using [NodeJS](https://nodejs.org/en/) 
framework and [MongoDB](https://www.mongodb.com/) database.

## Requirements
- [NodeJS](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/)
- Code Editor

## Instructions

- Clone the repository and move to the project directory:
  ```bash
    git clone https://github.com/muhammedgunaydin/Equmoney_backend.git
    cd Equmoney_backend
  ```
  
- To load the npm packages
  ```bash
    npm install
  ```
    
- Run project
  ```bash
    npm run dev
  ```
  
## Usage Examples

There are two options:
1) You can use the project with [Frontend](https://github.com/muhammedgunaydin/Equmoney_frontend.git)
2) You can use the project with [Postman](https://www.postman.com/)

### 1. Use Project With [Frontend](https://github.com/muhammedgunaydin/Equmoney_frontend.git)

Follow the instructions.Click [here](https://github.com/muhammedgunaydin/Equmoney_frontend.git) for instructions.

### 2. Use Project With [Postman](https://www.postman.com/)

Note: If your project is not run follow the instructions and start the project.

- Create account
```bash
curl -X POST http://localhost:8000/signup -d
'{"email" : "user@hotmail.com",
  "password" : "pass1234"
}'
```

- Login
```bash
curl -X POST http://localhost:8000/login -d
'{"email" : "user@hotmail.com",
  "password" : "pass1234"
}'
```

- Get Payments Without ID
```bash
curl -X GET http://localhost:8000/payments
```

### For the other uses, you can review the [payments.js](https://github.com/muhammedgunaydin/Equmoney_backend/blob/main/payments/payments.js) file.









