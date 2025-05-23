# School Location API

A Node.js backend service that manages school locations and provides distance-based school searching functionality.

## Features

- Add new schools with location data (name, address, latitude, longitude)
- List schools sorted by distance from a given location
- Input validation using Zod
- MySQL database integration

## Prerequisites

- Node.js (v14 or higher)
- MySQL database

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables in `.env`:
   ```
   DB_HOST=your_database_host
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_NAME=your_database_name
   ```

## API Endpoints

### Add School
```http
POST /api/schools
```
Body:
```json
{
  "name": "School Name",
  "address": "School Address",
  "latitude": 12.345678,
  "longitude": 98.765432
}
```

### List Schools
```http
GET /api/schools?lat=12.345678&lng=98.765432
```

## Database Schema

```sql
CREATE TABLE schools (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL
);
```

## Deployment

This project is configured for deployment on Vercel. Use the provided `vercel.json` configuration file for deployment settings. 