# USER MANAGEMENT

## Description

My Application is a web application built with React and Fastify that allows users to manage and view user data efficiently. The application features a responsive UI, user authentication, pagination, and filtering capabilities, providing a seamless experience for managing user information.

## Features

- **User Management**: View, edit, and delete user information.
- **Pagination**: Navigate through large sets of user data with pagination controls.
- **Filtering**: Filter users by attributes like name, email, and date.
- **Responsive Design**: Optimized for desktop and mobile devices.
- **User Authentication**: Secure login and logout functionalities.

## Tech Stack

- **Frontend**: 
  - React
  - TypeScript
  - React Router
  - Tailwind CSS 
- **Backend**: 
  - Fastify
  - Prisma 
- **Database**: 
  - PostgreSQL 
- **Testing**:
  - Vitest 
  - React Testing Library

## Installation

Follow these steps to get a local copy of the project up and running:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/adel-cha/Corum-project.git
    cd Corum-project
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up your environment variables**:
    Create a `.env` file in the root directory and add your environment variables. For backend:
    ```env
    DATABASE_URL=your_database_url
    SECRET_JWT=your_jwt_secret
    FRONTEND_URL = "http://localhost:8000"
    ```
    For frontend:
    ```env
    REACT_APP_API_BASE_URL=http://localhost:3000
    PORT=8000
    ```
4. **install db**:
    ```bash
    npm run runDB
    ```
    
5. **Run the application**:
    ```bash
    npm start
    ```

6. **Run the tests** (optional):
    ```bash
    npm test
    ```

## Usage

1. Navigate to `http://localhost:3000` in your browser.
2. Use the login page to authenticate.
  ```env
  email=admin@corum.com 
  password=corum123
  ```
3. you need to change your password 
4. After logging in, you can view the list of users and perform actions like edit and delete.

## API Endpoints

The application interacts with the following backend API endpoints:

- `GET /api/users`: Fetch all users with optional pagination and filtering.
- `POST /api/users`: Create a new user.
- `PUT /api/users/:id`: Update a user's information.
- `DELETE /api/users/:id`: Delete a user.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to [Fastify](https://www.fastify.io/) for the fast and low-overhead web framework.
- Thanks to [Prisma](https://www.prisma.io/) for simplifying database interactions.
- Thanks to [React](https://reactjs.org/) for providing a powerful UI library.
