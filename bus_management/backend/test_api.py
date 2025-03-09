import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.main import app
from app.database import Base, get_db
from app.auth import get_password_hash

# Setup test database
SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Dependency override
def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

# Test client
client = TestClient(app)

# Fixture to set up test database
@pytest.fixture(autouse=True)
def setup_database():
    # Create tables
    Base.metadata.create_all(bind=engine)
    
    # Add a test admin user
    from app.models import User
    db = TestingSessionLocal()
    admin_user = User(
        email="admin@example.com",
        hashed_password=get_password_hash("adminpassword"),
        is_active=True,
        is_admin=True
    )
    db.add(admin_user)
    db.commit()
    
    yield
    
    # Drop tables after tests
    Base.metadata.drop_all(bind=engine)

# Test root endpoint
def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to the Bus Management System API"}

# Test user creation
def test_create_user():
    response = client.post(
        "/users/",
        json={"email": "user@example.com", "password": "userpassword"},
    )
    assert response.status_code == 201
    assert response.json()["email"] == "user@example.com"
    assert "id" in response.json()

# Test authentication
def test_login():
    # Test successful login
    response = client.post(
        "/token",
        data={"username": "admin@example.com", "password": "adminpassword"},
    )
    assert response.status_code == 200
    assert "access_token" in response.json()
    assert response.json()["token_type"] == "bearer"
    
    # Test failed login
    response = client.post(
        "/token",
        data={"username": "admin@example.com", "password": "wrongpassword"},
    )
    assert response.status_code == 401

# Test protected endpoints
def test_protected_endpoints():
    # First login to get a token
    login_response = client.post(
        "/token",
        data={"username": "admin@example.com", "password": "adminpassword"},
    )
    token = login_response.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    
    # Test accessing protected endpoint
    response = client.get("/users/me", headers=headers)
    assert response.status_code == 200
    assert response.json()["email"] == "admin@example.com"
    
    # Test without authentication
    response = client.get("/users/me")
    assert response.status_code == 401