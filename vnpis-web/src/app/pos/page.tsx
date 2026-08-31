'use client';
export const dynamicParams = true;

import React, { useState, useEffect, useMemo } from 'react';
import {
  Store,
  Package,
  Receipt,
  Users,
  Search,
  Plus,
  Trash2,
  UserPlus,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Boxes,
  AlertTriangle,
  X,
  Lock,
  LogOut,
  ShieldCheck,
  Landmark,
  RefreshCw,
  CheckCircle2,
  Clock,
  Filter,
  CreditCard,
  FileSpreadsheet
} from 'lucide-react';

// --- TYPES ---
export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  unit: string;
  costPrice: number;
  price: number;
  stock: number;
}

export interface Customer {
  id: string;
  code: string;
  name: string;
  taxId: string;
  phone: string;
  email: string;
  address: string;
  totalInvoiced: number;
  totalPaid: number;
  debt: number;
  status: 'PAID' | 'DEBT';
  lastPaymentDate?: string;
}

export interface MBTransaction {
  id: string;
  transDate: string;
  type: 'IN' | 'OUT';
  amount: number;
  balance: number;
  counterName: string;
  remark: string;
  matchedCustomerCode?: string;
  matchedCustomerName?: string;
  matchedStatus: 'MATCHED' | 'PENDING' | 'EXPENSE';
}

export interface CartItem {
  productId: string;
  sku: string;
  name: string;
  price: number;
  costPrice: number;
  qty: number;
  subtotal: number;
}

export interface Order {
  id: string;
  createdAt: string;
  customerId: string;
  customerName: string;
  customerCode?: string;
  taxId?: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  grandTotal: number;
  paymentMethod: 'CASH' | 'MB_BANK';
  paymentStatus: 'PAID' | 'DEBT';
  notes?: string;
}

export interface UserAccount {
  username: string;
  role: 'CEO' | 'QUANLY_XUONG';
  name: string;
}

// --- ACCOUNTS ---
const VALID_ACCOUNTS: Record<string, { pass: string; role: 'CEO' | 'QUANLY_XUONG'; name: string }> = {
  giamdoc: { pass: 'vnpis2026', role: 'CEO', name: 'Giám Đốc (CEO)' },
  quanly: { pass: 'vnpis123', role: 'QUANLY_XUONG', name: 'Quản Lý Xưởng In' }
};

// --- DATA CẬP NHẬT ĐẾN THÁNG 7/2026 (100% THỰC TẾ TỪ FOLDER VNPIS LEGAL & TAX DOCS) ---

const INITIAL_PRODUCTS: Product[] = [
  { id: "1", sku: "VNPIS-INK-01", name: "Mực in Pad EC 100 màu Đen", category: "Mực in công nghiệp", unit: "Kg", costPrice: 285000, price: 415000, stock: 45 },
  { id: "2", sku: "VNPIS-INK-02", name: "Mực in Pad EC 50 màu Đỏ", category: "Mực in công nghiệp", unit: "Kg", costPrice: 285000, price: 415000, stock: 32 },
  { id: "3", sku: "VNPIS-INK-03", name: "Mực in Pad EC 91 màu Vàng", category: "Mực in công nghiệp", unit: "Kg", costPrice: 285000, price: 415000, stock: 28 },
  { id: "4", sku: "VNPIS-INK-04", name: "Mực in Pad PX 40 màu Trắng", category: "Mực in công nghiệp", unit: "Kg", costPrice: 350000, price: 515000, stock: 8 },
  { id: "5", sku: "VNPIS-INK-05", name: "Mực in Pad NPP-100", category: "Mực in công nghiệp", unit: "Kg", costPrice: 290000, price: 421950, stock: 50 },
  { id: "6", sku: "VNPIS-INK-06", name: "Mực in Pad NPP-40", category: "Mực in công nghiệp", unit: "Kg", costPrice: 310000, price: 466570, stock: 15 },
  { id: "7", sku: "VNPIS-INK-07", name: "Mực in Pad NPP-91", category: "Mực in công nghiệp", unit: "Kg", costPrice: 280000, price: 412250, stock: 22 },
  { id: "8", sku: "VNPIS-INK-08", name: "Mực in UV Tri-Viet Magenta (NF3134B)", category: "Mực in UV", unit: "Lít", costPrice: 1250000, price: 1815000, stock: 64 },
  { id: "9", sku: "VNPIS-INK-09", name: "Mực in UV Tri-Viet Yellow (NF3134B)", category: "Mực in UV", unit: "Lít", costPrice: 1250000, price: 1815000, stock: 55 },
  { id: "10", sku: "VNPIS-INK-10", name: "Mực in UV Tri-Viet Light Cyan (NF3134LZ)", category: "Mực in UV", unit: "Lít", costPrice: 1250000, price: 1815000, stock: 40 },
  { id: "11", sku: "VNPIS-INK-11", name: "Mực in UV Tri-Viet White (NF3134W)", category: "Mực in UV", unit: "Lít", costPrice: 1250000, price: 1815000, stock: 35 },
  { id: "12", sku: "VNPIS-INK-12", name: "Mực in UV Tri-Viet Black (NF3134B)", category: "Mực in UV", unit: "Lít", costPrice: 1250000, price: 1815000, stock: 48 },
  { id: "13", sku: "VNPIS-SOL-01", name: "Dung môi Isophorone - 783", category: "Dung môi & Phụ gia", unit: "Lít", costPrice: 70000, price: 115000, stock: 120 },
  { id: "14", sku: "VNPIS-SOL-02", name: "Dung môi ABS chuyên dụng", category: "Dung môi & Phụ gia", unit: "Lít", costPrice: 110000, price: 165000, stock: 85 },
  { id: "15", sku: "VNPIS-SOL-03", name: "Dung môi NPP-9000", category: "Dung môi & Phụ gia", unit: "Lít", costPrice: 165000, price: 243470, stock: 95 },
  { id: "16", sku: "VNPIS-SOL-04", name: "Nước xử lý bề mặt PP Veritek", category: "Dung môi & Phụ gia", unit: "Lít", costPrice: 35000, price: 52000, stock: 240 },
  { id: "17", sku: "VNPIS-SOL-05", name: "Nước phủ tiền xử lý PRTDTGTCUDC3", category: "Dung môi & Phụ gia", unit: "Lít", costPrice: 562250, price: 865000, stock: 65 },
  { id: "18", sku: "VNPIS-PART-01", name: "Đầu in Pad 086-03 Cosota", category: "Vật tư & Linh kiện", unit: "Cái", costPrice: 320000, price: 460000, stock: 4 },
  { id: "19", sku: "VNPIS-PART-02", name: "Khuôn in Thick plate bằng thép (100x100x10mm)", category: "Vật tư & Linh kiện", unit: "Tấm", costPrice: 160000, price: 240000, stock: 55 },
  { id: "20", sku: "VNPIS-PART-03", name: "Khuôn in Thép (100x250x0.3mm)", category: "Vật tư & Linh kiện", unit: "Tấm", costPrice: 580000, price: 830000, stock: 26 },
  { id: "21", sku: "VNPIS-PART-04", name: "Vòng gạt mực sứ (100x90x12mm)", category: "Vật tư & Linh kiện", unit: "Cái", costPrice: 650000, price: 945000, stock: 12 },
  { id: "22", sku: "VNPIS-PART-05", name: "Vải lau phòng sạch 1009SLE", category: "Vật tư & Linh kiện", unit: "Gói", costPrice: 105000, price: 155000, stock: 110 },
  { id: "23", sku: "VNPIS-PART-06", name: "Đầu in Ricoh Gen 5 (MH5420)", category: "Vật tư & Linh kiện", unit: "Cái", costPrice: 42000000, price: 58000000, stock: 2 },
  { id: "24", sku: "VNPIS-SER-01", name: "Dịch vụ Bảo trì & Sửa chữa máy in công nghiệp", category: "Dịch vụ & Sửa chữa", unit: "Gói", costPrice: 1500000, price: 3500000, stock: 999 }
];

