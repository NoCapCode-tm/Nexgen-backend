# 🔐 Auth API Documentation

This document describes the authentication APIs for the backend system.

---

## 🌐 Base URL

```
http://localhost:5000/api/auth
```

---

## 🧾 Authentication Method

- Uses **JWT stored in HTTP-only cookies**
- Cookies are automatically sent with requests
- Protected routes require valid authentication

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

- Password is hashed before saving
- Cookie is set after successful signup

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

- JWT token is stored in HTTP-only cookie
- Invalid credentials return error

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

- JWT stored in **HTTP-only cookies**
- Cookies configured with:
  - `httpOnly: true`
  - `sameSite: lax (dev) / none (prod)`
  - `secure: true (production only)`

- Passwords hashed using **bcrypt**

---

## ⚠️ Important Notes

- Frontend must include credentials:

```js
fetch(url, {
  credentials: "include",
});
```

- CORS must allow credentials:

```js
cors({
  origin: "http://localhost:3000",
  credentials: true,
});
```

---

## 🚀 Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcrypt for password hashing

---

## ✅ Status

All authentication endpoints are working:

- Signup ✅
- Login ✅
- Logout ✅
- Get Current User ✅

# 📇 Contact API Documentation

This section describes the APIs used to manage user contacts (signers).

---

## 🌐 Base URL

```
http://localhost:5000/api/contacts
```

---

## 🔐 Authentication

- All routes are **protected**
- Requires valid JWT stored in **HTTP-only cookies**
- Frontend must send cookies with requests

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

- Returns empty array if no contacts exist
- Contacts are sorted by latest created

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

- Each contact is linked to a specific user (`owner`)
- Users can only:
  - View their own contacts
  - Update their own contacts
  - Delete their own contacts

---

## 🔐 Security

- Protected using authentication middleware
- Ensures user-specific data isolation
- Prevents unauthorized access to other users' contacts

---

## 🧪 Testing Tips

- Login first to receive cookie
- Use tools like Postman or frontend with:

```js
fetch(url, {
  credentials: "include",
});
```

---

## 🚀 Use Case

Contacts are used when:

- Adding signers to documents
- Selecting frequent recipients quickly
- Improving user experience in document workflows

---

## ✅ Status

All Contact APIs are working:

- Create Contact ✅
- Get Contacts ✅
- Update Contact ✅
- Delete Contact ✅

# 📄 Document API Documentation

This section describes the APIs used to manage documents in the system.

---

## 🌐 Base URL

```
http://localhost:5000/api/documents
```

---

## 🔐 Authentication

- All routes are **protected**
- Requires valid JWT stored in **HTTP-only cookies**
- Frontend must send credentials with requests

---

## 📌 Endpoints

---

### ✅ 1. Create Document

**POST** `/`

Create a new document.

#### Request Body

```json
{
  "title": "NDA Agreement",
  "content": "Optional text content",
  "fileUrl": "https://dummy.pdf"
}
```

#### Response

```json
{
  "success": true,
  "document": {
    "_id": "document_id",
    "title": "NDA Agreement",
    "content": "Optional text content",
    "fileUrl": "https://dummy.pdf",
    "owner": "user_id",
    "status": "draft",
    "signers": []
  }
}
```

#### Notes

- `title` and `fileUrl` are required
- `owner` is automatically assigned from logged-in user
- Default status is `draft`

---

### ✅ 2. Get All Documents

**GET** `/`

Fetch all documents created by the logged-in user.

#### Response

```json
{
  "success": true,
  "documents": [
    {
      "_id": "document_id",
      "title": "NDA Agreement",
      "status": "draft",
      "fileUrl": "https://dummy.pdf"
    }
  ]
}
```

#### Notes

- Documents are sorted by latest created
- Only documents owned by the user are returned

---

### ✅ 3. Get Single Document

**GET** `/:id`

Fetch a specific document by ID.

#### Response

```json
{
  "success": true,
  "document": {
    "_id": "document_id",
    "title": "NDA Agreement",
    "content": "Optional text content",
    "fileUrl": "https://dummy.pdf",
    "status": "draft",
    "signers": [
      {
        "_id": "signer_id",
        "name": "Rahul",
        "email": "rahul@gmail.com",
        "status": "pending"
      }
    ]
  }
}
```

