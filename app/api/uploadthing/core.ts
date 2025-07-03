import { createUploadthing, type FileRouter } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  logoUploader: f({ image: { maxFileSize: "4MB" } }) // accept image files only
    .onUploadComplete(({ file }) => {
      console.log("Uploaded file:", file.url);
    }),
  videoUploader: f({ video: { maxFileSize: "32MB" } }) // accept video files only
    .onUploadComplete(({ file }) => {
      console.log("Uploaded file:", file.url);
    }),
  documentUploader: f({ 
    pdf: { maxFileSize: "10MB" },
    text: { maxFileSize: "5MB" },
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": { maxFileSize: "10MB" },
    "application/vnd.openxmlformats-officedocument.presentationml.presentation": { maxFileSize: "10MB" }
  }) // accept document files
    .onUploadComplete(({ file }) => {
      console.log("Uploaded document:", file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
