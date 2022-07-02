import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  let {keyword, cursor, limit}= req.query;
  
  let realLimit : number;

  //fetch 1 more
  realLimit = parseInt(limit as string) + 1;
  
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/resources/works/?start=${cursor}&max=${realLimit}&expandLevel=1&search=${keyword}`, {
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

  //if the length of the array is equal to the limit that means we have more we can fetch
  res.status(200).json({
    work : data.work,
    hasMore : data.work.length === realLimit
  });
}
