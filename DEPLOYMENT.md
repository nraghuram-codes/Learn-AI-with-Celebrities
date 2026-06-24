# Deployment Guide - Learn with Celebs

This guide will help you deploy your "Learn with Celebs" application so it can be accessed from any device with a link.

## Deployment Architecture

- **Frontend**: Vercel (React + Vite)
- **Backend**: Render (Express.js + Node.js)
- **Database**: Render PostgreSQL

## Prerequisites

- GitHub account (for code hosting)
- Vercel account (free)
- Render account (free tier available)
- Your project code pushed to GitHub

---

## Step 1: Push Code to GitHub

If you haven't already, push your project to GitHub:

```bash
# Initialize git if not already done
cd "c:/Users/RaghuRam/OneDrive/Attachments/Desktop/Learn with celebs"
git init
git add .
git commit -m "Initial commit"

# Create a repository on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/learn-with-celebs.git
git branch -M main
git push -u origin main
```

---

## Step 2: Deploy Backend to Render

### 2.1 Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Verify your email

### 2.2 Deploy Backend
1. Go to Render Dashboard → **New** → **Web Service**
2. Connect your GitHub repository
3. Configure the service:
   - **Name**: `learn-with-celebs-backend`
   - **Region**: Choose nearest region
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. **Environment Variables** (click "Advanced" → "Add Environment Variable"):
   ```
   NODE_ENV = production
   PORT = 10000
   JWT_SECRET = your_super_secret_jwt_key_change_this_in_production
   JWT_EXPIRE = 7d
   ```
5. **Database Setup**:
   - Click **New** → **PostgreSQL**
   - Name: `learn-with-celebs-db`
   - Database: `ai_learning_platform`
   - User: `learn_with_celebs_user`
   - Wait for database to be created
6. **Add Database URL to Backend**:
   - Go to your PostgreSQL database in Render
   - Copy the **Internal Database URL**
   - Go back to your web service → **Environment Variables**
   - Add: `DATABASE_URL = [paste the internal database URL]`
7. **CORS Configuration**:
   - Add: `CORS_ORIGIN = https://your-frontend-domain.vercel.app`
   - (You'll update this after deploying the frontend)
8. Click **Deploy Web Service**

### 2.3 Run Database Migrations
After the backend deploys, you need to set up the database:

1. Go to your backend service on Render
2. Click **Shell** (or use Render CLI)
3. Run these commands:
   ```bash
   cd backend
   npx prisma generate
   npx prisma migrate dev --name init
   npx prisma db seed
   ```

4. Your backend URL will be: `https://learn-with-celebs-backend.onrender.com`

---

## Step 3: Deploy Frontend to Vercel

### 3.1 Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Verify your email

### 3.2 Deploy Frontend
1. Go to Vercel Dashboard → **Add New** → **Project**
2. Import your GitHub repository
3. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. **Environment Variables**:
   - Click **Environment Variables** → **Add New**
   - Name: `VITE_API_URL`
   - Value: `https://learn-with-celebs-backend.onrender.com/api`
   - (Replace with your actual Render backend URL)
5. Click **Deploy**

### 3.3 Update Backend CORS
After your frontend is deployed:
1. Copy your Vercel URL (e.g., `https://your-app.vercel.app`)
2. Go to Render → Backend service → **Environment Variables**
3. Update `CORS_ORIGIN` to your Vercel URL
4. Redeploy the backend

---

## Step 4: Access Your Application

After both deployments are complete:

- **Frontend URL**: `https://your-app-name.vercel.app`
- **Backend API**: `https://learn-with-celebs-backend.onrender.com/api`
- **Health Check**: `https://learn-with-celebs-backend.onrender.com/api/health`

Your application is now accessible from any device with the frontend URL!

---

## Step 5: Test the Deployment

1. Open your Vercel URL in a browser
2. Try registering a new user
3. Login with the credentials
4. Browse courses and enroll
5. Access admin panel with:
   - Email: `admin@learnwithcelebs.com`
   - Password: `admin123`

---

## Environment Variables Reference

### Frontend (.env)
```
VITE_API_URL=https://your-backend-url.onrender.com/api
```

### Backend Environment Variables
```
NODE_ENV=production
PORT=10000
DATABASE_URL=postgresql://user:password@host:port/database
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d
CORS_ORIGIN=https://your-frontend-url.vercel.app
```

---

## Troubleshooting

### Backend Deployment Issues
- **Database Connection**: Ensure DATABASE_URL is correct and database is running
- **Port Issues**: Render uses port 10000 by default
- **Build Failures**: Check Render logs for specific errors

### Frontend Deployment Issues
- **API Connection**: Verify VITE_API_URL matches your backend URL
- **CORS Errors**: Ensure CORS_ORIGIN in backend matches your Vercel URL
- **Build Failures**: Check Vercel deployment logs

### Database Issues
- If migrations fail, use Render Shell to run them manually
- If seeding fails, check the seed.js file for errors
- Use Prisma Studio to verify data: `npx prisma studio`

---

## Updating Your Application

### To Update Frontend
1. Push changes to GitHub
2. Vercel automatically deploys on push to main branch
3. Or manually redeploy from Vercel dashboard

### To Update Backend
1. Push changes to GitHub
2. Render automatically deploys on push to main branch
3. Or manually redeploy from Render dashboard

### To Update Database Schema
1. Make changes to `backend/prisma/schema.prisma`
2. Push to GitHub
3. Use Render Shell to run:
   ```bash
   npx prisma migrate dev --name your_migration_name
   ```

---

## Cost Summary (Free Tier)

**Vercel (Frontend)**:
- Free: 100GB bandwidth, unlimited deployments
- Perfect for this project

**Render (Backend + Database)**:
- Free Web Service: 750 hours/month
- Free PostgreSQL: 90 days (then $7/month)
- Perfect for development and small projects

**Total**: Free for development, minimal cost for production database

---

## Alternative Deployment Options

If you prefer other platforms:

### Netlify (Frontend) + Railway (Backend)
- Similar setup, different platforms
- Railway offers free PostgreSQL

### Railway (Full Stack)
- Deploy both frontend and backend together
- Built-in database
- Simpler but less customizable

### DigitalOcean App Platform
- More control over infrastructure
- $5/month minimum
- Good for scaling

---

## Security Best Practices

1. **Never commit .env files** - They're in .gitignore
2. **Use strong JWT_SECRET** - Generate a random string
3. **Enable HTTPS** - Both Vercel and Render provide this
4. **Update CORS_ORIGIN** - Only allow your frontend domain
5. **Monitor logs** - Check for suspicious activity
6. **Regular backups** - Render handles database backups

---

## Support

If you encounter issues:
- Check deployment logs (Vercel/Render dashboards)
- Verify environment variables are set correctly
- Ensure database migrations ran successfully
- Test API endpoints with tools like Postman

---

## Next Steps

After successful deployment:
1. Share your Vercel URL with users
2. Monitor performance in both dashboards
3. Set up custom domain (optional)
4. Configure analytics (optional)
5. Add payment gateway if needed (optional)

Happy deploying! 🚀