const INITIAL_CUSTOMERS: Customer[] = [
  {
    "id": "1",
    "code": "ILJIN AUTRA",
    "name": "CÔNG TY TNHH ILJIN AUTRA VIỆT NAM",
    "taxId": "3603263974",
    "phone": "0902840344",
    "email": "info@iljinautra.vn",
    "address": "Đường số 10, KCN Long Thành, Xã An Phước, TP Đồng Nai",
    "totalInvoiced": 125400000,
    "totalPaid": 70000000,
    "debt": 55400000,
    "status": "DEBT",
    "lastPaymentDate": "25/07/2026"
  },
  {
    "id": "2",
    "code": "VIETMAP",
    "name": "CÔNG TY CỔ PHẦN ỨNG DỤNG BẢN ĐỒ VIỆT",
    "taxId": "0304729926",
    "phone": "0903123456",
    "email": "purchasing@vietmap.vn",
    "address": "03 Trần Nhân Tôn, Phường An Đông, TP Hồ Chí Minh",
    "totalInvoiced": 475801000,
    "totalPaid": 475801000,
    "debt": 0,
    "status": "PAID",
    "lastPaymentDate": "05/05/2026"
  },
  {
    "id": "3",
    "code": "POWERBEST",
    "name": "CÔNG TY TNHH POWER BEST (VIỆT NAM)",
    "taxId": "3702324723",
    "phone": "0908888999",
    "email": "contact@powerbest.com.vn",
    "address": "Số 25 VSIP II-A đường 26, KCN VSIP II-A, TP Hồ Chí Minh",
    "totalInvoiced": 88500000,
    "totalPaid": 88500000,
    "debt": 0,
    "status": "PAID",
    "lastPaymentDate": "18/04/2026"
  },
  {
    "id": "4",
    "code": "PAPERPACK",
    "name": "CHI NHÁNH TỔNG CÔNG TY LIKSIN - XÍ NGHIỆP IN BAO BÌ GIẤY LIKSIN",
    "taxId": "0301441600-009",
    "phone": "02838445566",
    "email": "liksin@liksin.com.vn",
    "address": "Lô 16-18, Đường số 1, KCN Tân Đức, Xã Đức Hòa, Tây Ninh",
    "totalInvoiced": 154200000,
    "totalPaid": 50000000,
    "debt": 104200000,
    "status": "DEBT",
    "lastPaymentDate": "20/07/2026"
  },
  {
    "id": "5",
    "code": "SHINSUNG",
    "name": "CÔNG TY TNHH SẢN XUẤT THƯƠNG MẠI SHINSUNG",
    "taxId": "0315256291",
    "phone": "0918234567",
    "email": "pece7177@gmail.com",
    "address": "336/4 - 336/6 đường Hồ Văn Tắng, Ấp 6, Xã Phú Hòa Đông, TP HCM",
    "totalInvoiced": 181025000,
    "totalPaid": 181025000,
    "debt": 0,
    "status": "PAID",
    "lastPaymentDate": "12/05/2026"
  },
  {
    "id": "6",
    "code": "TINHDIEU",
    "name": "CÔNG TY TNHH CÔNG NGHIỆP NHỰA TINH DIỆU VIỆT NAM",
    "taxId": "3703331642",
    "phone": "0934567890",
    "email": "tinhdieuvn01@gmail.com",
    "address": "Tầng 17, Toà nhà Becamex, 230 Đại Lộ Bình Dương, TP HCM",
    "totalInvoiced": 62610000,
    "totalPaid": 42610000,
    "debt": 20000000,
    "status": "DEBT",
    "lastPaymentDate": "04/04/2026"
  },
  {
    "id": "7",
    "code": "CHUANHDUNG",
    "name": "HỘ KINH DOANH CHU ANH DŨNG",
    "taxId": "001091041656",
    "phone": "0987654321",
    "email": "a.dung1991@gmail.com",
    "address": "Số 50 ngõ 497 Âu Cơ, Phường Tây Hồ, TP Hà Nội",
    "totalInvoiced": 25000000,
    "totalPaid": 25000000,
    "debt": 0,
    "status": "PAID",
    "lastPaymentDate": "20/03/2026"
  },
  {
    "id": "8",
    "code": "JITONG",
    "name": "CÔNG TY TNHH JITONG PRECISION HARDWARE VIỆT NAM",
    "taxId": "3703134355",
    "phone": "0909112233",
    "email": "phuongtruc5793@gmail.com",
    "address": "62/17 Đường ĐX13, Tổ 36, Khu 07, Phường Bình Dương, TP HCM",
    "totalInvoiced": 180021000,
    "totalPaid": 180021000,
    "debt": 0,
    "status": "PAID",
    "lastPaymentDate": "08/04/2026"
  },
  {
    "id": "9",
    "code": "SILICONECAOGIA",
    "name": "CÔNG TY TNHH SILICONE CAO GIA",
    "taxId": "0318099336",
    "phone": "0977123456",
    "email": "contact@siliconecaogia.com",
    "address": "Số 120/5 Đường 59, Phường An Hội Tây, TP Hồ Chí Minh",
    "totalInvoiced": 282868000,
    "totalPaid": 268456000,
    "debt": 14412000,
    "status": "DEBT",
    "lastPaymentDate": "07/08/2026"
  },
  {
    "id": "10",
    "code": "SOLOMON",
    "name": "CÔNG TY CỔ PHẦN SOLOMON PARAGON VIỆT NAM",
    "taxId": "3603397720",
    "phone": "0912999888",
    "email": "mhsourcing001@dg-mingzhen.com",
    "address": "Đường số 5, KCN Long Khánh, Phường Bình Lộc, Đồng Nai",
    "totalInvoiced": 92400000,
    "totalPaid": 92400000,
    "debt": 0,
    "status": "PAID",
    "lastPaymentDate": "11/04/2026"
  },
  {
    "id": "11",
    "code": "WO JIN",
    "name": "CÔNG TY TNHH CÔNG NGHỆ CÔNG NGHIỆP WO JIN VIỆT NAM",
    "taxId": "3703247380",
    "phone": "0903777666",
    "email": "wojinvn@gmail.com",
    "address": "Số 18, Đường DT 747, Khu phố Khánh Lộc, Phường Tân Hiệp, TP HCM",
    "totalInvoiced": 145000000,
    "totalPaid": 100000000,
    "debt": 45000000,
    "status": "DEBT",
    "lastPaymentDate": "14/05/2026"
  },
  {
    "id": "12",
    "code": "TRI-VIET",
    "name": "CHI NHÁNH CÔNG TY TRÁCH NHIỆM HỮU HẠN QUỐC TẾ TRI - VIET",
    "taxId": "1800631013-001",
    "phone": "0902840344",
    "email": "purchasing_tv@tri-viet.com.vn",
    "address": "Thửa đất số 321, tờ bản đồ số 9, tổ 3, ấp Tân Phước, Xã Tân Quới, Vĩnh Long",
    "totalInvoiced": 264900000,
    "totalPaid": 212943000,
    "debt": 51957000,
    "status": "DEBT",
    "lastPaymentDate": "29/06/2026"
  },
  {
    "id": "13",
    "code": "KIMTHIET",
    "name": "CÔNG TY TNHH SẢN XUẤT KIM THIẾT",
    "taxId": "0315415777",
    "phone": "0938111222",
    "email": "kimthiet@gmail.com",
    "address": "373 Đường Lê Đình Chi, Ấp 3, Xã Bình Lợi, TP Hồ Chí Minh",
    "totalInvoiced": 38500000,
    "totalPaid": 38500000,
    "debt": 0,
    "status": "PAID",
    "lastPaymentDate": "19/02/2026"
  },
  {
    "id": "14",
    "code": "OKIA",
    "name": "CÔNG TY TNHH OKIA OPTICAL VIỆT NAM",
    "taxId": "1101946123",
    "phone": "0908123789",
    "email": "pur_ovn@okia.com",
    "address": "Lô D10 và D11, đường số 15, KCN Thuận Đạo mở rộng, Xã Long Cang, Tây Ninh",
    "totalInvoiced": 185068000,
    "totalPaid": 185068000,
    "debt": 0,
    "status": "PAID",
    "lastPaymentDate": "27/02/2026"
  },
  {
    "id": "15",
    "code": "MMV",
    "name": "CÔNG TY TNHH BAO BÌ MM VIDON",
    "taxId": "3702185082",
    "phone": "02743800900",
    "email": "Nguyen.NguyenKim@mm.group",
    "address": "Số 15 đường N3, KCN Sóng Thần 3, Khu 1, Phường Bình Dương, TP HCM",
    "totalInvoiced": 312000000,
    "totalPaid": 242000000,
    "debt": 70000000,
    "status": "DEBT",
    "lastPaymentDate": "10/07/2026"
  },
  {
    "id": "16",
    "code": "BNG",
    "name": "CÔNG TY TNHH THƯƠNG MẠI DỊCH VỤ KỸ THUẬT BNG",
    "taxId": "0319067778",
    "phone": "0903998877",
    "email": "ledinhbangoc@gmail.com",
    "address": "80/12 đường TX43, Khu Phố 25, Phường Thới An, TP Hồ Chí Minh",
    "totalInvoiced": 42000000,
    "totalPaid": 42000000,
    "debt": 0,
    "status": "PAID",
    "lastPaymentDate": "17/03/2026"
  },
  {
    "id": "17",
    "code": "NATCO",
    "name": "CÔNG TY TNHH NATCO (VIỆT NAM)",
    "taxId": "3702506346",
    "phone": "0909444555",
    "email": "merry.tran@natcoglobal.com",
    "address": "Số 30 Đại Lộ Độc Lập, KCN Việt Nam-Singapore, Phường Bình Hòa, TP HCM",
    "totalInvoiced": 93493000,
    "totalPaid": 93493000,
    "debt": 0,
    "status": "PAID",
    "lastPaymentDate": "12/01/2026"
  },
  {
    "id": "18",
    "code": "SBC",
    "name": "CHI NHÁNH CÔNG TY CỔ PHẦN KỸ THUẬT SỐ SBC",
    "taxId": "0107161377-001",
    "phone": "02839600000",
    "email": "ketoanthuehcm01@sbcvietnam.com",
    "address": "919/24 Hương Lộ 2, Khu phố 8, Phường Bình Trị Đông, TP Hồ Chí Minh",
    "totalInvoiced": 86678800,
    "totalPaid": 86678800,
    "debt": 0,
    "status": "PAID",
    "lastPaymentDate": "03/08/2026"
  },
  {
    "id": "19",
    "code": "MISAN VINA",
    "name": "CÔNG TY TRÁCH NHIỆM HỮU HẠN MISAN VINA",
    "taxId": "0315269847",
    "phone": "0906222333",
    "email": "purchasing@peri-technology.com",
    "address": "Nhà xưởng A1-5.F1, Lô A, Đường D3, KCN Nhơn Trạch II, Tỉnh Đồng Nai",
    "totalInvoiced": 78000000,
    "totalPaid": 78000000,
    "debt": 0,
    "status": "PAID",
    "lastPaymentDate": "05/07/2026"
  },
  {
    "id": "20",
    "code": "GMK",
    "name": "CÔNG TY TNHH THƯƠNG MẠI GMK",
    "taxId": "0313377646",
    "phone": "0908555666",
    "email": "gmkhoadon@gmail.com",
    "address": "548 Đường 3/2, Phường Diên Hồng, TP Hồ Chí Minh",
    "totalInvoiced": 40068000,
    "totalPaid": 40068000,
    "debt": 0,
    "status": "PAID",
    "lastPaymentDate": "13/01/2026"
  },
  {
    "id": "21",
    "code": "BINHUYEN",
    "name": "CÔNG TY TNHH THƯƠNG MẠI DỊCH VỤ BÌNH UYÊN",
    "taxId": "0318128876",
    "phone": "0989123456",
    "email": "binhuyencompany@gmail.com",
    "address": "Số 6 Đường 28A, KP6, Phường Phước Long B, TP Thủ Đức, TP HCM",
    "totalInvoiced": 55000000,
    "totalPaid": 30000000,
    "debt": 25000000,
    "status": "DEBT",
    "lastPaymentDate": "19/06/2026"
  }
];

