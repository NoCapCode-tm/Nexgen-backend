# 🔐 Auth API Documentation

This document describes the authentication APIs for the backend system.

---

## 🌐 Base URL

```
http://localhost:5000/api/auth
```

---

## 🧾 Authentication Method

* Uses **JWT stored in HTTP-only cookies**
* Cookies are automatically sent with requests
* Protected routes require valid authentication

---

## 📌 Endpoints

---

### ✅ 1. Signup

**POST** `/signup`

Create a new user account.

#### Request Body

```json
{
  "name": "name",
  "email": "email@gmail.com",
  "password": "123456"
}
```

#### Response

```json
{
  "success": true,
  "message": "User created successfully",
  "user": {
    "id": "user_id",
    "name": "name",
    "email": "email@gmail.com"
  }
}
```

#### Notes

* Password is hashed before saving
* Cookie is set after successful signup

---

### ✅ 2. Login

**POST** `/login`

Authenticate user and set session cookie.

#### Request Body

```json
{
  "email": "email@gmail.com",
  "password": "123456"
}
```

#### Response

```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "user_id",
    "name": "name",
    "email": "email@gmail.com"
  }
}
```

#### Notes

* JWT token is stored in HTTP-only cookie
* Invalid credentials return error

---

### ✅ 3. Logout

**POST** `/logout`

Logs out the user by clearing the cookie.

#### Response

```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

### ✅ 4. Get Current User

**GET** `/me`

Returns the currently authenticated user.

#### Headers

Cookies are required (automatically sent by browser)

#### Response

```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "name": "name",
    "email": "email@gmail.com"
  }
}
```

#### Errors

```json
{
  "message": "Unauthorized"
}
```

---

## 🔐 Security Details

* JWT stored in **HTTP-only cookies**
* Cookies configured with:

  * `httpOnly: true`
  * `sameSite: lax (dev) / none (prod)`
  * `secure: true (production only)`
* Passwords hashed using **bcrypt**

---

## ⚠️ Important Notes

* Frontend must include credentials:

```js
fetch(url, {
  credentials: "include"
});
```

* CORS must allow credentials:

```js
cors({
  origin: "http://localhost:3000",
  credentials: true
});
```

---

## 🚀 Tech Stack

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* bcrypt for password hashing

---

## ✅ Status

All authentication endpoints are working:

* Signup ✅
* Login ✅
* Logout ✅
* Get Current User ✅
