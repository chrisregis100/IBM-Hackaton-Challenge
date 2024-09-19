let token = "";
let tokenExpiration = 0;
const url = "https://iam.cloud.ibm.com/identity/token"; // URL complète

const getAccessToken = async () => {
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
  token = data.access_token;
  
  tokenExpiration = Date.now() + data.expires_in * 1000;
};

export default async function getToken() {
  // Vérifier si le token est expiré ou presque expiré
  if (!token || Date.now() >= tokenExpiration - 60000) {
    // Renouvelle 60 secondes avant l'expiration
    await getAccessToken();
  }
  return token;
}
