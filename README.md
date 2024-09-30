# Dev connector
---
> Web app created with React, Redux, MUI in the front end. Express and mongoose
> on the back end. It also has docker images.

## Docker Usage:
`docker compose -f docker-compose.yml up` 
> The app is available at http://localhost:8080

## Run the app locally
Requires running mongodb service.

In the client directory:
`npm run dev`
In the server directory:
```MONGO_URL=mongodb://the_username:the_password@localhost:3456/the_database JWT_SECRET=mysecrettoken npm run server```

The app will be available at http://localhost:5173

