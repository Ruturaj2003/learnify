import { createUploadthing, type FileRouter } from 'uploadthing/next';

// build/upload file routes
const uploadBuilder = createUploadthing();

export const ourFileRouter = {
  pdfUploader: uploadBuilder({
    pdf: { maxFileSize: '128MB', maxFileCount: 1 },
  })
    .middleware(() => ({}))
    .onUploadComplete(async ({ file }) => {
      console.log('PDF Uploaded', file.ufsUrl);

      // TODO Save it to Mongo DB
      return { success: true };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
