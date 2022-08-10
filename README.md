# EqumoneyBackend

<img src="https://user-images.githubusercontent.com/69458980/128169264-5dd902c7-cc9a-4a17-a36d-6492800ca301.jpg">

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

- Create account -POST
```bash
http://localhost:8000/signup
```

![image](https://user-images.githubusercontent.com/79927591/183785074-b520d0fc-282b-4cbf-ab53-d73ffc4af900.png)


- Login -POST
```bash
http://localhost:8000/login
```

![image](https://user-images.githubusercontent.com/79927591/183785241-3677c9ef-5c5c-4aea-b1f0-9ccce716ccb9.png)

- Get Payments Without ID -GET
```bash
http://localhost:8000/payments
```

![image](https://user-images.githubusercontent.com/79927591/183785832-cb41cf5a-550c-4e36-9d0c-7326adc9ccf5.png)

For the other uses, you can review the payments.js file.









