# B7A2-DevPulse

Internal Tech Issue &amp; Feature Tracker -- A collaborative platform for software teams to report bugs, suggest features, and coordinate resolutions.

## 🛠️ Tech Stack & Architecture

- **Language:** TypeScript (100%)
- **Runtime Environment:** Node.js
- **Database Operations:** High-performance Raw SQL Queries
- **Authentication:** JSON Web Tokens (JWT)

## ✨ Key Features

- **Role-Based Workflows:** Built-in permissions explicitly tailored for **Contributors** and **Maintainers**.
- **Dynamic Issue Tracking:** Submit bug reports, log tech tasks, or map out future product feature requests.
- **Advanced Querying:** Filter, query, and sort live open and resolved team tickets.
- **Fine-Grained Access Control:** Smart update and delete safety checks based entirely on ownership rules and specific team roles.

## 🔌 API Endpoints Specification

### 🔐 Authentication

- `POST /api/auth/signup` - Register a new account (`contributor` or `maintainer` role)
- `POST /api/auth/login` - Authenticate an existing user and get a secure JWT access token

### 🎫 Issues

- `POST /api/issues` - Log a new bug report or product feature request _(Authenticated)_
- `GET /api/issues` - Fetch all system tickets with live sorting and query filters
- `GET /api/issues/:id` - Extract complete target details for a single issue tracking ID
- `PATCH /api/issues/:id` - Update title or data _(Maintainer or owning Contributor)_
- `DELETE /api/issues/:id` - Permanently clear a tracked ticket from the ledger _(Maintainer only)_

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org) installed along with your target database client environment.

### 📦 Installation & Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com
   cd B7A2-DevPulse
   ```

2. **Install project dependencies:**

   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and define your credentials:

   ```env
   PORT=3000
   CONNECTION_STRING=your_sql_database_connection_string
   SECRET_KEY=your_super_secure_jwt_token_secret
   ```

4. **Compile and Run the Server:**
   ```bash
   # Start the application
   npm run dev
   ```

## 📄 License

This software project is open-source and officially distributed under the [MIT License](LICENSE).

👨‍💻 Author

Jahidul Sany AI-Driven Software Developer based in England, UK

📧 Email: jahidulsanypro@gmail.com

Feel free to connect if you’d like to collaborate or discuss opportunities.

⭐ If you like this project, consider giving it a star on GitHub!