#### Errors

```json
{
  "message": "Document not found"
}
```

---

### ✅ 4. Update Document

**PATCH** `/:id`

Update document details.

#### Request Body

```json
{
  "title": "Updated NDA",
  "content": "Updated content"
}
```

#### Response

```json
{
  "success": true,
  "document": {
    "_id": "document_id",
    "title": "Updated NDA"
  }
}
```

#### Notes

- Only document owner can update
- Partial updates supported

---

### ✅ 5. Delete Document

**DELETE** `/:id`

Delete a document.

#### Response

```json
{
  "success": true,
  "message": "Document deleted"
}
```

#### Errors

```json
{
  "message": "Document not found"
}
```

---

### ✅ 6. Create Document from template

**POST** `/from-template`

Create a document from template.

#### Request Body

```json
{
  "templateId": "69ce520f96fac3c39b794fbf",
  "title": "Updated NDA" // can overide
}
```

#### Response

```json
{
  "success": true,
  "document": {
    "title": "Content test",
    "content": "<h1>This is content test</h1>",
    "fileUrl": "https://dummy.pdf",
    "owner": "69c299cd12a1d99c03a0f233",
    "status": "draft",
    "signers": [],
    "widgets": [
      {
        "type": "signature",
        "x": 100,
        "y": 200,
        "width": 150,
        "height": 50,
        "page": 1,
        "signerIndex": 0,
        "_id": "69ce520f96fac3c39b794fc0"
      },
      {
        "type": "name",
        "x": 50,
        "y": 100,
        "page": 1,
        "signerIndex": 0,
        "_id": "69ce520f96fac3c39b794fc1"
      }
    ],
    "expiresAt": null,
    "_id": "69d384f94985262d448dcac0",
    "createdAt": "2026-04-06T10:03:37.945Z",
    "updatedAt": "2026-04-06T10:03:37.945Z",
    "__v": 0
  }
}
```

#### Errors

```json
{
  "message": "template not found"
}
```

```json
{
  "message": "templateId is required"
}
```

---

## ⚠️ Important Notes

- Each document is linked to a specific user (`owner`)
- Only the owner can:
  - View the document
  - Update the document
  - Delete the document

---

### ✅ 7. Complete Document

**PATCH** `/:id/complete`

Mark a document as completed.

---

#### Description

This API manually updates the document status to `completed`.
It is used after the document has been sent and all required actions are finished.

---

#### Response

```json
{
  "success": true,
  "message": "Document marked as completed",
  "document": {
    "_id": "document_id",
    "status": "completed"
  }
}
```

---

#### Errors

```json
{
  "message": "Document not found"
}
```

```json
{
  "message": "Document already completed"
}
```

```json
{
  "message": "Document must be sent before completing"
}
```

---

#### Notes

* Only the document owner can mark it as completed
* Document must be in `pending` state before completion
* This is a **manual completion trigger**
* In a full system, completion would be automatic based on widget/signature status


## 🔐 Security

- Protected using authentication middleware
- Prevents unauthorized access to documents
- Ensures user-specific data isolation

---

## 🧪 Testing Tips

- Login first to receive cookie
- Use tools like Postman or frontend with:

```js
fetch(url, {
  credentials: "include",
});
```

---

## 🚀 Use Case

Documents are the core entity in the system:

- Created by users
- Assigned to signers
- Sent for signing
- Updated as signing progresses

---

### ✅ 8. Send Document

**POST** `/:id/send`

Send a document to all assigned signers via email.

---

#### Description

This API initiates the document signing process by:

* Validating the document
* Ensuring signers are assigned
* Updating document status to `pending`
* Sending email notifications to all signers with a signing link

---

#### Response

```json
{
  "success": true,
  "message": "Document sent successfully",
  "document": {
    "_id": "document_id",
    "status": "pending"
  }
}
```

---

#### Errors

```json
{
  "message": "Document not found"
}
```

```json
{
  "message": "Document already sent or completed"
}
```

```json
{
  "message": "Add at least one signer before sending"
}
```

---

#### Notes

