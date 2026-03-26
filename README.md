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


# 📇 Contact API Documentation

This section describes the APIs used to manage user contacts (signers).

---

## 🌐 Base URL

```
http://localhost:5000/api/contacts
```

---

## 🔐 Authentication

* All routes are **protected**
* Requires valid JWT stored in **HTTP-only cookies**
* Frontend must send cookies with requests

---

## 📌 Endpoints

---

### ✅ 1. Create Contact

**POST** `/`

Create a new contact.

#### Request Body

```json
{
  "name": "Rahul",
  "email": "rahul@gmail.com"
}
```

#### Response

```json
{
  "success": true,
  "contact": {
    "_id": "contact_id",
    "name": "Rahul",
    "email": "rahul@gmail.com",
    "owner": "user_id"
  }
}
```

---

### ✅ 2. Get All Contacts

**GET** `/`

Fetch all contacts of the logged-in user.

#### Response

```json
{
  "success": true,
  "contacts": [
    {
      "_id": "contact_id",
      "name": "Rahul",
      "email": "rahul@gmail.com"
    }
  ]
}
```

#### Notes

* Returns empty array if no contacts exist
* Contacts are sorted by latest created

---

### ✅ 3. Update Contact

**PATCH** `/:id`

Update an existing contact.

#### Request Body

```json
{
  "name": "Rahul Sharma",
  "email": "rahul.sharma@gmail.com"
}
```

#### Response

```json
{
  "success": true,
  "contact": {
    "_id": "contact_id",
    "name": "Rahul Sharma",
    "email": "rahul.sharma@gmail.com"
  }
}
```

#### Errors

```json
{
  "message": "Contact not found"
}
```

---

### ✅ 4. Delete Contact

**DELETE** `/:id`

Delete a contact.

#### Response

```json
{
  "success": true,
  "message": "Contact deleted"
}
```

#### Errors

```json
{
  "message": "Contact not found"
}
```

---

## ⚠️ Important Notes

* Each contact is linked to a specific user (`owner`)
* Users can only:

  * View their own contacts
  * Update their own contacts
  * Delete their own contacts

---

## 🔐 Security

* Protected using authentication middleware
* Ensures user-specific data isolation
* Prevents unauthorized access to other users' contacts

---

## 🧪 Testing Tips

* Login first to receive cookie
* Use tools like Postman or frontend with:

```js
fetch(url, {
  credentials: "include"
});
```

---

## 🚀 Use Case

Contacts are used when:

* Adding signers to documents
* Selecting frequent recipients quickly
* Improving user experience in document workflows

---

## ✅ Status

All Contact APIs are working:

* Create Contact ✅
* Get Contacts ✅
* Update Contact ✅
* Delete Contact ✅

