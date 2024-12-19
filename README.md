# Service_Connect_Project
/backend
├── /config
│   └── db.js              # MongoDB connection setup
├── /controllers
│   └── workerController.js # Worker-related logic (location update, etc.)
├── /middleware
│   └── authMiddleware.js   # Middleware for authentication (if needed)
├── /models
│   └── Worker.js           # Worker schema/model
├── /routes
│   └── workerRoutes.js     # Routes related to worker location and services
├── /services
│   └── locationService.js  # Business logic for location updates, calculations, etc.
├── .env                    # Environment variables (e.g., MongoDB URI, API keys)
├── server.js               # Entry point for the server
└── package.json            # Project dependencies and scripts
