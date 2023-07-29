## user api

### register
POST /api/users

req body:
```
username: required
email: required|email
password: required
name: required
```

response 200:
```json
{
  "data": {
    "id": 3,
    "username": "chopper2",
    "email": "chopper2@mail.com",
    "name": "Chopper"
  }
}
```

response 400:
```json
{
  "message": "The given data was invalid",
  "details": [
    {
      "message": "\"email\" is required",
      "context": {
        "label": "email",
        "key": "email"
      }
    }
  ]
}
```

### login
GET /api/users/login
req body:
```
username: required
password: required
```

response 200:
```json
{
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNob3BwZXIiLCJuYW1lIjoiQ2hvcHBlciIsImVtYWlsIjoiY2hvcHBlckBtYWlsLmNvbSIsImlhdCI6MTY5MDYyNzgzNywiZXhwIjoxNjkwNzE0MjM3fQ.0ajwtu54ugf_ahFTl1gdbop9Jtmxn5EZmJUy3dD2dCk"
  }
}
```

### profile
GET /api/users/profile

Authorization: Bearer

response 200:
```json
{
  "data": {
    "id": 1,
    "username": "chopper",
    "email": "chopper@mail.com",
    "name": "Chopper",
    "created_at": "2023-07-29T08:54:59.187Z",
    "updated_at": "2023-07-29T10:52:54.236Z"
  }
}
```

### refresh token
POST /api/users/refresh-token

response 200:
```json
{
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNob3BwZXIiLCJuYW1lIjoiQ2hvcHBlciIsImVtYWlsIjoiY2hvcHBlckBtYWlsLmNvbSIsImlhdCI6MTY5MDYzODcyNywiZXhwIjoxNjkwNjM4NzQ3fQ.qXhuoB5DeZgpkt39LYh5lcTRtaV80bWKwi0sGrSi-U8"
  }
}
```