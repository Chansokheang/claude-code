# Bus Management System

A full-stack bus management application built with FastAPI, React, and SQLite that helps manage bus fleets, routes, and schedules.

## Features

- **User Authentication**: Secure login and registration system
- **Bus Management**: Create, view, update, and delete bus records
- **Route Management**: Manage bus routes with detailed information
- **Responsive Design**: Works on desktop and mobile devices
- **Interactive UI**: Beautiful user interface with animations
- **API Documentation**: Swagger UI for API testing and documentation

## Tech Stack

### Backend
- FastAPI - High-performance Python web framework
- SQLAlchemy - SQL toolkit and ORM
- Pydantic - Data validation and settings management
- SQLite - Database
- JWT - Token-based authentication

### Frontend
- React - UI library
- React Router - Navigation
- Bootstrap & React-Bootstrap - Styling and UI components
- Axios - HTTP client
- Formik & Yup - Form handling and validation
- Framer Motion - Animations

## Getting Started

### Prerequisites
- Python 3.8+
- Node.js 14+
- npm 6+

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/bus-management-system.git
cd bus-management-system
```

2. Set up the backend:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows, use: venv\Scripts\activate
pip install -r requirements.txt
python run.py
```

3. Set up the frontend:
```bash
cd ../frontend
npm install
npm start
```

4. Open your browser and navigate to:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs

## API Documentation

The API documentation is available at the `/docs` endpoint of the running backend server. It provides a detailed view of all available endpoints, request/response schemas, and allows for testing API calls directly.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.