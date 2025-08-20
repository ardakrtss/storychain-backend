const admin = require('firebase-admin');

// Firebase Admin SDK configuration
const serviceAccount = {
  "type": "service_account",
  "project_id": "storychain-website",
  "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID || "40280472b81748610313c48ace0d1b05ea368747",
  "private_key": process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') : "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC8dsdzWkrQfh/N\nzgIjiwTGXVqw88Ng3oFU/fAcuS/kmlulSUeaacJftlOuQxXX2428PFKZUn/Xex6N\n7KddqOtgoARZi3gPlqEocP4hAOw4m8ZKkacQZSqg0qCB7jb+Cih+sn3OOiF/gcjE\nhB2CSIyrqMDMW1h2dn3Iw3B0wSIhIIS6hSAaRv1sEapmezSBfo9RSKo/CPObA/hI\nj8M7bQUQPHiiUxGR3BEdQ51ItqIBwrSTysevOq7KOZyEjhXNcIa9XbaaQnGPzpKz\nHA3NxYfmE2LuupGhMUxxUzVk8Q1FU3JnJZS3mEGAVEaVuHBeCbOrup0ICCrR/Rz+\nKKNqxqlVAgMBAAECgf8rO86FYgKwXSdLsfadGXWh3Tzwz1fUJtnhjjD7Tpd/fKO4\nAUYOsdcrBnn9UWZrkqxlauWH6ZOYw7z40dzY5VulWoRfHZ+Ef5Uy96GDNoRueAft\nzXv6GFJpTHPizvFxhCjdRM86UWFd3sUYfk2Mfl31YDVl8b0TnnglOQ176bsB3g6M\nDF1tzPofei7TbGpquAlG4d4VAlR1SRUIx6dKQx1rmN9iEVAhKjwXsSOcG47AxwiS\nPpmCsrb6+zbp12BOxIMZU+2mr8o5KLSOGGbrfu4EBmSvY8CtXMMRWS4k9F+i2Q9I\nkTVFIUNTxp7Q92IPKFO2cbRl+5ov8q2Xtwnz0NkCgYEA81dAwTJ5QVXTW4/wMiQs\nimM6ujx/Y+JQNpdjG8L1SSBNiEOzQoUnj/fBvkqQ82ZnFuLhHcknUnIFcvduRHPK\nf6SzILZe0IqGySrU7G9d4VnaHoAY1+qP4+3JKGZETz7o6P6/XJU+KkNpFIXkq9lH\njNxc0TLgLysdFbhSpi5RpgcCgYEAxkSw8KO2kNQQlzm+qYAAyYFuZdyitoCFaeh2\niQxA3dEW4DVGYmaPQDjZO5jPwEEhGpXxPZeAi7cNRPUal6K7BhfHZT0leJiGULkY\n87rJysHrZcuEE8ZgfAnLi6O768v9TJmUbFxSOB48RBZiWpli8eCckkPknJgxD52u\nxzTEvsMCgYEAmnkiJ0KmTL5x7KcEAKCMEdGKH112NO8eonkZti7dzO0PqtfnPOwQ\nQEk0GVt2hrzT5mhiJaljJ+gv41qFCjlDLCJef/6lU9cMVzm0bt8Hhp2mZERHARHr\nA/MYBmhdJr0112qYCerHysZ+N0QD9L96t0XQOhEE1YyV6wrWlJ3EwRMCgYEAqFYM\nENQ/HmofB/asLceTY4L0E6InuGIYZBpOAgAYVvy+unAhKUzAlZtuvU36HdZuX98s\n6slmB7nMl16vTE2LExo/XnJzDRga+hCd4doWmILa9Ru9MPj+VHIQkqfa1tHkZxQC\nU5py6FirfHew3BFdU9YLuZfRUy9YgFS130arQPcCgYAzmqnSavQTa8AioVRWrqGX\nnLV5ZLAliaiIaJH/h41goBV9WgLVG1jTmGLm0xDy0kpQJtuo/CEUISNfJ0oKQZIT\nJK5da1ggjjY1TwQ1eZEoaaIoChjlaselgDWu/1A0kd92F41G3h2QQ8pzLxb2VVPW\n9HpZDOKa3gfHBzPJdfw6Xw==\n-----END PRIVATE KEY-----\n",
  "client_email": process.env.FIREBASE_CLIENT_EMAIL || "firebase-adminsdk-fbsvc@storychain-website.iam.gserviceaccount.com",
  "client_id": process.env.FIREBASE_CLIENT_ID || "114719222845058445642",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": process.env.FIREBASE_CLIENT_CERT_URL || "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40storychain-website.iam.gserviceaccount.com"
};

// Initialize Firebase Admin
let firebaseApp;

try {
  if (admin.apps.length === 0) {
    firebaseApp = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: 'storychain-website'
    });
  } else {
    firebaseApp = admin.app();
  }
} catch (error) {
  console.error('Firebase initialization error:', error);
  // Fallback to mock data if Firebase is not configured
  firebaseApp = null;
}

// Firestore database reference
const db = firebaseApp ? firebaseApp.firestore() : null;

// Collections
const COLLECTIONS = {
  USERS: 'users',
  STORIES: 'stories',
  THEMES: 'themes',
  SEGMENTS: 'segments'
};

module.exports = {
  admin,
  db,
  COLLECTIONS,
  firebaseApp
};
