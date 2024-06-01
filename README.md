# Next.js 14 - Twitch Clone

Twitch Clone application, uses TypeScript (StandardJS), Tailwind + Shadcn/UI, MongoDB, the application only has basic functionalities. This project is a test one.

- Authentication using clerk/nextjs v4.30.
- Create channel for live video streaming along with live chat.
- Option to follow and unfollow a channel.
- Option to block a user.
- Search for channels and users.
- Integration with uploadthing.com to upload and view images files.
- Integration with LiveKit.io to generate stream video and chat.

## Configure environment variables

Rename the file **.env.template** to **.env.local**

- Clerk: Create an account on https://clerk.com, create an application and then go to Api Keys and copy the values of NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=
```

- MongoDB URL:

```
DATABASE_URL="mongodb+srv://user:password@domain.com/name_bd"
```

- UploadThing: Go to uploadthing.com, create an account, after logging in, create an app, in API Keys copy UPLOADTHING_SECRET and UPLOADTHING_APP_ID

```
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=
```

- LiveKit: Go to liveKit.io and sign up. After logging in, create a project. Then you must go to the left menu and click in Settings, in KEYS must create a Key and then copy the variables

```
LIVEKIT_API_URL=
LIVEKIT_API_KEY=
LIVEKIT_API_SECRET=
NEXT_PUBLIC_LIVEKIT_WS_URL=
```

- Rebuild the node modules and build Next

```
npm install
npm run dev
```