* Only the document owner can send the document
* Document must be in `draft` state before sending
* At least one signer must be added
* Status is updated from `draft` → `pending`

---

#### 📧 Email Behavior

* Emails are sent using **Nodemailer (SMTP)**
* Each signer receives:

  * Subject: *Document Signature Request*
  * A unique signing link

---

#### 🔗 Signing Link Format

```text
{CLIENT_URL}/sign/:documentId/:signerId
```

Example:

```text
http://localhost:3000/sign/abc123/signer456
```

---

#### ⚠️ Important Notes

* Email failures for individual signers do not stop the API
* Errors are logged in the server console
* Email service is configurable via environment variables

---

#### 🔐 Environment Variables Required

```env
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
CLIENT_URL=http://localhost:3000
```

---

## 🔄 Workflow Integration

```text
Create Document → Add Signers → Add Widgets → Send Document → Sign → Complete
```

---

## ✅ Status

* Send Document API ✅
* Email Notifications via Nodemailer ✅


## ✅ Status

All Document APIs are working:

- Create Document ✅
- Get Documents ✅
- Get Single Document ✅
- Update Document ✅
- Delete Document ✅
- Create Document from template
- Document Complete
- Document Send

# ✍️ Signer API Documentation

This section describes the APIs used to manage signers for documents.

---

## 🌐 Base URL

```
http://localhost:5000/api
```

---

## 🔐 Authentication

- All routes are **protected**
- Requires valid JWT stored in **HTTP-only cookies**
- Frontend must send credentials with requests

---

## 📌 Endpoints

---

### ✅ 1. Add Signer

**POST** `/documents/:id/signers`

Add a signer to a document.

---

## 🔹 Request Options

You can add a signer in two ways:

---

### Option 1: Manual Entry

```
{
  "name": "Rahul",
  "email": "rahul@gmail.com"
}
```

---

### Option 2: From Contact

```
{
  "contactId": "contact_id_here"
}
```

---

## 🔹 Response

```
{
  "success": true,
  "signer": {
    "_id": "signer_id",
    "document": "document_id",
    "name": "Rahul",
    "email": "rahul@gmail.com",
    "status": "pending"
  }
}
```

---

## 🔹 Errors

```
{
  "message": "Document not found"
}
```

```
{
  "message": "Contact not found"
}
```

```
{
  "message": "Email is required"
}
```

---

## 🧠 Notes

- A signer represents a person who needs to sign the document
- Signers are linked to a specific document
- Default status is `pending`
- Data is copied from contact (if used) to ensure immutability

---

---

### ✅ 2. Get Signers for Document

**GET** `/documents/:id/signers`

Fetch all signers assigned to a document.

---

## 🔹 Response

```
{
  "success": true,
  "signers": [
    {
      "_id": "signer_id",
      "name": "Rahul",
      "email": "rahul@gmail.com",
      "status": "pending"
    }
  ]
}
```

---

## 🔹 Errors

```
{
  "message": "Document not found"
}
```

---

## ⚠️ Important Notes

- Only the document owner can:
  - Add signers
  - View signers

- A document can have multiple signers
- Signers are stored independently of contacts

---

## 🔐 Security

- Protected using authentication middleware
- Ensures only authorized users can manage signers

---

## 🔄 Workflow

```
Create Document → Add Signers → Send Document → Signers Sign
```

---

## 🚀 Use Case

Signers are used to:

- Assign recipients for document signing
- Track signing progress
- Manage document workflow

---

## ✅ Status

All Signer APIs are working:

- Add Signer (manual + contact) ✅
- Get Signers ✅

# 📑 Template API Documentation

This section describes the APIs used to manage reusable document templates.

---

## 🌐 Base URL

```
http://localhost:5000/api/templates
```

---

## 🔐 Authentication

- All routes are **protected**
- Requires valid JWT stored in **HTTP-only cookies**
- Frontend must send credentials with requests

---

## 🧠 What is a Template?

A template is a **predefined document layout** that includes:

- A file (PDF)
- Widgets (fields like signature, name, etc.)
- Positions for signing

Templates are used to quickly create documents.

---

## 📌 Endpoints

---

