# Whistleblowing Reports API

A comprehensive NestJS-based API for managing whistleblowing reports and compliance, built with enterprise-grade features and best practices.

## 🚀 Features

### Core Functionality
- **User Management** - Complete user registration, authentication, and role-based access control
- **Report Management** - Create, read, update, and delete whistleblowing reports
- **Anonymous Reporting** - Support for anonymous report submissions
- **Real-time Notifications** - WebSocket-based notifications for report updates
- **Role-based Authorization** - Three user roles: USER, ADMIN, INVESTIGATOR

### Technical Features
- **JWT Authentication** - Secure token-based authentication
- **API Documentation** - Complete Swagger/OpenAPI documentation
- **Database ORM** - Prisma with PostgreSQL
- **Caching** - Redis integration for performance
- **Logging** - Structured logging with Winston
- **Health Checks** - Comprehensive health monitoring
- **Rate Limiting** - API rate limiting and throttling
- **Security** - Helmet, CORS, input validation
- **Testing** - Unit tests, integration tests, E2E tests
- **Docker Support** - Complete containerization with docker-compose
- **Load Balancing** - Nginx reverse proxy configuration

## 🛠 Technology Stack

- **Framework**: NestJS (Node.js)
- **Database**: PostgreSQL with Prisma ORM
- **Cache**: Redis
- **Authentication**: JWT with Passport
- **Documentation**: Swagger/OpenAPI
- **Testing**: Jest, Supertest
- **Logging**: Winston
- **Containerization**: Docker & Docker Compose
- **Reverse Proxy**: Nginx

## 📋 Prerequisites

- Node.js (v18 or higher)
- pnpm (package manager)
- PostgreSQL (v13 or higher)
- Redis (v6 or higher)
- Docker & Docker Compose (for containerized deployment)

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd whistleblowing-reports
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Set up the database**
   ```bash
   # Start PostgreSQL and Redis (or use Docker)
   docker run --name postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=whistleblowing_reports -p 5432:5432 -d postgres:15-alpine
   docker run --name redis -p 6379:6379 -d redis:7-alpine
   
   # Generate Prisma client and push schema
   pnpm prisma:generate
   pnpm prisma:db:push
   
   # Seed the database
   pnpm prisma:seed
   ```

5. **Start the development server**
   ```bash
   pnpm start:dev
   ```

6. **Access the application**
   - API: http://localhost:3000/api/v1
   - Swagger Documentation: http://localhost:3000/api/docs
   - Health Check: http://localhost:3000/api/v1/health

### Docker Deployment

1. **Using Docker Compose**
   ```bash
   docker-compose up -d
   ```

2. **Run database migrations**
   ```bash
   docker-compose exec app pnpm prisma:db:push
   docker-compose exec app pnpm prisma:seed
   ```

## 📚 API Documentation

### Authentication Endpoints

- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/profile` - Get user profile

### User Management Endpoints

- `GET /api/v1/users` - Get all users (Admin/Investigator only)
- `GET /api/v1/users/:id` - Get user by ID (Admin/Investigator only)
- `POST /api/v1/users` - Create user (Admin only)
- `PATCH /api/v1/users/:id` - Update user (Admin only)
- `DELETE /api/v1/users/:id` - Delete user (Admin only)

### Report Management Endpoints

- `GET /api/v1/reports` - Get all reports (Admin/Investigator only)
- `GET /api/v1/reports/my-reports` - Get current user's reports
- `GET /api/v1/reports/:id` - Get report by ID (Admin/Investigator only)
- `POST /api/v1/reports` - Create new report
- `PATCH /api/v1/reports/:id` - Update report (Admin/Investigator only)
- `DELETE /api/v1/reports/:id` - Delete report (Admin only)

### Health Check Endpoints

- `GET /api/v1/health` - Complete health check
- `GET /api/v1/health/ready` - Readiness check
- `GET /api/v1/health/live` - Liveness check

## 🔐 Authentication & Authorization

### User Roles

1. **USER** - Can create and view their own reports
2. **INVESTIGATOR** - Can view and update all reports
3. **ADMIN** - Full access to all resources

### Default Users (after seeding)

- **Admin**: admin@whistleblowing.com / password123
- **Investigator**: investigator@whistleblowing.com / password123
- **User**: user@example.com / password123

## 🧪 Testing

```bash
# Unit tests
pnpm test

