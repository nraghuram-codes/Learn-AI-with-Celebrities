# Database Migration Instructions

## Issue
Changed Course model ID from UUID to auto-incrementing Int to match frontend expectations.

## Steps to Apply Migration

### Option 1: Reset Database (Development Only)
```bash
cd backend

# Remove old database
rm prisma/dev.db

# Create new migration
npx prisma migrate dev --name change_course_id_to_int

# Seed the database
npx prisma db seed
```

### Option 2: Create and Apply Migration
```bash
cd backend

# Create migration
npx prisma migrate dev --name change_course_id_to_int

# Seed the database
npx prisma db seed
```

## Schema Changes
- Course: id changed from `String @id @default(uuid())` to `Int @id @default(autoincrement())`
- Enrollment: courseId changed from `String` to `Int`
- Progress: courseId changed from `String` to `Int`

## What This Fixes
- Frontend now correctly accesses courses with numeric IDs (1, 2, 3, etc.)
- Video generation will work with proper course lookups
- All course-related operations will match expected IDs
