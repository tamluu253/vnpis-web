import { generateDownloadToken, verifyDownloadToken } from '../src/lib/orders';

const token = generateDownloadToken('customer@gmail.com');
console.log('Original token:', token);

const tamperedToken = token.replace('Y', 'X');
console.log('Tampered token:', tamperedToken);

const decoded = Buffer.from(tamperedToken, 'base64').toString('utf-8');
console.log('Decoded:', decoded);

const parts = decoded.split(':');
console.log('Decoded parts:', parts);

const verified = verifyDownloadToken(tamperedToken);
console.log('Verified result:', verified);
