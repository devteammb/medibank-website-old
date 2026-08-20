# Auth API additions: Password setup

## New endpoints

### `POST /api/v1/auth/password/setup`
Initiates password setup for a patient account.

**Request body**
```json
{ "email": "user@example.com" }
```
- `email` is required and validated as `EmailStr`.

**Success response** (generic anti-enumeration response)
```json
{
  "message": "If this email exists, a password setup link has been sent.",
  "expires_in": 1800
}
```

### `POST /api/v1/auth/password/setup/{setup_uuid}`
Completes password creation using a setup token.

**Path param**
- `setup_uuid` must be a valid UUID string.

**Request body**
```json
{ "password": "NewStrongPass123!" }
```
- `password` minimum length is 8.

**Success response**
```json
{ "message": "Password created successfully" }
```

## Error cases

| HTTP status | Condition | Message |
|---|---|---|
| 400 | Invalid UUID format | `Invalid setup UUID` |
| 401 | Expired or invalid token | `Password setup link expired or invalid` |
| 401 | Token exists but linked user missing | `Invalid password setup link` |

## Security / infra notes
- Password setup tokens are UUID-based and stored in Redis using key format `password_setup:{uuid}`.
- Token TTL is 30 minutes (`1800` seconds).
- Tokens are single-use and deleted after successful password setup.
- Email dispatch uses SendGrid when configured; otherwise development mode logs/prints a mock link.
- Current setup link format points to frontend route: `https://app.medibank.in/create-password/{uuid}`.

## Curl examples

### Request setup link
```bash
curl -X POST "https://<api-host>/api/v1/auth/password/setup" \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com"}'
```

### Create password with UUID token
```bash
curl -X POST "https://<api-host>/api/v1/auth/password/setup/<setup_uuid>" \
  -H "Content-Type: application/json" \
  -d '{"password":"NewStrongPass123!"}'
```
