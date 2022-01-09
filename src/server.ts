import express, { Request, Response } from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

interface Query {
  grade: string;
  program: string;
  subject: string[];
  teacher: string;
};

const app = express()
app.use(cors())

const prisma = new PrismaClient()

app.get('/classes', async (req: Request, res: Response) => {
  const {program, subject, teacher, grade: grade_} = req.query as unknown as Query;
  console.log(subject)
  const grade = grade_ == undefined ? undefined : parseInt(grade_);
  const classes = await prisma.class.findMany({
    where: {
      program,
      grade,
      teacher,
      subject: {
        in: subject
      }
    },
    orderBy: [
      {
        grade: 'asc'
      }
    ]
  })
  res.json(classes)
})

const PORT = process.env.PORT || 5001
app.listen(PORT)
console.log(`Listening on http://localhost:${PORT}`)