### ✅ 1. Create Template

**POST** `/`

Create a new template.

#### Request Body

```json
{
  "title": "NDA Template",
  "fileUrl": "https://template.pdf",
  "widgets": [
    {
      "type": "signature",
      "x": 100,
      "y": 200,
      "width": 150,
      "height": 50,
      "page": 1,
      "signerIndex": 0
    },
    {
      "type": "name",
      "x": 50,
      "y": 100,
      "page": 1,
      "signerIndex": 0
    }
  ]
}
```

---

#### Response

```json
{
  "success": true,
  "template": {
    "_id": "template_id",
    "title": "NDA Template",
    "fileUrl": "https://template.pdf",
    "widgets": [...],
    "owner": "user_id"
  }
}
```

---

#### Notes

- `title` and `fileUrl` are required
- `widgets` define field positions and types
- `owner` is automatically assigned

---

### ✅ 2. Get All Templates

**GET** `/`

Fetch all templates created by the logged-in user.

#### Response

```json
{
  "success": true,
  "templates": [
    {
      "_id": "template_id",
      "title": "NDA Template"
    }
  ]
}
```

---

### ✅ 3. Get Single Template

**GET** `/:id`

Fetch a specific template by ID.

#### Response

```json
{
  "success": true,
  "template": {
    "_id": "template_id",
    "title": "NDA Template",
    "widgets": [...]
  }
}
```

---

#### Errors

```json
{
  "message": "Template not found"
}
```

---

### ✅ 4. Update Template

**PATCH** `/:id`

Update template details.

#### Request Body

```json
{
  "title": "Updated Template Name"
}
```

---

#### Response

```json
{
  "success": true,
  "template": {
    "_id": "template_id",
    "title": "Updated Template Name"
  }
}
```

---

### ✅ 5. Delete Template

**DELETE** `/:id`

Delete a template.

#### Response

```json
{
  "success": true,
  "message": "Template deleted"
}
```

---

## ⚠️ Important Notes

- Templates are **user-specific**
- Only the owner can:
  - View templates
  - Update templates
  - Delete templates

- Templates are reusable across multiple documents

---

## 🔐 Security

- Protected using authentication middleware
- Prevents unauthorized access
- Ensures data isolation per user

---

## 🔄 Workflow

```text
Create Template → Use Template → Create Document → Add Signers → Send → Sign
```

---

## 🧪 Testing Tips

- Login first to get cookie
- Use Postman or frontend with:

```js
fetch(url, {
  credentials: "include",
});
```

---

## 🚀 Use Case

Templates help:

- Save time when creating documents
- Standardize signing layouts
- Reuse common document formats

---

## ✅ Status

All Template APIs are working:

- Create Template ✅
- Get Templates ✅
- Get Single Template ✅
- Update Template ✅
- Delete Template ✅

# 🧩 Widget API Documentation

This section describes the APIs used to manage widgets (fields like signature, text, checkbox, etc.) for documents.

---

## 🌐 Base URL

```
http://localhost:5000/api/widgets
```

---

## 🔐 Authentication

- All routes are **protected**
- Requires valid JWT stored in **HTTP-only cookies**
- Frontend must send credentials with requests

---

## 🧠 What is a Widget?

A widget represents a **field inside a document**, such as:

- Signature
- Text input
- Checkbox
- Date
- Dropdown
- Number input

Widgets are linked to a specific document and define:

- Position (x, y)
- Page
- Assigned signer

---

## 📌 Endpoints

---

### ✅ 1. Create Widget

**POST** `/`

Create a new widget for a document.

---

#### Request Body

```json
{
  "documentId": "document_id",
  "type": "signature",
  "x": 100,
  "y": 200,
  "width": 150,
  "height": 50,
  "page": 1,
  "signerIndex": 0
}
```

---

#### Response

```json
{
  "success": true,
  "widget": {
    "_id": "widget_id",
    "document": "document_id",
    "type": "signature",
    "x": 100,
    "y": 200,
    "width": 150,
    "height": 50,
    "page": 1,
    "signerIndex": 0,
    "value": null
  }
}
```

---

#### Notes

