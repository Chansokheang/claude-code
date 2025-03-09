import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { busAPI, routeAPI } from '../services/api';
import PageLayout from '../components/PageLayout';
import { motion } from 'framer-motion';
import { FaBus, FaRoute, FaPlusCircle } from 'react-icons/fa';

const DashboardPage = () => {
  const [buses, setBuses] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [busesData, routesData] = await Promise.all([
          busAPI.getAllBuses(),
          routeAPI.getAllRoutes()
        ]);
        
        setBuses(busesData);
        setRoutes(routesData);
        setError(null);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    },
    hover: {
      scale: 1.03,
      boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
      transition: {
        duration: 0.3
      }
    }
  };

  if (loading) {
    return (
      <PageLayout title="Dashboard">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Dashboard">
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Row className="mb-4">
          <Col md={6}>
            <motion.div variants={itemVariants}>
              <Card className="h-100 shadow-sm border-0">
                <Card.Body className="d-flex align-items-center">
                  <FaBus className="text-primary me-3" size={30} />
                  <div>
                    <h3 className="mb-0">{buses.length}</h3>
                    <p className="text-muted mb-0">Total Buses</p>
                  </div>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
          <Col md={6}>
            <motion.div variants={itemVariants}>
              <Card className="h-100 shadow-sm border-0">
                <Card.Body className="d-flex align-items-center">
                  <FaRoute className="text-success me-3" size={30} />
                  <div>
                    <h3 className="mb-0">{routes.length}</h3>
                    <p className="text-muted mb-0">Total Routes</p>
                  </div>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        </Row>

        <h4 className="mb-3">Recent Buses</h4>
        <Row className="mb-4">
          {buses.length > 0 ? (
            buses.slice(0, 4).map((bus) => (
              <Col md={6} lg={3} className="mb-3" key={bus.id}>
                <motion.div 
                  variants={cardVariants}
                  whileHover="hover"
                >
                  <Card className="h-100 shadow-sm border-0">
                    <Card.Body>
                      <Card.Title>{bus.bus_number}</Card.Title>
                      <Card.Text>
                        <strong>Model:</strong> {bus.model}<br />
                        <strong>Capacity:</strong> {bus.capacity} seats<br />
                        <strong>Status:</strong> {bus.is_active ? 'Active' : 'Inactive'}
                      </Card.Text>
                      <Link to={`/buses/${bus.id}`} className="btn btn-sm btn-outline-primary">
                        View Details
                      </Link>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))
          ) : (
            <Col>
              <Card className="border-0 shadow-sm">
                <Card.Body className="text-center p-4">
                  <p className="mb-3">No buses found. Add your first bus to get started.</p>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button as={Link} to="/buses/add" variant="primary" className="d-inline-flex align-items-center">
                      <FaPlusCircle className="me-2" />
                      Add Bus
                    </Button>
                  </motion.div>
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0">Recent Routes</h4>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button as={Link} to="/routes" variant="outline-primary" size="sm">
              View All
            </Button>
          </motion.div>
        </div>
        <Row>
          {routes.length > 0 ? (
            routes.slice(0, 4).map((route) => (
              <Col md={6} className="mb-3" key={route.id}>
                <motion.div 
                  variants={cardVariants}
                  whileHover="hover"
                >
                  <Card className="h-100 shadow-sm border-0">
                    <Card.Body>
                      <Card.Title>{route.name}</Card.Title>
                      <Card.Text>
                        <strong>From:</strong> {route.start_location}<br />
                        <strong>To:</strong> {route.end_location}<br />
                        <strong>Departure:</strong> {new Date(route.departure_time).toLocaleString()}<br />
                        <strong>Status:</strong> {route.is_active ? 'Active' : 'Inactive'}
                      </Card.Text>
                      <Link to={`/routes/${route.id}`} className="btn btn-sm btn-outline-primary">
                        View Details
                      </Link>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))
          ) : (
            <Col>
              <Card className="border-0 shadow-sm">
                <Card.Body className="text-center p-4">
                  <p className="mb-3">No routes found. Add your first route to get started.</p>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button as={Link} to="/routes/add" variant="primary" className="d-inline-flex align-items-center">
                      <FaPlusCircle className="me-2" />
                      Add Route
                    </Button>
                  </motion.div>
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>
      </motion.div>
    </PageLayout>
  );
};

export default DashboardPage;