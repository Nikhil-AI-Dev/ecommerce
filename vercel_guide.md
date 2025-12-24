# Step-by-Step Vercel Deployment Guide

Your code is now live on GitHub: [Nikhil-AI-Dev/ecommerce](https://github.com/Nikhil-AI-Dev/ecommerce). 

Follow these exact steps to launch your public URL:

### Step 1: Login to Vercel
1. Go to [vercel.com](https://vercel.com).
2. Click **"Sign Up"** or **"Log In"**.
3. Select **"Continue with GitHub"**. This will automatically link your GitHub account to Vercel.

### Step 2: Import Your Project
1. Once logged in, you will see a dashboard. Click the **"Add New..."** button and select **"Project"**.
2. You will see a list of your GitHub repositories. Find **"ecommerce"** and click the **"Import"** button.

### Step 3: Configure Project
1. **Framework Preset**: Vercel should automatically detect **Next.js**.
2. **Root Directory**: Keep it as `./` (the default).
3. **Environment Variables** (CRITICAL):
   Before clicking deploy, expand the **"Environment Variables"** section and add these:
   
   - `NEXTAUTH_SECRET`: Generate a random string (e.g., `sri-lakshmi-secret-2025`).
   - `NEXTAUTH_URL`: Use your eventual Vercel URL (or update it after the first deploy).
   - `DATABASE_URL`: Add your PostgreSQL connection string from your DB provider (like Supabase, Railway, or Neon).
   
   > [!TIP]
   > For the first deploy, you can use a temporary string for `NEXTAUTH_URL` like `http://localhost:3000` just to see the build succeed, then update it later.

### Step 4: Deploy
1. Click the **"Deploy"** button.
2. Wait about 1-2 minutes. You will see a "Congratulations!" confetti screen with a thumbnail of your site.

### Step 5: Final Check
1. Click on the thumbnail to visit your **Public URL**.
2. Check if the "Artisanal Elegance" hero section loads.
3. Verify that the shop categories filters work.

---

### Post-Deployment (Mobile Apps)
Once you have your public URL (e.g., `https://ecommerce-nikhil.vercel.app`):
1. Open `mobile/constants/Config.js` in your editor.
2. Update `API_BASE_URL` to your new public URL.
3. Pushing this change to GitHub will automatically trigger a new build on Vercel!

---
> [!IMPORTANT]
> Since this is a production environment, ensure your `DATABASE_URL` is a live database. If you need help setting up a free database on Supabase or Neon, let me know!