- `documentId`, `type`, `page`, and `signerIndex` are required
- `value` will be filled later during signing
- Widget is linked to a specific document

---

### ✅ 2. Get Widgets by Document

**GET** `/document/:id`

Fetch all widgets for a specific document.

---

#### Response

```json
{
  "success": true,
  "widgets": [
    {
      "_id": "widget_id",
      "type": "signature",
      "x": 100,
      "y": 200,
      "page": 1,
      "signerIndex": 0,
      "value": null
    }
  ]
}
```

---

#### Notes

- Returns all widgets associated with the given document
- Used to render fields on the frontend

---

### ✅ 3. Delete Widget

**DELETE** `/:id`

Delete a widget.

---

#### Response

```json
{
  "success": true,
  "message": "Widget deleted"
}
```

---

#### Errors

```json
{
  "message": "Widget not found"
}
```

---

## ⚠️ Important Notes

- Widgets are stored in a **separate collection**
- Each widget is linked to a document using `documentId`
- Widgets define layout and structure of document fields
- Widget values (like signature/text) are filled during signing

---

## 🔐 Security

- Protected using authentication middleware
- Only the document owner can create/delete widgets
- Prevents unauthorized access

---

## 🔄 Workflow

```text
Create Document → Add Widgets → Send Document → Signers Fill Widgets → Complete Document
```

---

## 🧪 Testing Tips

- Login first to receive cookie
- Use Postman or frontend with:

```js
fetch(url, {
  credentials: "include",
});
```

---

## 🚀 Use Case

Widgets are used to:

- Define where users sign or input data
- Render interactive fields on documents
- Capture user input during signing

---

## ✅ Status

All Widget APIs are working:

- Create Widget ✅
- Get Widgets by Document ✅
- Delete Widget ✅

# ✍️ Signature API Documentation

This section describes the APIs used to handle document signing.

---

## 🌐 Base URL

```id="sig1"
http://localhost:5000/api/signatures
```

---

## 🔓 Authentication

* This API is **public (no authentication required)**
* Signers can sign documents using a secure link
* No login is required for signing

---

## 🧠 What is a Signature?

A signature represents a signer’s approval on a document.

It includes:

* Signature image (URL)
* Position (x, y, width, height)
* Page number
* Associated document and signer

---

## 📌 Endpoints

---

### ✅ 1. Create Signature

**POST** `/`

Save a signature for a document.

---

#### Request Body

```json id="sig2"
{
  "documentId": "document_id",
  "signerId": "signer_id",
  "page": 1,
  "x": 100,
  "y": 200,
  "width": 150,
  "height": 50,
  "signatureImageUrl": "https://example.com/signature.png"
}
```

---

#### Response

```json id="sig3"
{
  "success": true,
  "message": "Signature saved",
  "signature": {
    "_id": "signature_id",
    "document": "document_id",
    "signer": "signer_id",
    "signatureImageUrl": "https://example.com/signature.png"
  },
  "documentStatus": "completed"
}
```

---

#### Errors

```json id="sig4"
{
  "message": "documentId, signerId and signatureImageUrl are required"
}
```

```json id="sig5"
{
  "message": "Document not found"
}
```

```json id="sig6"
{
  "message": "Invalid signer"
}
```

```json id="sig7"
{
  "message": "Signer already signed"
}
```

---

## 🔐 Security

* No authentication required
* Security is enforced by:

  * Validating signer belongs to document
  * Preventing duplicate signatures
  * Using unique signing links

---

## 🔄 Workflow

```text id="sig8"
Send Document → Signer receives email → Opens link → Submits signature → Document updated
```

---

## ⚙️ Internal Behavior

When a signature is created:

```text id="sig9"
1. Signature is stored in database
2. Signer status is updated → "signed"
3. If all signers have signed:
   → Document status is updated → "completed"
```

---

## 🧪 Testing Tips

* Use IDs from email signing link
* Test with multiple signers
* Use any valid image URL for signature

---

## 🚀 Use Case

Signature API enables:

* External users to sign documents
* Tracking of signer activity
* Completion of document workflows

---

## ✅ Status

* Create Signature API implemented ✅
* Auto-complete document logic implemented ✅
* Public access (no auth required) ✅
