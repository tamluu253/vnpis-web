import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { google } from 'googleapis';

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

const isProduction = process.env.NODE_ENV === 'production';
const DB_PATH = isProduction 
  ? '/tmp/orders_db.json' 
  : path.join(process.cwd(), 'src/data/orders_db.json');

const SECRET_KEY = process.env.CASSO_SECRET_KEY || '674b984b-92bd-11f1-b705-fa163e5398eb';

const GA_CLIENT_EMAIL = process.env.GA_CLIENT_EMAIL;
const GA_PRIVATE_KEY = process.env.GA_PRIVATE_KEY;

// Create the JWT Auth client
function getGoogleAuth() {
  if (!GA_CLIENT_EMAIL || !GA_PRIVATE_KEY) {
    return null;
  }
  try {
    return new google.auth.JWT({
      email: GA_CLIENT_EMAIL,
      key: GA_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive']
    });
  } catch (err) {
    console.error('Error creating Google Auth client:', err);
    return null;
  }
}

let cachedSpreadsheetId: string | null = null;

async function getSpreadsheetId(auth: any): Promise<string | null> {
  if (cachedSpreadsheetId) return cachedSpreadsheetId;
  
  try {
    const drive = google.drive({ version: 'v3', auth });
    
    // Search for existing spreadsheet
    const listResponse = await drive.files.list({
      q: "name = 'VNPIS_Ebook_Orders_Database' and mimeType = 'application/vnd.google-apps.spreadsheet' and trashed = false",
      fields: 'files(id, name)',
      spaces: 'drive'
    });

    if (listResponse.data.files && listResponse.data.files.length > 0) {
      cachedSpreadsheetId = listResponse.data.files[0].id || null;
      return cachedSpreadsheetId;
    }

    // Not found, create it
    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheet = await sheets.spreadsheets.create({
      requestBody: {
        properties: {
          title: 'VNPIS_Ebook_Orders_Database'
        }
      }
    });

    const newId = spreadsheet.data.spreadsheetId;
    if (!newId) return null;

    // Share with admin emails
    try {
      await drive.permissions.create({
        fileId: newId,
        requestBody: { type: 'user', role: 'writer', emailAddress: 'info@vnpis.com' }
      });
      await drive.permissions.create({
        fileId: newId,
        requestBody: { type: 'user', role: 'writer', emailAddress: 'tamluu253@gmail.com' }
      });
    } catch (shareErr) {
      console.warn('Failed to share Google Sheet with admins:', shareErr);
    }

    // Add headers
    await sheets.spreadsheets.values.append({
      spreadsheetId: newId,
      range: 'Sheet1!A1',
      valueInputOption: 'RAW',
      requestBody: {
        values: [[
          'orderId', 'name', 'phone', 'email', 'company', 'amount', 'status', 'createdAt', 'updatedAt'
        ]]
      }
    });

    cachedSpreadsheetId = newId;
    return newId;
  } catch (err: any) {
    console.error('Error getting/creating spreadsheet:', err.message);
    throw err; // throw to let caller trigger fallback
  }
}

// Fallback Local File DB functions
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

function getLocalOrders(): EbookOrder[] {
  ensureDb();
  try {
    if (fs.existsSync(DB_PATH)) {
      const content = fs.readFileSync(DB_PATH, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('Error reading local orders database:', err);
  }
  return [];
}

function saveLocalOrders(orders: EbookOrder[]): boolean {
  ensureDb();
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(orders, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing local orders database:', err);
    return false;
  }
}

// ==========================================
// EXPORTED DATABASE ADAPTER API FUNCTIONS (ASYNC)
// ==========================================

// Get all orders from Sheets or fallback to local file
export async function getOrders(): Promise<EbookOrder[]> {
  const auth = getGoogleAuth();
  if (!auth) {
    return getLocalOrders();
  }

  try {
    const spreadsheetId = await getSpreadsheetId(auth);
    if (!spreadsheetId) return getLocalOrders();

    const sheets = google.sheets({ version: 'v4', auth });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sheet1!A2:I'
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) return [];

    return rows.map(row => ({
      orderId: row[0] || '',
      name: row[1] || '',
      phone: row[2] || '',
      email: row[3] || '',
      company: row[4] || '',
      amount: parseInt(row[5] || '0', 10),
      status: (row[6] || 'PENDING') as 'PENDING' | 'COMPLETED' | 'CANCELLED',
      createdAt: row[7] || '',
      updatedAt: row[8] || ''
    }));
  } catch (err) {
    console.warn('Google Sheets getOrders failed, falling back to local database:', err);
    return getLocalOrders();
  }
}

// Create a new order in Sheets or fallback to local file
export async function createOrder(data: { name: string; phone: string; email: string; company?: string }): Promise<EbookOrder> {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(-2);
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const orderId = `EBK-${yy}${mm}${dd}-${randomSuffix}`;

  const newOrder: EbookOrder = {
    orderId,
    name: data.name,
    phone: data.phone,
    email: data.email.trim().toLowerCase(),
    company: data.company || '',
    amount: 50000,
    status: 'PENDING',
    createdAt: now.toISOString(),
    updatedAt: now.toISOString()
  };

  const auth = getGoogleAuth();
  if (!auth) {
    const orders = getLocalOrders();
    orders.push(newOrder);
    saveLocalOrders(orders);
    return newOrder;
  }

  try {
    const spreadsheetId = await getSpreadsheetId(auth);
    if (!spreadsheetId) {
      throw new Error('No spreadsheet ID');
    }

    const sheets = google.sheets({ version: 'v4', auth });
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A2',
      valueInputOption: 'RAW',
      requestBody: {
        values: [[
          newOrder.orderId,
          newOrder.name,
          newOrder.phone,
          newOrder.email,
          newOrder.company,
          newOrder.amount,
          newOrder.status,
          newOrder.createdAt,
          newOrder.updatedAt
        ]]
      }
    });
    return newOrder;
  } catch (err) {
    console.warn('Google Sheets createOrder failed, falling back to local database:', err);
    const orders = getLocalOrders();
    orders.push(newOrder);
    saveLocalOrders(orders);
    return newOrder;
  }
}

