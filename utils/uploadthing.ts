import { generateReactHelpers } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core"; // Adjust to your file router path


export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>();
