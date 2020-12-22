import { S3 } from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';

export const s3 = new S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY,
  endpoint: 'https://s3.csh.rit.edu',
  s3BucketEndpoint: false,
  s3ForcePathStyle: true
});

export const uploadS3 = multer({
  storage: multerS3({
    // @ts-ignore
    s3: s3,
    acl: 'public-read',
    bucket: 'brickwall',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: (req, file, cb) => {
      console.log(file);
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, file.originalname);
    }
  })
});