// Find order by ID
export async function findOrderById(orderId: string): Promise<EbookOrder | null> {
  const orders = await getOrders();
  const searchId = orderId.trim().toUpperCase();
  const order = orders.find(o => o.orderId.toUpperCase() === searchId);
  return order || null;
}

// Update order status in Sheets or fallback to local file
export async function updateOrderStatus(orderId: string, status: 'PENDING' | 'COMPLETED' | 'CANCELLED'): Promise<EbookOrder | null> {
  const auth = getGoogleAuth();
  if (!auth) {
    const orders = getLocalOrders();
    const idx = orders.findIndex(o => o.orderId.toUpperCase() === orderId.trim().toUpperCase());
    if (idx === -1) return null;
    orders[idx].status = status;
    orders[idx].updatedAt = new Date().toISOString();
    saveLocalOrders(orders);
    return orders[idx];
  }

  try {
    const spreadsheetId = await getSpreadsheetId(auth);
    if (!spreadsheetId) throw new Error('No spreadsheet ID');

    const sheets = google.sheets({ version: 'v4', auth });
    
    // Find the row index of the orderId
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sheet1!A:A'
    });
    const rows = response.data.values;
    if (!rows || rows.length === 0) return null;

    const searchId = orderId.trim().toUpperCase();
    let rowIndex = -1;
    for (let i = 0; i < rows.length; i++) {
      if (rows[i][0] && rows[i][0].toUpperCase() === searchId) {
        rowIndex = i;
        break;
      }
    }

    if (rowIndex === -1) {
      console.warn(`Order ${orderId} not found in Google Sheet, checking local fallback...`);
      const orders = getLocalOrders();
      const idx = orders.findIndex(o => o.orderId.toUpperCase() === orderId.trim().toUpperCase());
      if (idx === -1) return null;
      orders[idx].status = status;
      orders[idx].updatedAt = new Date().toISOString();
      saveLocalOrders(orders);
      return orders[idx];
    }

    const rowNum = rowIndex + 1; // 1-indexed for Sheets
    const updatedAt = new Date().toISOString();

    // Update status (Column G)
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `Sheet1!G${rowNum}`,
      valueInputOption: 'RAW',
      requestBody: { values: [[status]] }
    });

    // Update updatedAt (Column I)
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `Sheet1!I${rowNum}`,
      valueInputOption: 'RAW',
      requestBody: { values: [[updatedAt]] }
    });

    // Fetch the updated row to return
    const getRowResponse = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `Sheet1!A${rowNum}:I${rowNum}`
    });
    const row = getRowResponse.data.values?.[0];
    if (!row) return null;

    return {
      orderId: row[0] || '',
      name: row[1] || '',
      phone: row[2] || '',
      email: row[3] || '',
      company: row[4] || '',
      amount: parseInt(row[5] || '0', 10),
      status: (row[6] || 'PENDING') as 'PENDING' | 'COMPLETED' | 'CANCELLED',
      createdAt: row[7] || '',
      updatedAt: row[8] || ''
    };
  } catch (err) {
    console.warn('Google Sheets updateOrderStatus failed, falling back to local database:', err);
    const orders = getLocalOrders();
    const idx = orders.findIndex(o => o.orderId.toUpperCase() === orderId.trim().toUpperCase());
    if (idx === -1) return null;
    orders[idx].status = status;
    orders[idx].updatedAt = new Date().toISOString();
    saveLocalOrders(orders);
    return orders[idx];
  }
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
    
    if (Date.now() > expiryTime) {
      console.warn(`Token expired for ${email}`);
      return null;
    }
    
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
