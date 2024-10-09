# Travel Destinations Application 🌍✨🛫

This is a web application built with Node.js, Express, Mongoose, and MongoDB. It allows users to create, edit, view, filter, and delete travel destinations. Users must be logged in to delete destinations.

## Figma Design

You can view the Figma design here [Figma Design](https://www.figma.com/design/squ29LQFMHQ3zrdgRQpDKw/Travel-destination-prototype?node-id=0-1&node-type=canvas&t=xZo1lOzeF2u0oMWW-0)

## Key Features </br>

### User Functionalities

- **View Destinations:** All users can view a list of travel destinations, including city, country, dates, and description.</br>
- **Filter by Country:** Destinations can be filtered based on the country using a dropdown.</br>
- **Add New Destination:** All users can add new destinations by filling out a form.</br>
- **Edit Destination:** All users can edit existing destinations</br>
- **Delete Destination:** Logged-in users can delete any destination.</br>

### Backend (Server-Side)

- **Node.js & Express:** Used to handle API requests for creating, updating, deleting, and fetching destinations.</br>
- **MongoDB & Mongoose:** Used for storing and managing destinations and user data.</br>
- **JWT Authentication:** or login functionality, enabling users to log in and get authenticated with a token.</br>

## Installation </br>

1.Clone the repository:

```bash
git clone https://github.com/Oskarmle/Travel-destination.git
cd Travel-destination
```

2.Install the dependencies:

```bash
npm install
```

3.Set up your .env file with the following environment variables:

```bash
jwt_secret=your_jwt_secret
```

## Development Server </br>

### Backend </br>

Start the backend server:

```bash
node backend/server.js
```

The backend will run on http://localhost:3003.

### Frontend </br>

Preview the frontend using liveServer

```bash
live-server
```

The frontend will be accessible at http://localhost:5500

## API Endpoints </br>

### Destination Routes </br>

#### Destination Routes

- **GET** `/destinations`: Fetch all destinations.
- **GET** `/destinations/:filter`: Fetch destinations filtered by country.
- **POST** `/destinations`: Create a new destination.
- **PUT** `/destinations/:destinationId`: Update an existing destination by ID.
- **DELETE** `/destinations/:id`: Delete a destination by ID (requires authentication).

#### User Routes

- **POST** `/users`: Register a new user.
- **POST** `/users/login`: Login with email and password to receive a token.

## Dependencies

- **Node.js**: JavaScript runtime.
- **Express**: Fast, unopinionated, minimalist web framework.
- **MongoDB**: NoSQL database.
- **Mongoose**: Elegant MongoDB object modeling for Node.js.
- **JWT**: JSON Web Tokens for authentication.

## Authors

This application was created by:

- [Oskarmle](https://github.com/Oskarmle)
- [teriTheDesigner](https://github.com/teriTheDesigner)
- [julitele](https://github.com/julitele)
- [jannajenna](https://github.com/jannajenna)