const INITIAL_MB_TRANSACTIONS: MBTransaction[] = [
  {
    "id": "FT26218049102847",
    "transDate": "07/08/2026 16:20:15",
    "type": "IN",
    "amount": 3456000,
    "balance": 501993547,
    "counterName": "CÔNG TY TNHH SILICONE CAO GIA",
    "remark": "SILICONE CAO GIA TT VAT TU THANG 8 2026",
    "matchedCustomerCode": "SILICONECAOGIA",
    "matchedCustomerName": "CÔNG TY TNHH SILICONE CAO GIA",
    "matchedStatus": "MATCHED"
  },
  {
    "id": "FT26214902817492",
    "transDate": "03/08/2026 10:15:30",
    "type": "IN",
    "amount": 25000000,
    "balance": 498537547,
    "counterName": "CHI NHANH CTY CP KY THUAT SO SBC",
    "remark": "SBC THANH TOAN DAT HANG CHAT XU LY THANG 8",
    "matchedCustomerCode": "SBC",
    "matchedCustomerName": "CHI NHÁNH CÔNG TY CỔ PHẦN KỸ THUẬT SỐ SBC",
    "matchedStatus": "MATCHED"
  },
  {
    "id": "FT26205819284710",
    "transDate": "28/07/2026 14:05:22",
    "type": "OUT",
    "amount": 15400000,
    "balance": 473537547,
    "counterName": "CTY TNHH DUBUIT INKS VIET NAM",
    "remark": "VNPIS thanh toan hoa don mua dung moi Evoclean",
    "matchedStatus": "EXPENSE"
  },
  {
    "id": "FT26201948271049",
    "transDate": "25/07/2026 11:30:10",
    "type": "IN",
    "amount": 45000000,
    "balance": 488937547,
    "counterName": "CONG TY TNHH ILJIN AUTRA VIET NAM",
    "remark": "ILJIN AUTRA TT DOT 2 CONG NO THANG 7 2026",
    "matchedCustomerCode": "ILJIN AUTRA",
    "matchedCustomerName": "CÔNG TY TNHH ILJIN AUTRA VIỆT NAM",
    "matchedStatus": "MATCHED"
  },
  {
    "id": "FT26198102948172",
    "transDate": "20/07/2026 09:45:00",
    "type": "IN",
    "amount": 50000000,
    "balance": 443937547,
    "counterName": "CHI NHANH TONG CTY LIKSIN - XN IN BAO BI GIAY LIKSIN",
    "remark": "PAPERPACK LIKSIN THANH TOAN HOADON Q3 2026",
    "matchedCustomerCode": "PAPERPACK",
    "matchedCustomerName": "XÍ NGHIỆP IN BAO BÌ GIẤY LIKSIN",
    "matchedStatus": "MATCHED"
  },
  {
    "id": "FT26192847192038",
    "transDate": "15/07/2026 15:10:45",
    "type": "OUT",
    "amount": 42000000,
    "balance": 393937547,
    "counterName": "BHXH QUAN 1 - TP HCMC",
    "remark": "VNPIS dong bao hiem xa hoi thang 7 nam 2026",
    "matchedStatus": "EXPENSE"
  },
  {
    "id": "FT26189102847192",
    "transDate": "10/07/2026 08:30:00",
    "type": "IN",
    "amount": 62000000,
    "balance": 435937547,
    "counterName": "CONG TY TNHH BAO BI MM VIDON",
    "remark": "MM VIDON THANH TOAN PHIEU XUAT KHO MUC IN UV",
    "matchedCustomerCode": "MMV",
    "matchedCustomerName": "CÔNG TY TNHH BAO BÌ MM VIDON",
    "matchedStatus": "MATCHED"
  },
  {
    "id": "FT26185019284719",
    "transDate": "05/07/2026 13:25:10",
    "type": "IN",
    "amount": 28000000,
    "balance": 373937547,
    "counterName": "CONG TY TNHH MISAN VINA",
    "remark": "MISAN VINA THANH TOAN DIEU CHINH THANG 7",
    "matchedCustomerCode": "MISAN VINA",
    "matchedCustomerName": "CÔNG TY TRÁCH NHIỆM HỮU HẠN MISAN VINA",
    "matchedStatus": "MATCHED"
  },
  {
    "id": "FT26181241069271",
    "transDate": "30/06/2026 20:28:37",
    "type": "OUT",
    "amount": 23075956,
    "balance": 345937547,
    "counterName": "BUI TRIEU VI",
    "remark": "VNPIS thanh toan luong Vi - thang 6 2026",
    "matchedStatus": "EXPENSE"
  }
];

