import { NextResponse } from "next/server";

 export async function POST(req) {

  const url = "https://iam.cloud.ibm.com/identity/token"; // URL d'authentification

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      apikey: process.env.NEXT_PUBLIC_API_KEY,
      grant_type: "urn:ibm:params:oauth:grant-type:apikey",
    }),
  });
  if (!response.ok) {
    throw new Error("Failed to obtain access token");
  }

  const data = await response.json();
  return NextResponse.json(data);
}