# E2E tests
pnpm test:e2e

# Test coverage
pnpm test:cov

# Watch mode
pnpm test:watch
```

## 📊 Monitoring & Logging

### Health Checks
- Database connectivity
- Memory usage
- Disk space
- Application readiness

### Logging
- Structured JSON logging
- Console output for development
- File logging for production
- Error tracking and monitoring

### Metrics
- API response times
- Request counts
- Error rates
- Database query performance

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment | development |
| `PORT` | Application port | 3000 |
| `DATABASE_URL` | PostgreSQL connection string | - |
| `JWT_SECRET` | JWT signing secret | - |
| `JWT_EXPIRES_IN` | JWT expiration time | 24h |
| `REDIS_HOST` | Redis host | localhost |
| `REDIS_PORT` | Redis port | 6379 |

## 🐳 Docker Configuration

### Services
- **app** - NestJS application
- **postgres** - PostgreSQL database
- **redis** - Redis cache
- **nginx** - Reverse proxy with rate limiting

### Volumes
- `postgres_data` - Database persistence
- `redis_data` - Cache persistence
- `./logs` - Application logs

## 🔒 Security Features

- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - API throttling
- **Input Validation** - Request validation with class-validator
- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - bcrypt password encryption
- **SQL Injection Protection** - Prisma ORM protection

## 📈 Performance Optimizations

- **Redis Caching** - Response caching
- **Database Indexing** - Optimized queries
- **Connection Pooling** - Database connection management
- **Compression** - Response compression
- **Load Balancing** - Nginx reverse proxy

## 🚀 Deployment

### Production Checklist

1. **Environment Configuration**
   - Set strong JWT secret
   - Configure database credentials
   - Set up Redis connection
   - Configure CORS origins

2. **Database Setup**
   - Run migrations: `pnpm prisma:migrate:deploy`
   - Seed initial data: `pnpm prisma:seed`

3. **Security**
   - Enable HTTPS
   - Configure firewall rules
   - Set up monitoring and alerting
   - Regular security updates

4. **Monitoring**
   - Set up log aggregation
   - Configure health check monitoring
   - Set up performance monitoring
   - Configure alerting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Run the test suite
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support and questions, please contact the development team or create an issue in the repository.

---

## 🎯 Interview Demonstration

This application demonstrates proficiency in:

### Backend Development
- ✅ **3+ years Node.js/NestJS experience** - Advanced NestJS patterns and architecture
- ✅ **REST API development** - Comprehensive API with proper HTTP methods, status codes, and documentation
- ✅ **Distributed systems** - Microservices-ready architecture with proper separation of concerns

### Cloud & Infrastructure
- ✅ **AWS/Kubernetes ready** - Docker containerization and orchestration support
- ✅ **Git/GitLab** - Proper version control with meaningful commits and branching
- ✅ **SQL/NoSQL databases** - PostgreSQL with Prisma ORM, Redis caching

### Monitoring & Testing
- ✅ **Monitoring tools** - Health checks, structured logging, metrics endpoints
- ✅ **Testing frameworks** - Jest unit tests, E2E tests with Supertest, test coverage
- ✅ **Performance testing** - Load testing ready with proper caching and optimization

### Architecture & Best Practices
- ✅ **Maintainable code** - Clean architecture, SOLID principles, proper error handling
- ✅ **Technical documentation** - Comprehensive API documentation with Swagger
- ✅ **Security** - JWT authentication, input validation, rate limiting, security headers

This codebase represents production-ready code that can scale and be maintained by a team of developers.