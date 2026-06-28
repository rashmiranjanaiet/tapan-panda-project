# Learnify - Online Learning Platform

**Live Demo:** https://learnify-two-theta.vercel.app/

## Overview

Learnify is a modern online learning platform that lets students create, explore, enroll in, and study AI-assisted courses.

## Tech Stack

| Frontend | Framework | Styling | Recommended Deployment |
| --- | --- | --- | --- |
| React | Next.js 15 | Tailwind CSS | Vercel |

## Important Deployment Note

This project is a server-side Next.js app. It uses Clerk authentication, Next.js API routes, MongoDB Atlas database access, and AI service keys.

Because of that, it will not work correctly on plain GitHub Pages. GitHub Pages only serves static files and cannot run the app's API routes or middleware. Deploy this project to Vercel or another host that supports Next.js server functions.

## Environment Variables

Create a local `.env.local` file using `.env.example` as a guide:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
MONGODB_URI=
GEMINI_API_KEY=
YOUTUBE_API_KEY=
AI_GURU_LAB_API=
```

## Installation and Setup

```bash
npm ci
npm run dev
```

Open http://localhost:3000 in your browser.

## Build

```bash
npm run build
```

The production build requires valid Clerk and database environment variables.

## Contact

Developed by Vivek Saha  
Email: viveksaha096@gmail.com  
Website: https://learnify-two-theta.vercel.app/
