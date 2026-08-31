import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export interface EbookOrder {
  orderId: string;
  name: string;
  phone: string;
  email: string;
  company: string;
  amount: number;
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
  createdAt: string;
  updatedAt: string;
}

// Check environment to decide DB path: Vercel writes to /tmp, local dev writes to src/data
const isProduction = process.env.NODE_ENV === 'production';
const DB_PATH = isProduction 
  ? '/tmp/orders_db.json' 
  : path.join(process.cwd(), 'src/data/orders_db.json');

const SECRET_KEY = process.env.CASSO_SECRET_KEY || '674b984b-92bd-11f1-b705-fa163e5398eb';

// Helper to ensure database file exists
function ensureDb() {
  try {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(DB_PATH)) {
      fs.writeFileSync(DB_PATH, JSON.stringify([], null, 2), 'utf-8');
    }
  } catch (err) {
    console.error('Error ensuring orders DB exists:', err);
  }
}

// Get all orders from the database
export function getOrders(): EbookOrder[] {
  ensureDb();
  try {
    if (fs.existsSync(DB_PATH)) {
      const content = fs.readFileSync(DB_PATH, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('Error reading orders database:', err);
  }
  return [];
}

// Save all orders to the database
export function saveOrders(orders: EbookOrder[]): boolean {
  ensureDb();
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(orders, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing orders database:', err);
    return false;
  }
}

// Create a new order
export function createOrder(data: { name: string; phone: string; email: string; company?: string }): EbookOrder {
  const orders = getOrders();
  
  // Format: EBK-YYMMDD-XXXX (e.g. EBK-260831-4829)
  const now = new Date();
  const yy = String(now.getFullYear()).slice(-2);
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const randomSuffix = Math.floor(1000 + Math.random() * 9000); // 4-digit random
  const orderId = `EBK-${yy}${mm}${dd}-${randomSuffix}`;

  const newOrder: EbookOrder = {
    orderId,
    name: data.name,
    phone: data.phone,
    email: data.email.trim().toLowerCase(),
    company: data.company || '',
    amount: 50000, // Price is 50,000 VND
    status: 'PENDING',
    createdAt: now.toISOString(),
    updatedAt: now.toISOString()
  };

  orders.push(newOrder);
  saveOrders(orders);
  return newOrder;
}

// Find order by ID (case-insensitive)
export function findOrderById(orderId: string): EbookOrder | null {
  const orders = getOrders();
  const searchId = orderId.trim().toUpperCase();
  const order = orders.find(o => o.orderId.toUpperCase() === searchId);
  return order || null;
}

// Update order status
export function updateOrderStatus(orderId: string, status: 'PENDING' | 'COMPLETED' | 'CANCELLED'): EbookOrder | null {
  const orders = getOrders();
  const orderIndex = orders.findIndex(o => o.orderId.toUpperCase() === orderId.trim().toUpperCase());
  
  if (orderIndex === -1) return null;

  orders[orderIndex].status = status;
  orders[orderIndex].updatedAt = new Date().toISOString();
  
  saveOrders(orders);
  return orders[orderIndex];
}

// Generate secure download token (expires in 365 days)
export function generateDownloadToken(email: string): string {
  const emailLower = email.trim().toLowerCase();
  const expiryTime = Date.now() + 365 * 24 * 60 * 60 * 1000; // 365 days
  const data = `${emailLower}:${expiryTime}`;
  
  const signature = crypto
    .createHmac('sha256', SECRET_KEY)
    .update(data)
    .digest('hex');
    
  return Buffer.from(`${data}:${signature}`).toString('base64');
}

// Verify download token, returns email if valid, or null if invalid/expired
export function verifyDownloadToken(token: string): string | null {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const parts = decoded.split(':');
    
    if (parts.length !== 3) return null;
    
    const [email, expiryStr, signature] = parts;
    const expiryTime = parseInt(expiryStr, 10);
    
    // Check expiration
    if (Date.now() > expiryTime) {
      console.warn(`Token expired for ${email}`);
      return null;
    }
    
    // Recreate signature
    const data = `${email}:${expiryStr}`;
    const expectedSignature = crypto
      .createHmac('sha256', SECRET_KEY)
      .update(data)
      .digest('hex');
      
    if (signature === expectedSignature) {
      return email;
    }
  } catch (err) {
    console.error('Error verifying download token:', err);
  }
  return null;
}
