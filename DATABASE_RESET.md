# Database Reset Guide

## Issue
The PostgreSQL database has stale or incorrect course IDs that don't match the expected UUIDs.

## Solution: Reset PostgreSQL Database

### Option 1: Using psql Command Line (Recommended)

```bash
# Open Command Prompt or PowerShell

# Connect to PostgreSQL
psql -U postgres -h localhost -p 5432

# In the psql prompt, run these commands:
DROP DATABASE IF EXISTS ai_learning_platform;
CREATE DATABASE ai_learning_platform;

# Exit psql
\q
```

### Option 2: Using pgAdmin (GUI)
1. Open pgAdmin
2. Right-click on `ai_learning_platform` database
3. Select "Delete/Drop"
4. Create a new database named `ai_learning_platform`

## After Resetting Database

Once the database is reset, run:

```bash
cd backend

# Create new migrations
npx prisma migrate deploy

# Or reset Prisma (includes migrations):
npx prisma db push

# Seed the database
npx prisma db seed
```

## Verify the Fix

1. Start the backend server: `npm start`
2. Check that courses are created with UUIDs
3. Reload the frontend and click on a course
4. Video generation should now work!

## Database Connection Details
- Host: localhost
- Port: 5432
- Username: postgres  
- Password: 630402
- Database: ai_learning_platform

## If You Get Connection Errors

Make sure PostgreSQL is running:

```bash
# Windows - Check if PostgreSQL service is running
Get-Service -DisplayName "postgres*"

# To start PostgreSQL:
# Go to Services and start "postgresql-x64-XX"
```
