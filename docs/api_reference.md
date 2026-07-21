# API Reference Specification

## Base URL

```
/api/
```

## Authentication

Protected endpoints require:

```
Authorization: Token <your_token>
```

---

# 1. Predict Customer Cluster

**Endpoint**

```
POST /api/predict/
```

**Authentication**

Required

**Headers**

```
Content-Type: application/json
Authorization: Token <token>
```

### Request Body

```json
{
  "age": 55,
  "income": 50000,
  "total_spending": 450,
  "education": "Graduate",
  "marital_status": "Married",
  "num_web_purchases": 5,
  "num_store_purchases": 8,
  "num_catalog_purchases": 2,
  "num_web_visits_month": 12,
  "recency": 30,
  "total_children": 2
}
```

### Success Response (200)

```json
{
  "predicted_cluster": 1,
  "cluster_description": "Premium Customer - High income, high spender",
  "confidence_score": 0.97,
  "message": "Customer belongs to cluster 1"
}
```

### Error Responses

#### 400 Bad Request

```json
{
  "field": [
    "This field is required."
  ]
}
```

#### 401 Unauthorized

```json
{
  "detail": "Authentication credentials were not provided."
}
```

---

# 2. Login

**Endpoint**

```
POST /api/login/
```

Authentication: Public

### Request

```json
{
  "username": "john",
  "password": "password",
  "turnstile_token": "token"
}
```

### Success Response (200)

```json
{
  "token": "xxxxxxxx",
  "user_id": 1,
  "email": "user@example.com",
  "username": "john",
  "is_staff": false
}
```

### Errors

400 / 401

---

# 3. Register

**Endpoint**

```
POST /api/register/
```

Authentication: Public

### Request

```json
{
  "username": "john",
  "password": "password",
  "turnstile_token": "token"
}
```

### Success (201)

```json
{
  "message": "User registered successfully.",
  "token": "...",
  "user_id": 1,
  "username": "john",
  "is_staff": false
}
```

### Errors

400 / 500

---

# 4. Logout

**Endpoint**

```
POST /api/logout/
```

Authentication Required

### Success (200)

```json
{
  "message": "Successfully logged out."
}
```

### Errors

400 / 401

---

# 5. Dashboard Statistics

**Endpoint**

```
GET /api/dashboard/stats/
```

Authentication

Admin Only

### Success (200)

```json
{
  "total_customers": 1000,
  "active_customers": 600,
  "repeat_customers": 420,
  "avg_age": 41.2,
  "avg_income": 54000,
  "model_accuracy": 97.4
}
```

---

# 6. Customer Segments

**Endpoint**

```
GET /api/segments/
```

Authentication

Admin Only

### Success (200)

```json
[
  {
    "name": "Premium",
    "count": 250,
    "percentage": 25.0
  }
]
```

---

# 7. Recent Customers

**Endpoint**

```
GET /api/customers/recent/
```

Authentication

Admin Only

### Success (200)

```json
[
  {
    "id": 1,
    "name": "Amit Sharma",
    "age": 45,
    "income": 55000,
    "cluster": "Premium"
  }
]
```

---

# Health Check

```
GET /health/
```

Response

```json
{
  "status": "healthy"
}
```