# clot_userDelete_service# Clot_UserDelete_Service Microservice

## Overview
The **Clot_UserDelete_Service** microservice is responsible for deleting user records from the existing MySQL database used by `clot_userCreate_service`. It follows the **Proxy** design pattern to add an extra validation layer before executing delete operations.

---

## Features
- Deletes a user by ID.
- Uses MySQL as the relational database.
- Implements the **Proxy** design pattern to validate deletion requests.
- Fully containerized using Docker.
- Connected to `clot_userCreate_service` for database access.

---

## Technologies Used
- **Node.js**: JavaScript runtime for backend development.
- **Express.js**: Lightweight framework for API handling.
- **MySQL**: Relational database for user data storage.
- **Docker**: Containerization for service deployment.
- **dotenv**: Manages environment variables.
- **Body-parser**: Parses incoming request bodies.

---

## API Endpoints
### Delete User
**Endpoint**: `/api/users/:id`

**Method**: `DELETE`

**Request Example**:
```
DELETE http://localhost:3003/api/users/1
```

**Response Examples**:
- **200 OK**:
  ```json
  {
    "message": "User deleted successfully"
  }
  ```
- **404 Not Found**:
  ```json
  {
    "message": "User not found"
  }
  ```
- **500 Internal Server Error**:
  ```json
  {
    "message": "Error deleting user"
  }
  ```

---

## Environment Variables
This microservice requires a `.env` file in the root directory with the following variables:

```env
PORT=3003
DB_HOST=clot_usercreate_service-db-1
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=clot_users
```

---

## Project Structure
```
clot_userDelete_service
├── src/
│   ├── app.js                # Main application file
│   ├── routes/
│   │   └── index.js          # API routes
│   ├── controllers/
│   │   └── userController.js # Business logic for deleting users
│   ├── models/
│   │   └── userModel.js      # Database queries
├── .env                      # Environment variables
├── Dockerfile                # Docker build file
├── docker-compose.yml        # Docker Compose configuration
├── README.md                 # Documentation
└── package.json              # Node.js dependencies
```

---

## Docker Setup
1. **Build the Docker Image**:
   ```bash
   docker build -t clot_userdelete_service:latest .
   ```
2. **Run the Docker Container**:
   ```bash
   docker run -p 3003:3003 --env-file .env clot_userdelete_service:latest
   ```
3. **Using Docker Compose**:
   ```bash
   docker-compose up --build
   ```

---

## Proxy Design Pattern Implementation
This microservice uses the **Proxy Pattern** to add an extra validation layer before executing the deletion operation. The proxy class checks for valid user IDs before allowing database access.

Example of the **Proxy Class**:
```javascript
class DeleteUserProxy {
  constructor(userId) {
    this.userId = userId;
  }

  async execute() {
    console.log(`Validating request to delete user ID: ${this.userId}`);

    // Additional validation logic before deleting
    if (!this.userId || isNaN(this.userId)) {
      throw new Error("Invalid user ID");
    }

    return await deleteUserDB(this.userId);
  }
}
```
This ensures that only valid deletion requests are processed.

---

## Testing the API
Use **Postman** or **curl** to test the API.

Example using `curl` to delete a user:
```bash
curl -X DELETE http://localhost:3003/api/users/1
```

Expected Response:
```json
{
  "message": "User deleted successfully"
}
```

---

## Notes
- Ensure `clot_userCreate_service` is running before starting this microservice.
- Deleting a user does not affect other records in the database.
- Deleted IDs are **not reused** if `AUTO_INCREMENT` is enabled.

---

## License
This project is licensed under the MIT License. See the LICENSE file for details.

