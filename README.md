# TwitchEduApi

TwitchEduApi - ta'lim platformasi uchun API.

## O'rnatish

1. Repozitoriyani klonlash:
   ```
   git clone https://github.com/your-username/twitcheduapi.git
   ```

2. Kerakli paketlarni o'rnatish:
   ```
   npm install
   ```

3. `.env` faylini yaratish va to'ldirish:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

4. Serverni ishga tushirish:
   ```
   npm run dev
   ```

## API Endpointlar

- Auth:
  - POST /api/auth/register/student
  - POST /api/auth/register/teacher
  - POST /api/auth/login

- Users:
  - GET /api/users/me
  - PUT /api/users/me

- Streams:
  - POST /api/streams
  - GET /api/streams
  - GET /api/streams/:id
  - PUT /api/streams/:id
  - DELETE /api/streams/:id

- Groups:
  - GET /api/groups
  - POST /api/groups
  - PUT /api/groups/:id
  - DELETE /api/groups/:id

- Ratings:
  - POST /api/ratings/student/:studentId
  - GET /api/ratings/group/:groupId
  - GET /api/ratings/student/:studentId

- Notifications:
  - GET /api/notifications
  - PUT /api/notifications/:id/read

## Litsenziya

MIT