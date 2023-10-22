import { getServerSession } from "next-auth";
import { options } from "@app/api/auth/[...nextauth]/options";
export const dynamic = "force-dynamic";
async function GetSession() {
  let session = null;
  let retryCount = 0;
  const maxRetries = 3; // Maximum number of retries
  while (retryCount < maxRetries && session === null) {
    try {
      session = await getServerSession(options);
      
    } catch (error) {
        // Handle any errors if needed
        console.error("Error fetching session:", error);
        
    }

    if (session === null) {
      // Sleep for a moment before retrying (optional)
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    retryCount++;
  }
  return session?.user?._doc;
}

export default GetSession;
