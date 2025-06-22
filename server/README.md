
# Coreleven tRPC Server

A TypeScript tRPC server for the Coreleven application with Supabase integration.

## Features

- **tRPC API** with type-safe procedures
- **Supabase Authentication** integration
- **Grove Management** (Personal and Auto-Groves)
- **Invite Code Validation** during signup
- **JWT Tokens** for audio room access
- **CORS** configured for frontend integration

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp .env.example .env
```

3. Update `.env` with your Supabase credentials:
```env
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
JWT_SECRET=your_jwt_secret_key
```

4. Start development server:
```bash
npm run dev
```

## API Routes

### Authentication (`/trpc/auth`)
- `validateInviteCode` - Validate invite codes
- `joinGroveWithCode` - Join grove with invite code

### Groves (`/trpc/groves`)
- `getUserGroves` - Get user's groves
- `createGrove` - Create new grove
- `updateGrove` - Update grove settings
- `deleteGrove` - Delete grove
- `getMatchingGroves` - Get compatible groves for auto-matching

### Audio (`/trpc/audio`)
- `generateRoomToken` - Generate JWT for audio room access
- `getActiveRooms` - Get active audio rooms

## Development

```bash
# Development with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run type-check
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `SUPABASE_URL` | Your Supabase project URL | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | Yes |
| `JWT_SECRET` | Secret for signing audio room JWTs | Yes |
| `PORT` | Server port (default: 3001) | No |
| `FRONTEND_URL` | Frontend URL for CORS | No |

## Type Safety

This server exports its router type for use in the frontend:

```typescript
import type { AppRouter } from './server/src/routers';
```
