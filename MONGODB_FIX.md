# 🔧 MongoDB Connection Timeout - Fix Guide

## ❌ Error You're Seeing:
```
MongooseError: Operation `users.findOne()` buffering timed out after 10000ms
```

## ✅ What I Fixed:

### 1. **Updated MongoDB Connection Configuration**
Added better connection options in `config/connectDB.js`:
- ✅ Increased timeout to 30 seconds
- ✅ Added IPv4 preference
- ✅ Better error handling
- ✅ Connection event listeners

### 2. **Fixed Frontend API Endpoint**
- ✅ Changed signup endpoint from `/user/login` to `/user/signup`

## 🚀 How to Fix MongoDB Atlas Connection

### **Most Common Issue: IP Whitelist**

MongoDB Atlas blocks connections from IP addresses that aren't whitelisted. Here's how to fix it:

#### **Step 1: Login to MongoDB Atlas**
1. Go to: https://cloud.mongodb.com
2. Login with your credentials

#### **Step 2: Whitelist Your IP Address**

1. **Click on "Network Access"** (left sidebar)
2. **Click "Add IP Address"**
3. **Choose one of these options:**

   **Option A: Allow from Anywhere (Easiest for Testing)**
   - Click "Allow Access from Anywhere"
   - This adds `0.0.0.0/0` to whitelist
   - ⚠️ Not recommended for production, but perfect for development

   **Option B: Add Your Current IP**
   - Click "Add Current IP Address"
   - This adds only your current IP

4. **Click "Confirm"**

#### **Step 3: Verify Connection String**

Your current connection string:
```
mongodb+srv://shubham:shubham%405932@miniassignment.xpubucz.mongodb.net/
```

Make sure:
- ✅ Username: `shubham`
- ✅ Password: `shubham@5932` (URL encoded as `shubham%405932`)
- ✅ Cluster: `miniassignment.xpubucz.mongodb.net`

#### **Step 4: Check Cluster Status**

1. Go to "Database" in MongoDB Atlas
2. Make sure your cluster is **Active** (green status)
3. If it's paused, click "Resume"

## 🔄 Restart Your Backend

After fixing MongoDB Atlas:

```bash
# Stop the current server (Ctrl+C)
# Then restart:
cd c:\b.tech\TASK\Backend
node index.js
```

## ✅ What You Should See:

If successful, you'll see:
```
Server Start successFully
✅✅✅ Database Connected Successfully!
📊 MongoDB Host: miniassignment-shard-00-00.xpubucz.mongodb.net
📊 Database Name: LMS
🔅📊 connectDB function called
```

## ⚠️ If Still Not Working:

### **Test 1: Check Internet Connection**
```bash
ping google.com
```

### **Test 2: Test MongoDB Connection String**
Try connecting with MongoDB Compass:
1. Download: https://www.mongodb.com/try/download/compass
2. Use your connection string
3. If Compass can't connect, the issue is with MongoDB Atlas setup

### **Test 3: Alternative - Use Local MongoDB**

If MongoDB Atlas keeps timing out, use local MongoDB:

1. **Install MongoDB locally:**
   - Download: https://www.mongodb.com/try/download/community
   - Install and start MongoDB service

2. **Update `.env` file:**
   ```env
   MONGODB_URI=mongodb://localhost:27017/LMS
   JWT_SECRET=yerahajwtkasecret
   ```

3. **Restart backend**

## 📋 Quick Checklist:

- [ ] MongoDB Atlas IP whitelist configured (0.0.0.0/0)
- [ ] Cluster is active (not paused)
- [ ] Internet connection working
- [ ] Username and password correct
- [ ] Backend restarted after changes

## 🎯 Most Likely Solution:

**90% of the time, this error is fixed by:**
1. Going to MongoDB Atlas
2. Network Access → Add IP Address
3. Click "Allow Access from Anywhere"
4. Restart your backend

---

## 📞 Need More Help?

If you're still stuck:
1. Check the exact error message in terminal
2. Try connecting with MongoDB Compass
3. Verify your MongoDB Atlas cluster is active
4. Consider using local MongoDB for development

---

**After fixing, restart your backend and you should see the success message!** 🎉