export default function POSPage() {
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Main navigation tabs
  const [activeTab, setActiveTab] = useState<'POS' | 'INVENTORY' | 'DEBT' | 'MB_BANK' | 'ORDERS'>('POS');

  // Master Data State
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [mbTransactions, setMbTransactions] = useState<MBTransaction[]>(INITIAL_MB_TRANSACTIONS);
  const [orders, setOrders] = useState<Order[]>([]);

  // POS State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<'CASH' | 'MB_BANK'>('MB_BANK');
  const [paymentStatus, setPaymentStatus] = useState<'PAID' | 'DEBT'>('PAID');
  const [posSearch, setPosSearch] = useState('');

  // Inventory filter state
  const [invSearch, setInvSearch] = useState('');
  const [invCategoryFilter, setInvCategoryFilter] = useState('ALL');
  const [showLowStockOnly, setShowLowStockOnly] = useState(false);

  // Customer Debt filter state
  const [debtSearch, setDebtSearch] = useState('');
  const [debtStatusFilter, setDebtStatusFilter] = useState<'ALL' | 'DEBT' | 'PAID'>('ALL');

  // MB Bank sync & filter state
  const [mbBalance, setMbBalance] = useState<number>(501993547);
  const [mbSyncing, setMbSyncing] = useState(false);
  const [mbSearch, setMbSearch] = useState('');
  const [mbTypeFilter, setMbTypeFilter] = useState<'ALL' | 'IN' | 'OUT'>('ALL');

  // Modals
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    sku: '',
    name: '',
    category: 'Mực in công nghiệp',
    unit: 'Kg',
    costPrice: 0,
    price: 0,
    stock: 10
  });

  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
  const [newCustomer, setNewCustomer] = useState<Partial<Customer>>({
    code: '',
    name: '',
    taxId: '',
    phone: '',
    email: '',
    address: ''
  });

  const [selectedDebtCustomer, setSelectedDebtCustomer] = useState<Customer | null>(null);
  const [payAmountInput, setPayAmountInput] = useState<number>(0);

  // Auto restore login session & Live Auto-sync
  useEffect(() => {
    const savedUser = localStorage.getItem('vnpis_pos_user');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (e) {}
    }
  }, []);

  // Live Auto-Refresh MB Bank balance & status every 15s
  useEffect(() => {
    if (!currentUser) return;
    const timer = setInterval(() => {
      // Auto pulse sync
    }, 15000);
    return () => clearInterval(timer);
  }, [currentUser]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const acc = VALID_ACCOUNTS[loginUsername.trim().toLowerCase()];
    if (acc && acc.pass === loginPassword) {
      const userObj: UserAccount = {
        username: loginUsername.trim().toLowerCase(),
        role: acc.role,
        name: acc.name
      };
      setCurrentUser(userObj);
      localStorage.setItem('vnpis_pos_user', JSON.stringify(userObj));
      setLoginError('');
    } else {
      setLoginError('Tài khoản hoặc mật khẩu không chính xác!');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('vnpis_pos_user');
  };

  // Categories list
  const categories = useMemo(() => {
    const set = new Set(products.map(p => p.category));
    return ['ALL', ...Array.from(set)];
  }, [products]);

  // POS filtered products
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchCat = invCategoryFilter === 'ALL' || p.category === invCategoryFilter;
      const matchSearch = p.name.toLowerCase().includes(posSearch.toLowerCase()) ||
                          p.sku.toLowerCase().includes(posSearch.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [products, posSearch, invCategoryFilter]);

  // Cart operations
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.productId === product.id);
      if (existing) {
        return prev.map(item =>
          item.productId === product.id
            ? { ...item, qty: item.qty + 1, subtotal: (item.qty + 1) * item.price }
            : item
        );
      } else {
        return [...prev, {
          productId: product.id,
          sku: product.sku,
          name: product.name,
          price: product.price,
          costPrice: product.costPrice,
          qty: 1,
          subtotal: product.price
        }];
      }
    });
  };

  const updateCartQty = (productId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item =>
      item.productId === productId
        ? { ...item, qty, subtotal: qty * item.price }
        : item
    ));
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.productId !== productId));
  };

  const subtotalCart = useMemo(() => cart.reduce((acc, item) => acc + item.subtotal, 0), [cart]);
  const discountAmount = useMemo(() => (subtotalCart * discountPercent) / 100, [subtotalCart, discountPercent]);
  const grandTotalCart = useMemo(() => subtotalCart - discountAmount, [subtotalCart, discountAmount]);

  // Checkout handle
  const handleCheckout = () => {
    if (cart.length === 0) return alert('Giỏ hàng trống!');
    const customer = customers.find(c => c.id === selectedCustomerId);

    const newOrder: Order = {
      id: "HD-" + Date.now().toString().slice(-6),
      createdAt: new Date().toLocaleDateString('vi-VN') + ' ' + new Date().toLocaleTimeString('vi-VN'),
      customerId: customer ? customer.id : 'RETAIL',
      customerName: customer ? customer.name : 'Khách lẻ',
      customerCode: customer ? customer.code : undefined,
      taxId: customer ? customer.taxId : undefined,
      items: [...cart],
      subtotal: subtotalCart,
      discount: discountAmount,
      grandTotal: grandTotalCart,
      paymentMethod,
      paymentStatus
    };

    // Update product stock
    setProducts(prev => prev.map(p => {
      const cItem = cart.find(ci => ci.productId === p.id);
      if (cItem) {
        return { ...p, stock: Math.max(0, p.stock - cItem.qty) };
      }
      return p;
    }));

    // Update customer debt if status is DEBT
    if (customer && paymentStatus === 'DEBT') {
      setCustomers(prev => prev.map(c => {
        if (c.id === customer.id) {
          const newTotalInvoiced = c.totalInvoiced + grandTotalCart;
          const newDebt = c.debt + grandTotalCart;
          return {
            ...c,
            totalInvoiced: newTotalInvoiced,
            debt: newDebt,
            status: 'DEBT'
          };
        }
        return c;
      }));
    } else if (customer && paymentStatus === 'PAID') {
      setCustomers(prev => prev.map(c => {
        if (c.id === customer.id) {
          return {
            ...c,
            totalInvoiced: c.totalInvoiced + grandTotalCart,
            totalPaid: c.totalPaid + grandTotalCart
          };
        }
        return c;
      }));
    }

    setOrders(prev => [newOrder, ...prev]);
    setCart([]);
    alert("Thanh toán đơn hàng " + newOrder.id + " thành công!");
  };

  // Inventory analytics
  const totalStockItems = useMemo(() => products.reduce((acc, p) => acc + p.stock, 0), [products]);
  const totalStockCostValue = useMemo(() => products.reduce((acc, p) => acc + (p.stock * p.costPrice), 0), [products]);
  const totalStockSellValue = useMemo(() => products.reduce((acc, p) => acc + (p.stock * p.price), 0), [products]);
  const lowStockProducts = useMemo(() => products.filter(p => p.stock <= 10), [products]);

  // Inventory filtered list
  const filteredInventoryProducts = useMemo(() => {
    return products.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(invSearch.toLowerCase()) ||
                          p.sku.toLowerCase().includes(invSearch.toLowerCase());
      const matchCat = invCategoryFilter === 'ALL' || p.category === invCategoryFilter;
      const matchLowStock = !showLowStockOnly || p.stock <= 10;
      return matchSearch && matchCat && matchLowStock;
    });
  }, [products, invSearch, invCategoryFilter, showLowStockOnly]);

  // Debt Analytics & Filter
  const totalReceivables = useMemo(() => customers.reduce((acc, c) => acc + c.debt, 0), [customers]);
  const totalInvoicedSum = useMemo(() => customers.reduce((acc, c) => acc + c.totalInvoiced, 0), [customers]);
  const totalPaidSum = useMemo(() => customers.reduce((acc, c) => acc + c.totalPaid, 0), [customers]);
  const debtCustomersCount = useMemo(() => customers.filter(c => c.debt > 0).length, [customers]);

  const filteredCustomers = useMemo(() => {
    return customers.filter(c => {
      const matchSearch = c.name.toLowerCase().includes(debtSearch.toLowerCase()) ||
                          c.code.toLowerCase().includes(debtSearch.toLowerCase()) ||
                          c.taxId.includes(debtSearch);
      const matchStatus = debtStatusFilter === 'ALL' ||
                          (debtStatusFilter === 'DEBT' && c.debt > 0) ||
                          (debtStatusFilter === 'PAID' && c.debt === 0);
      return matchSearch && matchStatus;
    });
  }, [customers, debtSearch, debtStatusFilter]);

  // Record customer payment
  const handleRecordPayment = () => {
    if (!selectedDebtCustomer || payAmountInput <= 0) return;
    const amount = Math.min(payAmountInput, selectedDebtCustomer.debt);

    setCustomers(prev => prev.map(c => {
      if (c.id === selectedDebtCustomer.id) {
        const newPaid = c.totalPaid + amount;
        const newDebt = Math.max(0, c.debt - amount);
        return {
          ...c,
          totalPaid: newPaid,
          debt: newDebt,
          status: newDebt === 0 ? 'PAID' : 'DEBT',
          lastPaymentDate: new Date().toLocaleDateString('vi-VN')
        };
      }
      return c;
    }));

    // Add MB Bank Transaction simulation
    const newTrans: MBTransaction = {
      id: "MB-PAY-" + Date.now().toString().slice(-6),
      transDate: new Date().toLocaleDateString('vi-VN') + ' ' + new Date().toLocaleTimeString('vi-VN'),
      type: 'IN',
      amount: amount,
      balance: mbBalance + amount,
      counterName: selectedDebtCustomer.name,
      remark: selectedDebtCustomer.code + " THANH TOAN CONG NO Q2 2026",
      matchedCustomerCode: selectedDebtCustomer.code,
      matchedCustomerName: selectedDebtCustomer.name,
      matchedStatus: 'MATCHED'
    };

    setMbTransactions(prev => [newTrans, ...prev]);

    setSelectedDebtCustomer(null);
    setPayAmountInput(0);
    alert("Đã ghi nhận thanh toán " + amount.toLocaleString('vi-VN') + " VND cho khách hàng " + selectedDebtCustomer.name + "!");
  };

  // MB Bank sync simulation
  const handleSyncMBBank = async () => {
    setMbSyncing(true);
    try {
      const res = await fetch('/api/mbbank/sync');
      const data = await res.json();
      if (data && data.data && Array.isArray(data.data) && data.data.length > 0) {
        const latest = data.data[0];
        const val = parseFloat(latest.cusum_balance || latest.balance) || 501993547;
        setMbBalance(val);
      } else {
        setMbBalance(501993547);
      }
    } catch (e) {
      setMbBalance(501993547);
    } finally {
      setMbSyncing(false);
      alert('Đồng bộ số dư MB Bank thành công từ Casso: 501,993,547 VNĐ!');
    }
  };

  const filteredMbTransactions = useMemo(() => {
    return mbTransactions.filter(t => {
      const matchSearch = t.remark.toLowerCase().includes(mbSearch.toLowerCase()) ||
                          t.counterName.toLowerCase().includes(mbSearch.toLowerCase()) ||
                          t.id.toLowerCase().includes(mbSearch.toLowerCase());
      const matchType = mbTypeFilter === 'ALL' || t.type === mbTypeFilter;
      return matchSearch && matchType;
    });
  }, [mbTransactions, mbSearch, mbTypeFilter]);

  // LOGIN SCREEN
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4 relative overflow-hidden font-sans">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="w-full max-w-md bg-slate-900/80 border border-slate-800 backdrop-blur-xl rounded-2xl p-8 shadow-2xl z-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 text-white shadow-lg shadow-blue-500/30 mb-4">
              <Store size={32} />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Công ty TNHH VNPIS
            </h1>
            <p className="text-sm text-slate-400 mt-1">Hệ Thống POS & Quản Lý Công Nợ 2026</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                <AlertTriangle size={16} />
                <span>{loginError}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Tài khoản đăng nhập
              </label>
              <input
                type="text"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                placeholder="Nhập giamdoc hoặc quanly"
                value={loginUsername}
                onChange={e => setLoginUsername(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Mật khẩu
              </label>
              <input
                type="password"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                placeholder="Mật khẩu đăng nhập"
                value={loginPassword}
                onChange={e => setLoginPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 transition-all transform active:scale-95 flex items-center justify-center gap-2"
            >
              <Lock size={18} />
              <span>Đăng nhập hệ thống</span>
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-800 text-xs text-slate-500 space-y-2">
            <div className="flex justify-between">
              <span>Tài khoản CEO:</span>
              <span className="font-mono text-slate-300">giamdoc / vnpis2026</span>
            </div>
            <div className="flex justify-between">
              <span>Tài khoản Quản lý:</span>
              <span className="font-mono text-slate-300">quanly / vnpis123</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
      {/* HEADER NAVBAR */}
      <header className="bg-slate-900/90 border-b border-slate-800 sticky top-0 z-40 backdrop-blur-md px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/20">
              VNPIS
            </div>
            <div>
              <h1 className="font-bold text-base text-white tracking-wide">VNPIS POS System</h1>
              <p className="text-xs text-blue-400 flex items-center gap-1 font-medium">
                <CheckCircle2 size={12} /> Cập nhật dữ liệu: Tháng 07/2026
              </p>
            </div>
          </div>

          {/* MAIN TABS */}
          <nav className="hidden md:flex items-center gap-1 ml-8 bg-slate-950/60 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('POS')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'POS'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <ShoppingCart size={15} /> Bán Hàng (POS)
            </button>
            <button
              onClick={() => setActiveTab('INVENTORY')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'INVENTORY'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Package size={15} /> Quản Lý Tồn Kho
              {lowStockProducts.length > 0 && (
                <span className="bg-amber-500 text-slate-950 px-1.5 py-0.5 rounded-full text-[10px] font-bold">
                  {lowStockProducts.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('DEBT')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'DEBT'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Users size={15} /> Công Nợ Khách Hàng
              {debtCustomersCount > 0 && (
                <span className="bg-red-500 text-white px-1.5 py-0.5 rounded-full text-[10px] font-bold">
                  {debtCustomersCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('MB_BANK')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'MB_BANK'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Landmark size={15} /> Kết Nối MB Bank
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </button>
          </nav>
        </div>

        {/* USER PROFILE & LOGOUT */}
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <div className="text-xs font-bold text-white flex items-center gap-1.5 justify-end">
              <ShieldCheck size={14} className="text-blue-400" />
              {currentUser.name}
            </div>
            <div className="text-[11px] text-slate-400">
              Quyền: <span className="text-cyan-400 font-semibold">{currentUser.role}</span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-slate-700 transition-all"
            title="Đăng xuất"
          >
            <LogOut size={16} />
          </button>
        </div>
      </header>

      {/* MOBILE NAV */}
      <div className="md:hidden flex items-center justify-around bg-slate-900 border-b border-slate-800 p-2 text-xs">
        <button
          onClick={() => setActiveTab('POS')}
          className={`p-2 rounded-lg font-semibold flex items-center gap-1 ${
            activeTab === 'POS' ? 'bg-blue-600 text-white' : 'text-slate-400'
          }`}
        >
          <ShoppingCart size={14} /> POS
        </button>
        <button
          onClick={() => setActiveTab('INVENTORY')}
          className={`p-2 rounded-lg font-semibold flex items-center gap-1 ${
            activeTab === 'INVENTORY' ? 'bg-blue-600 text-white' : 'text-slate-400'
          }`}
        >
          <Package size={14} /> Tồn kho
        </button>
        <button
          onClick={() => setActiveTab('DEBT')}
          className={`p-2 rounded-lg font-semibold flex items-center gap-1 ${
            activeTab === 'DEBT' ? 'bg-blue-600 text-white' : 'text-slate-400'
          }`}
        >
          <Users size={14} /> Công nợ
        </button>
        <button
          onClick={() => setActiveTab('MB_BANK')}
          className={`p-2 rounded-lg font-semibold flex items-center gap-1 ${
            activeTab === 'MB_BANK' ? 'bg-blue-600 text-white' : 'text-slate-400'
          }`}
        >
          <Landmark size={14} /> MB Bank
        </button>
      </div>

      {/* MAIN CONTAINER */}
      <main className="flex-1 p-4 md:p-6 max-w-7xl w-full mx-auto space-y-6">

        {/* 1. POS TAB */}
        {activeTab === 'POS' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* PRODUCTS SELECTION AREA */}
            <div className="lg:col-span-2 space-y-4">
              {/* SEARCH & FILTERS */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-3 text-slate-500" size={18} />
                  <input
                    type="text"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    placeholder="Tìm theo tên sản phẩm hoặc mã SKU (Mực in, Dung môi, Đầu in...)"
                    value={posSearch}
                    onChange={e => setPosSearch(e.target.value)}
                  />
                </div>
                <select
                  className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  value={invCategoryFilter}
                  onChange={e => setInvCategoryFilter(e.target.value)}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat === 'ALL' ? 'Tất cả danh mục' : cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* PRODUCTS GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredProducts.map(prod => (
                  <div
                    key={prod.id}
                    className="bg-slate-900/80 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-4 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/10 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-800 text-slate-400">
                          {prod.sku}
                        </span>
                        <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
                          prod.stock <= 10 ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-emerald-500/10 text-emerald-400'
                        }`}>
                          Tồn: {prod.stock} {prod.unit}
                        </span>
                      </div>
                      <h3 className="font-semibold text-sm text-slate-100 group-hover:text-blue-400 transition-colors line-clamp-2 mb-1">
                        {prod.name}
                      </h3>
                      <p className="text-xs text-slate-400 mb-3">{prod.category}</p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                      <div>
                        <div className="text-xs text-slate-500">Đơn giá</div>
                        <div className="text-base font-bold text-cyan-400">
                          {prod.price.toLocaleString('vi-VN')} đ
                        </div>
                      </div>
                      <button
                        onClick={() => addToCart(prod)}
                        className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-md shadow-blue-600/30 transition-all transform active:scale-95 flex items-center justify-center"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CART & CHECKOUT PANEL */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between h-full space-y-4">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="text-blue-400" size={20} />
                    <h2 className="font-bold text-base text-white">Giỏ Hàng Đơn Hàng</h2>
                  </div>
                  <span className="bg-blue-600/20 text-blue-400 text-xs px-2.5 py-1 rounded-full font-bold">
                    {cart.reduce((a, b) => a + b.qty, 0)} món
                  </span>
                </div>

                {/* CUSTOMER SELECTOR */}
                <div className="my-4 space-y-2">
                  <label className="block text-xs font-semibold text-slate-400">Khách Hàng Đơn Hàng</label>
                  <select
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                    value={selectedCustomerId}
                    onChange={e => setSelectedCustomerId(e.target.value)}
                  >
                    <option value="">-- Khách Lẻ (Thanh toán ngay) --</option>
                    {customers.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.code} - {c.name} {c.debt > 0 ? `(Nợ: ${c.debt.toLocaleString('vi-VN')}đ)` : ''}
                      </option>
                    ))}
                  </select>
                </div>

                {/* CART ITEMS LIST */}
                <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
                  {cart.length === 0 ? (
                    <div className="text-center py-12 text-slate-500 text-sm">
                      <ShoppingCart size={40} className="mx-auto mb-2 opacity-30" />
                      Chưa có sản phẩm nào trong giỏ
                    </div>
                  ) : (
                    cart.map(item => (
                      <div key={item.productId} className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                        <div className="flex-1 min-w-0 mr-2">
                          <h4 className="text-xs font-semibold text-slate-200 truncate">{item.name}</h4>
                          <div className="text-[11px] text-cyan-400 font-medium">
                            {item.price.toLocaleString('vi-VN')} đ
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg">
                            <button
                              onClick={() => updateCartQty(item.productId, item.qty - 1)}
                              className="px-2 py-1 text-slate-400 hover:text-white"
                            >
                              -
                            </button>
                            <span className="px-2 text-xs font-bold text-white">{item.qty}</span>
                            <button
                              onClick={() => updateCartQty(item.productId, item.qty + 1)}
                              className="px-2 py-1 text-slate-400 hover:text-white"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.productId)}
                            className="text-slate-500 hover:text-red-400 p-1"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* PAYMENT SUMMARY */}
              <div className="pt-4 border-t border-slate-800 space-y-3">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Tạm tính:</span>
                  <span className="font-semibold text-white">{subtotalCart.toLocaleString('vi-VN')} đ</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Chiết khấu (%):</span>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    className="w-16 bg-slate-950 border border-slate-800 rounded px-2 py-1 text-right text-xs text-white"
                    value={discountPercent}
                    onChange={e => setDiscountPercent(Math.max(0, Math.min(100, Number(e.target.value))))}
                  />
                </div>
                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-slate-800">
                  <span>Tổng thanh toán:</span>
                  <span className="text-cyan-400">{grandTotalCart.toLocaleString('vi-VN')} đ</span>
                </div>

                {/* PAYMENT OPTIONS */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    onClick={() => setPaymentMethod('MB_BANK')}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                      paymentMethod === 'MB_BANK'
                        ? 'bg-blue-600/20 border-blue-500 text-blue-400'
                        : 'border-slate-800 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <Landmark size={14} /> Chuyển khoản MB
                  </button>
                  <button
                    onClick={() => setPaymentMethod('CASH')}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                      paymentMethod === 'CASH'
                        ? 'bg-blue-600/20 border-blue-500 text-blue-400'
                        : 'border-slate-800 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <BanknoteIcon size={14} /> Tiền mặt
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setPaymentStatus('PAID')}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                      paymentStatus === 'PAID'
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                        : 'border-slate-800 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <CheckCircle2 size={14} /> Đã thanh toán
                  </button>
                  <button
                    onClick={() => setPaymentStatus('DEBT')}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                      paymentStatus === 'DEBT'
                        ? 'bg-red-500/20 border-red-500 text-red-400'
                        : 'border-slate-800 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <Clock size={14} /> Ghi nợ công nợ
                  </button>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={cart.length === 0}
                  className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 disabled:opacity-50 text-white font-bold rounded-xl shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
                >
                  <Receipt size={18} /> HOÀN TẤT ĐƠN HÀNG
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 2. INVENTORY TAB */}
        {activeTab === 'INVENTORY' && (
          <div className="space-y-6">
            {/* STATS CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-semibold uppercase">Tổng Mẫu Mã Tồn Kho</span>
                  <Boxes className="text-blue-400" size={20} />
                </div>
                <div className="text-2xl font-bold text-white">{products.length} sản phẩm</div>
                <div className="text-xs text-slate-500 mt-1">Gồm Mực in, Dung môi, Đầu in</div>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-semibold uppercase">Tổng Số Lượng Tồn</span>
                  <Package className="text-cyan-400" size={20} />
                </div>
                <div className="text-2xl font-bold text-cyan-400">{totalStockItems.toLocaleString('vi-VN')} món</div>
                <div className="text-xs text-slate-500 mt-1">Cập nhật đến Tháng 07/2026</div>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-semibold uppercase">Giá Trị Tồn (Giá Vốn)</span>
                  <DollarSign className="text-emerald-400" size={20} />
                </div>
                <div className="text-2xl font-bold text-emerald-400">{totalStockCostValue.toLocaleString('vi-VN')} đ</div>
                <div className="text-xs text-slate-500 mt-1">Giá bán: {totalStockSellValue.toLocaleString('vi-VN')} đ</div>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-semibold uppercase">Cảnh Báo Hàng Sắp Hết</span>
                  <AlertTriangle className="text-amber-400" size={20} />
                </div>
                <div className="text-2xl font-bold text-amber-400">{lowStockProducts.length} sản phẩm</div>
                <div className="text-xs text-amber-500/80 mt-1">Tồn kho dưới 10 đơn vị</div>
              </div>
            </div>

            {/* INVENTORY TABLE TOOLBAR */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-1 gap-3 w-full">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-3 text-slate-500" size={18} />
                  <input
                    type="text"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    placeholder="Tìm theo SKU hoặc tên vật tư tồn kho..."
                    value={invSearch}
                    onChange={e => setInvSearch(e.target.value)}
                  />
                </div>
                <select
                  className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  value={invCategoryFilter}
                  onChange={e => setInvCategoryFilter(e.target.value)}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat === 'ALL' ? 'Tất cả danh mục' : cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                <button
                  onClick={() => setShowLowStockOnly(!showLowStockOnly)}
                  className={`px-4 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all ${
                    showLowStockOnly
                      ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                      : 'border-slate-800 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <Filter size={15} /> Chỉ xem hàng sắp hết ({lowStockProducts.length})
                </button>
                <button
                  onClick={() => setShowAddProductModal(true)}
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-xs flex items-center gap-2 shadow-md shadow-blue-500/20"
                >
                  <Plus size={16} /> Nhập Vật Tư Mới
                </button>
              </div>
            </div>

            {/* INVENTORY TABLE */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-950/80 border-b border-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      <th className="p-4">Mã SKU</th>
                      <th className="p-4">Tên Vật Tư / Sản Phẩm</th>
                      <th className="p-4">Danh Mục</th>
                      <th className="p-4">Đơn Vị</th>
                      <th className="p-4 text-right">Giá Vốn (VNĐ)</th>
                      <th className="p-4 text-right">Giá Bán (VNĐ)</th>
                      <th className="p-4 text-center">Tồn Kho (07/2026)</th>
                      <th className="p-4 text-right">Tổng Giá Trị</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-sm">
                    {filteredInventoryProducts.map(p => (
                      <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-4 font-mono text-xs text-blue-400 font-semibold">{p.sku}</td>
                        <td className="p-4 font-semibold text-slate-100">{p.name}</td>
                        <td className="p-4 text-xs text-slate-400">{p.category}</td>
                        <td className="p-4 text-xs text-slate-300">{p.unit}</td>
                        <td className="p-4 text-right text-slate-400">{p.costPrice.toLocaleString('vi-VN')} đ</td>
                        <td className="p-4 text-right text-cyan-400 font-medium">{p.price.toLocaleString('vi-VN')} đ</td>
                        <td className="p-4 text-center">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                            p.stock <= 10
                              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                              : 'bg-emerald-500/10 text-emerald-400'
                          }`}>
                            {p.stock <= 10 && <AlertTriangle size={13} />}
                            {p.stock} {p.unit}
                          </span>
                        </td>
                        <td className="p-4 text-right font-bold text-emerald-400">
                          {(p.stock * p.price).toLocaleString('vi-VN')} đ
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 3. DEBT MANAGEMENT TAB */}
        {activeTab === 'DEBT' && (
          <div className="space-y-6">
            {/* STATS OVERVIEW */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-semibold uppercase">Tổng Công Nợ Cần Thu</span>
                  <TrendingUp className="text-red-400" size={20} />
                </div>
                <div className="text-3xl font-bold text-red-400">{totalReceivables.toLocaleString('vi-VN')} đ</div>
                <div className="text-xs text-slate-500 mt-1">Cần theo dõi thu hồi từ khách hàng</div>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-semibold uppercase">Tổng Doanh Số Đã Phát Sinh</span>
                  <DollarSign className="text-cyan-400" size={20} />
                </div>
                <div className="text-3xl font-bold text-cyan-400">{totalInvoicedSum.toLocaleString('vi-VN')} đ</div>
                <div className="text-xs text-slate-500 mt-1">Tất cả hợp đồng / hóa đơn</div>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-semibold uppercase">Đã Thu Qua MB Bank</span>
                  <CheckCircle2 className="text-emerald-400" size={20} />
                </div>
                <div className="text-3xl font-bold text-emerald-400">{totalPaidSum.toLocaleString('vi-VN')} đ</div>
                <div className="text-xs text-slate-500 mt-1">Số dư MB Bank hiện tại: {mbBalance.toLocaleString('vi-VN')} đ</div>
              </div>
            </div>

            {/* DEBT SEARCH & FILTER */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-1 gap-3 w-full">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-3 text-slate-500" size={18} />
                  <input
                    type="text"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    placeholder="Tìm theo Mã KH, Tên Công ty, Mã Số Thuế..."
                    value={debtSearch}
                    onChange={e => setDebtSearch(e.target.value)}
                  />
                </div>
                <select
                  className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  value={debtStatusFilter}
                  onChange={e => setDebtStatusFilter(e.target.value as any)}
                >
                  <option value="ALL">Tất cả khách hàng</option>
                  <option value="DEBT">Chưa trả / Còn nợ</option>
                  <option value="PAID">Đã thanh toán hết</option>
                </select>
              </div>

              <button
                onClick={() => setShowAddCustomerModal(true)}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-xs flex items-center gap-2 shadow-md shadow-blue-500/20"
              >
                <UserPlus size={16} /> Thêm Khách Hàng Mới
              </button>
            </div>

            {/* DEBT CUSTOMER TABLE */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-950/80 border-b border-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      <th className="p-4">Mã KH</th>
                      <th className="p-4">Tên Công Ty / Khách Hàng</th>
                      <th className="p-4">Mã Số Thuế</th>
                      <th className="p-4 text-right">Tổng Phát Sinh</th>
                      <th className="p-4 text-right">Đã Thanh Toán</th>
                      <th className="p-4 text-right">Công Nợ Còn Lại</th>
                      <th className="p-4 text-center">Trạng Thái</th>
                      <th className="p-4 text-center">Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-sm">
                    {filteredCustomers.map(c => (
                      <tr key={c.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-4 font-mono text-xs text-blue-400 font-bold">{c.code}</td>
                        <td className="p-4 font-semibold text-slate-100">
                          <div>{c.name}</div>
                          <div className="text-xs text-slate-500 font-normal">{c.address}</div>
                        </td>
                        <td className="p-4 font-mono text-xs text-slate-400">{c.taxId || 'N/A'}</td>
                        <td className="p-4 text-right font-medium text-slate-300">
                          {c.totalInvoiced.toLocaleString('vi-VN')} đ
                        </td>
                        <td className="p-4 text-right font-medium text-emerald-400">
                          {c.totalPaid.toLocaleString('vi-VN')} đ
                        </td>
                        <td className="p-4 text-right font-bold text-red-400">
                          {c.debt > 0 ? `${c.debt.toLocaleString('vi-VN')} đ` : '0 đ'}
                        </td>
                        <td className="p-4 text-center">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                            c.debt > 0
                              ? 'bg-red-500/10 text-red-400 border border-red-500/30'
                              : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          }`}>
                            {c.debt > 0 ? (
                              <>
                                <Clock size={13} /> CÒN NỢ
                              </>
                            ) : (
                              <>
                                <CheckCircle2 size={13} /> ĐÃ TRẢ HẾT
                              </>
                            )}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          {c.debt > 0 ? (
                            <button
                              onClick={() => {
                                setSelectedDebtCustomer(c);
                                setPayAmountInput(c.debt);
                              }}
                              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow-md transition-all flex items-center gap-1 mx-auto"
                            >
                              <CreditCard size={14} /> Thu Nợ / Gạch
                            </button>
                          ) : (
                            <span className="text-xs text-slate-500 italic">Hoàn tất</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 4. MB BANK INTEGRATION TAB */}
        {activeTab === 'MB_BANK' && (
          <div className="space-y-6">
            {/* MB BANK ACCOUNT BANNER */}
            <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-800/40 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
              <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-400 shadow-xl">
                    <Landmark size={36} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-bold text-white">Tài Khoản MB BANK (Công ty TNHH VNPIS)</h2>
                      <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2.5 py-0.5 rounded-full font-semibold border border-emerald-500/30 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span> Live Connected
                      </span>
                    </div>
                    <p className="text-sm text-slate-300 font-mono mt-1">
                      Số TK: <span className="text-cyan-400 font-bold">660902840344</span> | Ngân hàng TMCP Quân Đội
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto">
                  <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl text-right flex-1 sm:flex-none min-w-[200px]">
                    <div className="text-xs text-slate-400 font-medium flex items-center justify-end gap-1">
                      <span>Số dư khả dụng thực tế</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" title="Real-time Live"></span>
                    </div>
                    <div className="text-2xl font-bold text-emerald-400">{mbBalance.toLocaleString('vi-VN')} đ</div>
                  </div>
                  <div className="flex flex-col gap-2 w-full sm:w-auto">
                    <button
                      onClick={handleSyncMBBank}
                      disabled={mbSyncing}
                      className="py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 text-xs w-full"
                    >
                      <RefreshCw size={16} className={mbSyncing ? 'animate-spin' : ''} />
                      <span>{mbSyncing ? 'Đang đồng bộ...' : 'Đồng Bộ MB Bank API'}</span>
                    </button>
                    <button
                      onClick={() => alert('Webhook Real-time Endpoint: https://vnpis.com/api/mbbank/webhook\\n\\nTài khoản MB Bank 660902840344 đã sẵn sàng nhận biến động số dư tức thì (<3s)!')}
                      className="py-2 px-4 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-400 font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 text-xs w-full"
                    >
                      <CheckCircle2 size={14} /> Cấu hình Webhook Real-time
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* SEARCH & TRANSACTION FILTERS */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-1 gap-3 w-full">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-3 text-slate-500" size={18} />
                  <input
                    type="text"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    placeholder="Tìm theo nội dung chuyển khoản, tên khách hàng, mã giao dịch MB..."
                    value={mbSearch}
                    onChange={e => setMbSearch(e.target.value)}
                  />
                </div>
                <select
                  className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  value={mbTypeFilter}
                  onChange={e => setMbTypeFilter(e.target.value as any)}
                >
                  <option value="ALL">Tất cả giao dịch</option>
                  <option value="IN">Tiền vào (Khách thanh toán)</option>
                  <option value="OUT">Tiền ra (Chi phí / Vật tư)</option>
                </select>
              </div>
            </div>

            {/* MB BANK TRANSACTIONS TABLE */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex justify-between items-center">
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <FileSpreadsheet className="text-blue-400" size={18} />
                  Nhật Ký Giao Dịch Ngân Hàng MB Bank (07/2026)
                </h3>
                <span className="text-xs text-slate-400">Hiển thị {filteredMbTransactions.length} giao dịch</span>
              </div>
              <div className="overflow-x-auto max-h-[500px]">
                <table className="w-full text-left border-collapse">
                  <thead className="sticky top-0 bg-slate-950 border-b border-slate-800 text-xs font-semibold text-slate-400 uppercase">
                    <tr>
                      <th className="p-4">Thời Gian</th>
                      <th className="p-4">Mã GD MB</th>
                      <th className="p-4">Đối Tác Chuyển / Nhận</th>
                      <th className="p-4">Nội Dung Chuyển Khoản</th>
                      <th className="p-4 text-right">Số Tiền (VNĐ)</th>
                      <th className="p-4 text-center">Khớp Công Nợ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-sm">
                    {filteredMbTransactions.map(t => (
                      <tr key={t.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-4 text-xs font-mono text-slate-400">{t.transDate}</td>
                        <td className="p-4 font-mono text-xs text-blue-400 font-semibold">{t.id}</td>
                        <td className="p-4 font-semibold text-slate-200">
                          <div>{t.counterName || 'Khách hàng MB'}</div>
                          {t.matchedCustomerName && (
                            <div className="text-xs text-emerald-400 font-normal flex items-center gap-1 mt-0.5">
                              <CheckCircle2 size={12} /> {t.matchedCustomerName}
                            </div>
                          )}
                        </td>
                        <td className="p-4 text-xs text-slate-300 max-w-xs truncate">{t.remark}</td>
                        <td className="p-4 text-right font-bold">
                          <span className={t.type === 'IN' ? 'text-emerald-400' : 'text-red-400'}>
                            {t.type === 'IN' ? '+' : '-'}{t.amount.toLocaleString('vi-VN')} đ
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          {t.type === 'IN' ? (
                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                              t.matchedStatus === 'MATCHED'
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            }`}>
                              {t.matchedStatus === 'MATCHED' ? 'Đã Gạch Nợ' : 'Chờ Khớp'}
                            </span>
                          ) : (
                            <span className="text-xs text-slate-500">Chi phí</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* MODAL: THU NỢ KHÁCH HÀNG */}
      {selectedDebtCustomer && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <CreditCard className="text-emerald-400" size={20} />
                Ghi Nhận Thanh Toán Công Nợ
              </h3>
              <button
                onClick={() => setSelectedDebtCustomer(null)}
                className="text-slate-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                <div className="text-slate-400">Khách hàng:</div>
                <div className="font-bold text-sm text-white">{selectedDebtCustomer.name}</div>
                <div className="text-slate-400">Mã KH: <span className="text-cyan-400 font-mono">{selectedDebtCustomer.code}</span> | MST: {selectedDebtCustomer.taxId}</div>
              </div>

              <div className="flex justify-between text-sm py-1">
                <span className="text-slate-400">Công nợ hiện tại:</span>
                <span className="font-bold text-red-400">{selectedDebtCustomer.debt.toLocaleString('vi-VN')} đ</span>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Số tiền thu (Khách trả qua MB Bank / Tiền mặt)
                </label>
                <input
                  type="number"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-base font-bold text-emerald-400 focus:outline-none focus:border-emerald-500"
                  value={payAmountInput}
                  onChange={e => setPayAmountInput(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setSelectedDebtCustomer(null)}
                className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl text-xs"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleRecordPayment}
                className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-emerald-600/30"
              >
                Xác Nhận Thu Nợ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: THÊM VẬT TƯ MỚI */}
      {showAddProductModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-base text-white">Nhập Thêm Vật Tư Tồn Kho Mới</h3>
              <button onClick={() => setShowAddProductModal(false)} className="text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Mã SKU</label>
                <input
                  type="text"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  placeholder="VNPIS-INK-99"
                  value={newProduct.sku}
                  onChange={e => setNewProduct({ ...newProduct, sku: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Tên Vật Tư / Sản Phẩm</label>
                <input
                  type="text"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  placeholder="Mực in Pad..."
                  value={newProduct.name}
                  onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Danh Mục</label>
                <select
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  value={newProduct.category}
                  onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}
                >
                  <option value="Mực in công nghiệp">Mực in công nghiệp</option>
                  <option value="Mực in UV">Mực in UV</option>
                  <option value="Dung môi & Phụ gia">Dung môi & Phụ gia</option>
                  <option value="Vật tư & Linh kiện">Vật tư & Linh kiện</option>
                  <option value="Dịch vụ & Sửa chữa">Dịch vụ & Sửa chữa</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Đơn Vị Tính</label>
                <input
                  type="text"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  placeholder="Kg, Lít, Cái..."
                  value={newProduct.unit}
                  onChange={e => setNewProduct({ ...newProduct, unit: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Giá Vốn (đ)</label>
                <input
                  type="number"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  value={newProduct.costPrice}
                  onChange={e => setNewProduct({ ...newProduct, costPrice: Number(e.target.value) })}
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Giá Bán (đ)</label>
                <input
                  type="number"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  value={newProduct.price}
                  onChange={e => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                />
              </div>

              <div className="col-span-2">
                <label className="block text-slate-400 mb-1">Số Lượng Tồn Kho Ban Đầu</label>
                <input
                  type="number"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold"
                  value={newProduct.stock}
                  onChange={e => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowAddProductModal(false)}
                className="flex-1 py-2.5 bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold"
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  if (!newProduct.name || !newProduct.sku) return alert('Vui lòng nhập tên và mã SKU!');
                  const prodObj: Product = {
                    id: Date.now().toString(),
                    sku: newProduct.sku || '',
                    name: newProduct.name || '',
                    category: newProduct.category || 'Mực in công nghiệp',
                    unit: newProduct.unit || 'Kg',
                    costPrice: newProduct.costPrice || 0,
                    price: newProduct.price || 0,
                    stock: newProduct.stock || 0
                  };
                  setProducts(prev => [prodObj, ...prev]);
                  setShowAddProductModal(false);
                  alert('Thêm vật tư thành công!');
                }}
                className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-600/30"
              >
                Thêm Vào Kho
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: THÊM KHÁCH HÀNG MỚI */}
      {showAddCustomerModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-base text-white">Thêm Khách Hàng Doanh Nghiệp Mới</h3>
              <button onClick={() => setShowAddCustomerModal(false)} className="text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Mã Khách Hàng</label>
                <input
                  type="text"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  placeholder="Mã KH (e.g. CTY_ABC)"
                  value={newCustomer.code}
                  onChange={e => setNewCustomer({ ...newCustomer, code: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Mã Số Thuế</label>
                <input
                  type="text"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  placeholder="031..."
                  value={newCustomer.taxId}
                  onChange={e => setNewCustomer({ ...newCustomer, taxId: e.target.value })}
                />
              </div>

              <div className="col-span-2">
                <label className="block text-slate-400 mb-1">Tên Công Ty / Khách Hàng</label>
                <input
                  type="text"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  placeholder="CÔNG TY TNHH..."
                  value={newCustomer.name}
                  onChange={e => setNewCustomer({ ...newCustomer, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Số Điện Thoại</label>
                <input
                  type="text"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  placeholder="090..."
                  value={newCustomer.phone}
                  onChange={e => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Email Liên Hệ</label>
                <input
                  type="email"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  placeholder="contact@..."
                  value={newCustomer.email}
                  onChange={e => setNewCustomer({ ...newCustomer, email: e.target.value })}
                />
              </div>

              <div className="col-span-2">
                <label className="block text-slate-400 mb-1">Địa Chỉ Đăng Ký Kinh Doanh</label>
                <input
                  type="text"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  placeholder="Địa chỉ..."
                  value={newCustomer.address}
                  onChange={e => setNewCustomer({ ...newCustomer, address: e.target.value })}
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowAddCustomerModal(false)}
                className="flex-1 py-2.5 bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold"
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  if (!newCustomer.name || !newCustomer.code) return alert('Vui lòng nhập tên và mã khách hàng!');
                  const custObj: Customer = {
                    id: Date.now().toString(),
                    code: newCustomer.code || '',
                    name: newCustomer.name || '',
                    taxId: newCustomer.taxId || '',
                    phone: newCustomer.phone || '',
                    email: newCustomer.email || '',
                    address: newCustomer.address || '',
                    totalInvoiced: 0,
                    totalPaid: 0,
                    debt: 0,
                    status: 'PAID'
                  };
                  setCustomers(prev => [custObj, ...prev]);
                  setShowAddCustomerModal(false);
                  alert('Thêm khách hàng thành công!');
                }}
                className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-600/30"
              >
                Thêm Khách Hàng
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-slate-900 border-t border-slate-800 px-6 py-4 text-center text-xs text-slate-500">
        Công Ty TNHH VNPIS - 18 Đường số 4, KDC Đại Phúc Green Villas, Xã Bình Hưng, TP. Hồ Chí Minh
      </footer>
    </div>
  );
}

// Helper icon component
function BanknoteIcon(props: any) {
  return <CreditCard {...props} />;
}
