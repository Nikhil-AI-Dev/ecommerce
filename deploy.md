# Deployment Guide: Sri Lakshmi Narayana Handlooms

This guide outlines the critical steps to move the application from your local machine to a live public URL (Vercel, Netlify, or Replit).

## 1. Environment Variables Configuration

You must set the following environment variables in your deployment dashboard (e.g., Vercel Settings -> Environment Variables):

### **Core Configuration**
| Variable | Description | Example Value |
|----------|-------------|---------------|
| `DATABASE_URL` | PostgreSQL connection string | `postgres://user:pass@host:port/db` |
| `NEXTAUTH_SECRET` | A random long string for session encryption | `your-random-long-secret-key` |
| `NEXTAUTH_URL` | Your public URL | `https://sri-lakshmi.vercel.app` |

### **Payment (Razorpay)**
| Variable | Description |
|----------|-------------|
| `RAZORPAY_KEY_ID` | Your Razorpay API Key ID |
| `RAZORPAY_KEY_SECRET` | Your Razorpay API Secret |

### **Email (Optional)**
| Variable | Description |
|----------|-------------|
| `EMAIL_HOST` | SMTP server (e.g., smtp.gmail.com) |
| `EMAIL_PORT` | SMTP port (e.g., 587) |
| `EMAIL_USER` | Email account username |
| `EMAIL_PASS` | Email account password/app secret |

---

## 2. Database Migration

The application uses Prisma. To initialize your production database, run the following commands locally (pointing to your production `DATABASE_URL`):

```bash
# Push the schema to the database
npx prisma db push

# (Optional) Seed initial products
npm run seed
```

---

## 3. Deployment Steps (Vercel - Recommended)

1. **Connect Repository**: Push your code to GitHub/GitLab/Bitbucket and connect it to Vercel.
2. **Configure Build Settings**:
   - Framework Preset: **Next.js**
   - Build Command: `npm run build`
   - Output Directory: `.next`
3. **Add Environment Variables**: Input the variables listed in section 1.
4. **Deploy**: Click "Deploy". Vercel will automatically handle SSL, CDN, and global scaling.

---

## 4. Mobile App Production Ready

To point your mobile apps to the live server:
1. Open `mobile/constants/Config.js`.
2. Change `API_BASE_URL` to your live `NEXTAUTH_URL`.
3. Rebuild the APK/IPA for distribution.

---

## 5. Security & Quality Checklist

- [x] **Vulnerability Audit**: Run `npm audit` (Found 0 vulnerabilities).
- [ ] **SSL Enforcement**: Ensure `https` is used (Vercel does this automatically).
- [ ] **Secrets Management**: Never commit `.env` files to git.
- [ ] **Rate Limiting**: (Future) Add rate limiting to `/api/mobile/login` for enhanced security.
- [ ] **Live Keys**: Swap all "mock" or "test" API keys with production versions in your dashboard.
