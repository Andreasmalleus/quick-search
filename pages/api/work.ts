// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const {keyword} = req.query;
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/resources/works/?start=0&max=10&expandLevel=1&search=${keyword}`, {
    headers : {
      "Content-Type" : "application/json",
      "Accept" : "application/json",
      "Access-Control-Allow-Origin": "*",
    }
  })

  const data = await response.json()
  if(!data){
    res.status(400).json({
      error: 'Something went wrong'
    })
  }
  res.status(200).json(data);
}
