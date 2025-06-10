
Built by https://www.blackbox.ai

---

# Key Authentication Website

## Project Overview

The **Key Authentication Website** is a Node.js application that provides a simple web interface for key-based authentication. Users can authenticate themselves by entering a valid key. Once authenticated, users are redirected to a protected website area. The application supports session management to enhance security.

## Installation

To set up this project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd key-auth-website
   ```

2. **Install dependencies**:
   Make sure you have Node.js installed. Then, run:
   ```bash
   npm install
   ```

3. **Set up your keys**:
   Create a file named `keys` in the root directory containing the valid keys (one key per line).

## Usage

1. **Start the server**:
   Run the application using:
   ```bash
   npm start
   ```

2. **Access the application**:
   Open your browser and navigate to `http://localhost:8000`.

3. **Authenticate**:
   - Enter a valid key to access the protected content.
   - If the key is valid, you'll be redirected to the protected website.
   - If you want to log out, visit `http://localhost:8000/logout`.

## Features

- Key-based authentication system.
- Session management to control user access.
- Redirects to the appropriate pages based on authentication status.
- Static file serving for user interfaces.

## Dependencies

This project has the following dependencies:

- **express**:  A web application framework for Node.js, used to build the web application and handle routing.
- **express-session**: A middleware for session management in Express applications, providing functionality to store and manage user sessions.

You can find the complete list of dependencies in the `package.json` file.

## Project Structure

```
key-auth-website/
├── public/            # Directory for static files
│   ├── auth.html     # Authentication page
│   └── index.html    # Protected content page
├── keys              # File containing valid keys (one key per line)
├── package.json      # Project metadata and dependencies
├── package-lock.json # Dependency tree and versions
└── server.js         # Main server file with application logic
```

## Contributing

Contributions are welcome! If you have suggestions or improvements, feel free to submit an issue or a pull request.

## License

This project is licensed under the MIT License. Feel free to modify and distribute as needed.