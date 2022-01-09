# A Prototype, built with Svelte & Prisma

ManageBac has a number of filtering mechanisms, and I found it a challenge to describe how it could / should work. So I made an app instead. It's a good little project where I learned a lot about modern tooling. 

It uses:

- Svelte.js for the JavaScript framework
- Tailwind for the CSS
- Prisma for the database (SQLite)

## Getting started

```
git clone https://github.com/classroomtechtools/protoWithSveltePrisma.git
cd protoWithSveltePrisma
npm install
npx prisma generate
npm run dev
```

The last command will launch three servers, accessible at the following locations:

- An API that provides a class entity: http://localhost:5001/classes
- Prisma Studio (http://localhost:5555)
- The app itself (http://localhost:8080)

Changes made to the database via Prisma Studio can be saved, and then on next query in the app will reflect any new or updated records.

The Svelte App is entirely reactive, changes to any of the filter settings automatically calls the API, which fetches the data.
