'use client';

import React, { useState } from 'react';
import { 
  Building2, Smartphone, Laptop, Camera, CheckCircle2, Clock, 
  FileText, MessageSquare, Bell, Shield, Lock, Eye, 
  FileSpreadsheet, LogOut, UserCheck, 
  MapPin, Wifi, RefreshCw, Send, Plus, X, Download, ShieldCheck
} from 'lucide-react';

// Type definitions
interface Employee {
  id: string;
  stt?: number;
  name: string;
  role: string;
  isManager?: boolean;
  cmnd?: string;
  phone: string;
  status: string;
  baseSalary: number;
  allowances?: { house?: number; lunch?: number; phone?: number; fuel?: number; seniority?: number };
  taxableIncome?: number;
  personalTax?: number;
  netPay: number;
}

interface TaskItem {
  id: string;
  title: string;
  desc: string;
  status: 'done' | 'pending';
  photo: string | null;
  time: string;
}

interface LeaveItem {
  id: string;
  employeeName: string;
  type: string;
  dateRange: string;
  reason: string;
  status: 'approved' | 'pending';
  submittedAt: string;
}

interface ChatMsg {
  sender: string;
  text: string;
  isMe: boolean;
  time: string;
}

interface NewsItem {
  id: string;
  title: string;
  date: string;
  content: string;
}

interface CompanyData {
  id: string;
  name: string;
  tagline: string;
  logo: string;
  office: string;
  wifiSsid: string;
  gpsCoords: string;
  primaryColor: string;
  hotline: string;
  email: string;
  website: string;
  chatChannel: string;
  payrollFileSource?: string;
  employees: Employee[];
  tasks: TaskItem[];
  leaves: LeaveItem[];
  chatMessages: ChatMsg[];
  announcements: NewsItem[];
}

const INITIAL_DATA: Record<string, CompanyData> = {
  vnpis: {
    id: 'vnpis',
    name: 'Công Ty TNHH VNPIS',
    tagline: 'Chuyên Gia Giải Pháp In Ấn Công Nghiệp (MST: 0315801557)',
    logo: '/images/vnpis-logo.png',
    office: 'Tầng 7, 60 Nguyễn Văn Thủ, P. Đa Kao, Q.1 | Demo Center: 62 Trần Thị Nơi, Q.8, TP.HCM',
    wifiSsid: 'VNPIS-DEMO-CENTER',
    gpsCoords: '10.7412° N, 106.6781° E',
    primaryColor: '#2563eb',
    hotline: '0987 453 866 (Mr. Tâm)',
    email: 'info@vnpis.com',
    website: 'https://vnpis.com',
    chatChannel: 'Kênh Kỹ Thuật & Xưởng In VNPIS',
    payrollFileSource: 'LUONG VNPIS - BANG MOI - 2026.xlsx',
    employees: [
      {
        id: 'COS-001', stt: 1, name: 'Hứa Thị Ánh Nga', role: 'Giám đốc', isManager: true, cmnd: '079188002451', phone: '0922 740 001', status: 'Active',
        baseSalary: 18000000, allowances: { house: 0, lunch: 910000, phone: 1000000, fuel: 500000, seniority: 39195640 }, taxableIncome: 57715640, personalTax: 8120314, netPay: 49540000
      },
      {
        id: 'COS-002', stt: 2, name: 'Lưu Trọng Tâm', role: 'Phó Giám đốc / Kỹ Thuật Trưởng', isManager: true, cmnd: '079089013963', phone: '0902 840 344', status: 'Active',
        baseSalary: 18000000, allowances: { house: 1000000, lunch: 910000, phone: 1000000, fuel: 500000, seniority: 15000000 }, taxableIncome: 34520000, personalTax: 4250000, netPay: 30270000
      },
      {
        id: 'COS-003', stt: 3, name: 'Hồ Hoàng Phú', role: 'Nhân viên Kỹ Thuật In Pad', isManager: false, cmnd: '212263353', phone: '0912 888 777', status: 'Active',
        baseSalary: 16500000, allowances: { house: 1000000, lunch: 910000, phone: 0, fuel: 500000, seniority: 2500000 }, taxableIncome: 19677500, personalTax: 2150000, netPay: 19461583
      },
      {
        id: 'COS-004', stt: 4, name: 'Trần Thị Luyện', role: 'Bán hàng B2B', isManager: false, cmnd: '091913527', phone: '0919 135 270', status: 'Active',
        baseSalary: 14000000, allowances: { house: 0, lunch: 910000, phone: 500000, fuel: 500000, seniority: 3331240 }, taxableIncome: 18331240, personalTax: 336124, netPay: 18444255
      },
      {
        id: 'COS-005', stt: 5, name: 'Lưu Kim Phát', role: 'Vận Hành Pad Printer', isManager: false, cmnd: '079090033979', phone: '0790 900 339', status: 'Active',
        baseSalary: 13500000, allowances: { house: 1000000, lunch: 910000, phone: 500000, fuel: 500000, seniority: 0 }, taxableIncome: 15500000, personalTax: 154125, netPay: 14610500
      },
      {
        id: 'COS-006', stt: 6, name: 'Hứa Huy Cường', role: 'Nhân viên Kho & Đúc Silicone', isManager: false, cmnd: '026043055', phone: '0908 111 222', status: 'Active',
        baseSalary: 7000000, allowances: { house: 0, lunch: 910000, phone: 0, fuel: 300000, seniority: 0 }, taxableIncome: 7475000, personalTax: 0, netPay: 6848333
      },
      {
        id: 'COS-007', stt: 7, name: 'Bùi Huy Tài', role: 'Bảo Trì Máy In', isManager: false, cmnd: '086182006609', phone: '0861 820 066', status: 'Active',
        baseSalary: 15000000, allowances: { house: 1000000, lunch: 910000, phone: 0, fuel: 500000, seniority: 0 }, taxableIncome: 16500000, personalTax: 250000, netPay: 17285833
      },
      {
        id: 'COS-008', stt: 8, name: 'Nguyễn Chí Lăng', role: 'Thời Vụ In Pad', isManager: false, cmnd: '079202037642', phone: '0792 020 376', status: 'Active',
        baseSalary: 6500000, allowances: { house: 0, lunch: 500000, phone: 0, fuel: 300000, seniority: 0 }, taxableIncome: 7300000, personalTax: 730000, netPay: 6570000
      }
    ],
    tasks: [
      {
        id: 'TSK-C-101',
        title: 'Kiểm tra kho mực in Pad chứng nhận ZDHC Level 3, REACH',
        desc: 'Đếm số lượng lon mực xanh/đỏ và dán tem kiểm định tại Demo Center 62 Trần Thị Nơi, Q.8.',
        status: 'done',
        photo: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=400&q=80',
        time: '08:00 AM'
      },
      {
        id: 'TSK-C-102',
        title: 'Báo cáo ảnh chụp đúc Silicone Pad in tampon theo khuôn',
        desc: 'Chụp ảnh bề mặt silicon mịn không bị bọt khí trước khi giao cho khách test mẫu.',
        status: 'pending',
        photo: null,
        time: '11:00 AM'
      }
    ],
    leaves: [
      {
        id: 'LV-C-201',
        employeeName: 'Hứa Huy Cường',
        type: 'Nghỉ ốm / Việc riêng',
        dateRange: '11/09/2026',
        reason: 'Đi khám sức khỏe định kỳ',
        status: 'pending',
        submittedAt: '08:15 AM 10/09/2026'
      }
    ],
    chatMessages: [
      { sender: 'Mr. Tâm (Phó Giám Đốc)', text: 'Alo Nga ơi, bên Demo Center Q.8 cần chuẩn bị 10 lon mực in pad mã ZDHC để test mẫu cho khách nhé.', isMe: false, time: '08:10 AM' },
      { sender: 'Hứa Thị Ánh Nga (Giám Đốc)', text: 'Dạ anh Tâm, em đã cho xuất kho tại 62 Trần Thị Nơi và chuẩn bị xong rồi nhé!', isMe: true, time: '08:14 AM' }
    ],
    announcements: [
      {
        id: 'NEWS-C-1',
        title: '📊 Cập Nhật Bảng Lương Mới 2026 - Cosota Vietnam',
        date: '10/09/2026',
        content: 'Bảng lương chi tiết đã được đồng bộ chính thức từ file LUONG COSOTA - BANG MOI - 2026.xlsx. Nhân viên có thể tra cứu chi tiết phiếu lương cá nhân bảo mật trên App.'
      },
      {
        id: 'NEWS-C-2',
        title: '🏢 Địa Chỉ Văn Phòng & Demo Center Cosota Vietnam',
        date: '01/09/2026',
        content: '• VP Chính: Lầu 7, Số 60 Nguyễn Văn Thủ, P. Đa Kao, Q.1, TP.HCM.\n• Demo Center: 62 Trần Thị Nơi, P.4, Q.8, TP.HCM.\n• MST: 0315801557 | Hotline: 0902 840 344 (Mr. Tâm) - 0922 740 001 (Ms. Nga).'
      }
    ]
  }
};

export default function HrmPortalPage() {
  const [dataStore, setDataStore] = useState<Record<string, CompanyData>>(INITIAL_DATA);
  const [companyId, setCompanyId] = useState<string>('vnpis');
  const [viewMode, setViewMode] = useState<'mobile' | 'desktop'>('mobile');
  const [currentEmpId, setCurrentEmpId] = useState<string>('COS-003'); // Default to Hồ Hoàng Phú (Staff)
  const [mobileTab, setMobileTab] = useState<'home' | 'leave' | 'tasks' | 'payslip' | 'chat' | 'news'>('home');
  const [adminSection, setAdminSection] = useState<'overview' | 'attendance' | 'approvals' | 'employees' | 'payroll'>('overview');
  
  // Security & Pin State
  const [isAdminPinUnlocked, setIsAdminPinUnlocked] = useState<boolean>(false);
  const [showPinModal, setShowPinModal] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');

  // Modals
  const [showCheckInModal, setShowCheckInModal] = useState<boolean>(false);
  const [checkInTimeStr, setCheckInTimeStr] = useState<string>('07:55 AM');
  const [isCheckedIn, setIsCheckedIn] = useState<boolean>(true);
  
  const [showLeaveModal, setShowLeaveModal] = useState<boolean>(false);
  const [leaveForm, setLeaveForm] = useState({ type: 'Nghỉ phép năm', startDate: '2026-09-11', endDate: '2026-09-11', reason: 'Có việc gia đình đột xuất' });

  const [chatInput, setChatInput] = useState<string>('');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const currentCompany = dataStore[companyId] || dataStore['vnpis'] || Object.values(dataStore)[0];
  const activeUser = currentCompany.employees.find(e => e.id === currentEmpId) || currentCompany.employees[0];

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleSwitchCompany = (newComp: 'cosota' | 'vnpis') => {
    setCompanyId(newComp);
    const newCompData = dataStore[newComp];
    setCurrentEmpId(newCompData.employees[0].id);
    showToast(`Đã chuyển sang Cổng HRM của ${newCompData.name}`);
  };

  const handleAdminSectionClick = (section: typeof adminSection) => {
    if (section === 'payroll' && !activeUser.isManager && !isAdminPinUnlocked) {
      setShowPinModal(true);
      return;
    }
    setAdminSection(section);
  };

  const verifyAdminPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === '2026' || pinInput === '123456') {
      setIsAdminPinUnlocked(true);
      setShowPinModal(false);
      setAdminSection('payroll');
      setPinInput('');
      setPinError('');
      showToast('🔓 Xác thực Quản lý thành công! Mở khóa Quyền xem Bảng Lương.');
    } else {
      setPinError('Mã PIN không đúng! (Gợi ý mã thử nghiệm: 2026)');
    }
  };

  const handleCheckInConfirm = () => {
    const nowStr = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    setIsCheckedIn(true);
    setCheckInTimeStr(nowStr);
    setShowCheckInModal(false);
    showToast(`🎉 Check-in thành công tại ${currentCompany.office}! Thời gian: ${nowStr}`);
  };

  const handleLeaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newLeave: LeaveItem = {
      id: `LV-${Date.now()}`,
      employeeName: activeUser.name,
      type: leaveForm.type,
      dateRange: `${leaveForm.startDate} đến ${leaveForm.endDate}`,
      reason: leaveForm.reason,
      status: 'pending',
      submittedAt: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) + ' Hôm nay'
    };

    const updated = { ...dataStore };
    updated[companyId].leaves.unshift(newLeave);
    setDataStore(updated);
    setShowLeaveModal(false);
    showToast('Đã gửi đơn xin nghỉ cho Quản lý duyệt thành công!');
  };

  const handleApproveLeave = (leaveId: string) => {
    const updated = { ...dataStore };
    const target = updated[companyId].leaves.find(l => l.id === leaveId);
    if (target) {
      target.status = 'approved';
      setDataStore(updated);
      showToast(`Đã duyệt đơn nghỉ phép cho ${target.employeeName}`);
    }
  };

  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    const newMsg: ChatMsg = {
      sender: activeUser.name,
      text: chatInput.trim(),
      isMe: true,
      time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    };
    const updated = { ...dataStore };
    updated[companyId].chatMessages.push(newMsg);
    setDataStore(updated);
    setChatInput('');
  };

  const handleTaskPhotoUpload = (taskId: string) => {
    const updated = { ...dataStore };
    const task = updated[companyId].tasks.find(t => t.id === taskId);
    if (task) {
      task.photo = 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80';
      task.status = 'done';
      setDataStore(updated);
      showToast(`Đã tải ảnh báo cáo thành công cho: "${task.title}"`);
    }
  };

  const totalPayrollFund = currentCompany.employees.reduce((acc, curr) => acc + curr.netPay, 0);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans pb-12">
      
      {/* Toast Notification Banner */}
      {toastMsg && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] bg-emerald-600 text-white text-sm font-semibold px-6 py-3 rounded-full shadow-2xl border border-emerald-400 flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-200" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Global Header & Enterprise Switcher */}
      <header className="bg-slate-950/90 backdrop-blur border-b border-slate-800 sticky top-20 lg:top-24 z-40 px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Company Switcher */}
          <div className="flex items-center bg-slate-900 p-1.5 rounded-xl border border-slate-800 gap-1">
            <span className="text-xs font-medium text-slate-400 px-3 hidden md:inline-flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-emerald-400" /> Doanh Nghiệp:
            </span>
            <button 
              onClick={() => handleSwitchCompany('cosota')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                companyId === 'cosota' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <img src="https://media.loveitopcdn.com/5274/chatgpt-image-15-13-01-8-thg-5-2026-1.png" className="w-5 h-5 object-contain" alt="Cosota" />
              Cosota Vietnam
            </button>
            <button 
              onClick={() => handleSwitchCompany('vnpis')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                companyId === 'vnpis' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <img src="https://vnpis.com/images/vnpis-logo.png" className="w-5 h-5 object-contain" alt="VNPIS" />
              VNPIS Co.
            </button>
          </div>

          {/* Active Employee Login Selector */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-bold text-slate-200">{activeUser.name}</div>
              <div className="text-[11px] text-slate-400 flex items-center justify-end gap-1">
                {activeUser.isManager ? (
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">Quản Lý</span>
                ) : (
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300">Nhân Viên</span>
                )}
                <span>{activeUser.role}</span>
              </div>
            </div>
            
            <select 
              value={currentEmpId}
              onChange={(e) => setCurrentEmpId(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-2 font-medium focus:outline-none focus:border-emerald-500"
            >
              <optgroup label="Cấp Quản Lý (Managers)">
                {currentCompany.employees.filter(e => e.isManager).map(emp => (
                  <option key={emp.id} value={emp.id}>👑 {emp.name} ({emp.role})</option>
                ))}
              </optgroup>
              <optgroup label="Cấp Nhân Viên (Staff)">
                {currentCompany.employees.filter(e => !e.isManager).map(emp => (
                  <option key={emp.id} value={emp.id}>👤 {emp.name} ({emp.role})</option>
                ))}
              </optgroup>
            </select>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center bg-slate-900 p-1.5 rounded-xl border border-slate-800 gap-1">
            <button 
              onClick={() => setViewMode('mobile')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'mobile' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-4 h-4" /> Giao Diện Mobile PWA
            </button>
            <button 
              onClick={() => {
                if (!activeUser.isManager && !isAdminPinUnlocked) {
                  setShowPinModal(true);
                } else {
                  setViewMode('desktop');
                }
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'desktop' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Laptop className="w-4 h-4" /> Quản Trị Admin (Desktop)
            </button>
          </div>

        </div>
      </header>

      {/* Main Content Viewport */}
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* MODE 1: MOBILE APP SIMULATOR VIEW */}
        {viewMode === 'mobile' && (
          <div className="max-w-md mx-auto">
            
            {/* Phone Container Box */}
            <div className="bg-slate-950 border-[6px] border-slate-800 rounded-[40px] shadow-2xl overflow-hidden relative">
              
              {/* Top Notch & Status Bar */}
              <div className="bg-slate-950 px-6 py-2 flex items-center justify-between text-xs text-slate-400 border-b border-slate-900">
                <span className="font-semibold text-slate-200">08:15</span>
                <div className="w-20 h-4 bg-slate-900 rounded-full mx-auto"></div>
                <div className="flex items-center gap-2">
                  <Wifi className="w-3.5 h-3.5" />
                  <span className="font-bold text-[10px]">5G</span>
                </div>
              </div>

              {/* Mobile Header Banner */}
              <div className="p-5 bg-gradient-to-br from-slate-900 to-slate-950 border-b border-slate-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-500 shadow-md">
                      <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400">Xin chào, 👋</div>
                      <div className="text-sm font-extrabold text-white">{activeUser.name}</div>
                      <div className="text-[11px] text-emerald-400 font-semibold">{activeUser.role}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => showToast('App PWA sẵn sàng cài đặt lên Màn hình chính!')} className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300">
                      <Download className="w-4 h-4" />
                    </button>
                    <button onClick={() => setMobileTab('news')} className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300 relative">
                      <Bell className="w-4 h-4" />
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-500 rounded-full"></span>
                    </button>
                  </div>
                </div>

                {/* Office GPS Verification Badge */}
                <div className="mt-4 p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-slate-300">
                    <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div className="truncate">
                      <div className="font-bold text-slate-200 truncate">{currentCompany.name}</div>
                      <div className="text-[10px] text-slate-400">Wifi: <b className="text-emerald-400">{currentCompany.wifiSsid}</b></div>
                    </div>
                  </div>
                  <button onClick={() => showToast(`Đã xác thực vị trí GPS (${currentCompany.gpsCoords}) Hợp lệ!`)} className="p-1.5 text-slate-400 hover:text-white">
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Mobile Tab Content Scrollable Area */}
              <div className="p-4 h-[540px] overflow-y-auto bg-slate-950 space-y-4">
                
                {/* TAB 1: HOME & CHECK-IN */}
                {mobileTab === 'home' && (
                  <div className="space-y-4">
                    {/* Check-in Hero Card */}
                    <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/60 to-slate-900 border border-emerald-500/30 text-center space-y-3">
                      <div className="text-xs font-semibold text-emerald-400 flex items-center justify-center gap-2">
                        <Clock className="w-4 h-4" /> Ca Sáng: 08:00 - 17:00
                      </div>
                      <h2 className="text-3xl font-black tracking-tight text-white">08:15:32 AM</h2>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        <CheckCircle2 className="w-3.5 h-3.5" /> {isCheckedIn ? `Đã Check-in lúc ${checkInTimeStr}` : 'Chưa Check-in'}
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <button 
                          onClick={() => setShowCheckInModal(true)}
                          className="py-3 px-4 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg flex items-center justify-center gap-2"
                        >
                          <Camera className="w-4 h-4" /> CHECK-IN GPS
                        </button>
                        <button 
                          onClick={() => showToast('Đã ghi nhận Check-out kết thúc ca làm việc!')}
                          className="py-3 px-4 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center gap-2"
                        >
                          <LogOut className="w-4 h-4" /> CHECK-OUT
                        </button>
                      </div>
                    </div>

                    {/* Quick Action Grid */}
                    <div className="grid grid-cols-4 gap-2">
                      <button onClick={() => setMobileTab('leave')} className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-center hover:border-slate-700">
                        <FileText className="w-5 h-5 mx-auto text-blue-400 mb-1" />
                        <span className="text-[11px] font-medium text-slate-300">Nghỉ phép</span>
                      </button>
                      <button onClick={() => setMobileTab('tasks')} className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-center hover:border-slate-700">
                        <Camera className="w-5 h-5 mx-auto text-amber-400 mb-1" />
                        <span className="text-[11px] font-medium text-slate-300">Báo cáo ảnh</span>
                      </button>
                      <button onClick={() => setMobileTab('payslip')} className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-center hover:border-slate-700">
                        <ShieldCheck className="w-5 h-5 mx-auto text-emerald-400 mb-1" />
                        <span className="text-[11px] font-medium text-slate-300">Lương cá nhân</span>
                      </button>
                      <button onClick={() => setMobileTab('chat')} className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-center hover:border-slate-700">
                        <MessageSquare className="w-5 h-5 mx-auto text-purple-400 mb-1" />
                        <span className="text-[11px] font-medium text-slate-300">Chat nội bộ</span>
                      </button>
                    </div>

                    {/* Today Tasks */}
                    <div>
                      <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-2">
                        <span>Nhiệm vụ trong ca</span>
                        <button onClick={() => setMobileTab('tasks')} className="text-emerald-400 text-[11px]">Xem tất cả &gt;</button>
                      </div>
                      <div className="space-y-2">
                        {currentCompany.tasks.map(t => (
                          <div key={t.id} className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-bold text-slate-200">{t.title}</span>
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${t.status === 'done' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                                {t.status === 'done' ? '✓ Đã xong' : '⏳ Đang làm'}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400">{t.desc}</p>
                            <div 
                              onClick={() => handleTaskPhotoUpload(t.id)}
                              className="p-3 border border-dashed border-slate-700 rounded-lg text-center cursor-pointer hover:border-emerald-500 transition-colors"
                            >
                              {t.photo ? (
                                <img src={t.photo} alt="Report" className="h-24 w-full object-cover rounded-md" />
                              ) : (
                                <div className="text-[11px] text-slate-400 flex items-center justify-center gap-1">
                                  <Camera className="w-3.5 h-3.5 text-emerald-400" /> Bấm chụp ảnh hoàn thành
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                )}

                {/* TAB 2: LEAVE REQUESTS */}
                {mobileTab === 'leave' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-white">Đơn Xin Nghỉ & Đổi Ca</h3>
                      <button onClick={() => setShowLeaveModal(true)} className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg flex items-center gap-1">
                        <Plus className="w-3.5 h-3.5" /> Tạo đơn mới
                      </button>
                    </div>

                    <div className="space-y-2">
                      {currentCompany.leaves.map(l => (
                        <div key={l.id} className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-slate-200">{l.type}</span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${l.status === 'approved' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                              {l.status === 'approved' ? '✓ Đã duyệt' : '⏳ Chờ duyệt'}
                            </span>
                          </div>
                          <div className="text-[11px] font-semibold text-emerald-400">{l.dateRange}</div>
                          <div className="text-[11px] text-slate-400">{l.reason}</div>
                          <div className="text-[10px] text-slate-500 pt-1">Gửi bởi: {l.employeeName} - {l.submittedAt}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 3: PERSONAL PAYSLIP (STRICT ROLE CONFIDENTIALITY) */}
                {mobileTab === 'payslip' && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950 to-slate-900 border border-emerald-500/30">
                      <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold mb-1">
                        <ShieldCheck className="w-4 h-4" /> Phiếu Lương Cá Nhân Bảo Mật
                      </div>
                      <div className="text-xs text-slate-300">Thông tin lương được mã hóa & bảo mật theo đúng quy định Doanh Nghiệp.</div>
                    </div>

                    <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
                      <div className="border-b border-slate-800 pb-2">
                        <div className="text-xs font-bold text-white">{activeUser.name}</div>
                        <div className="text-[11px] text-slate-400">{activeUser.role} | CMND: {activeUser.cmnd || 'N/A'}</div>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between text-slate-400">
                          <span>Lương chính / Cơ bản:</span>
                          <span className="font-semibold text-slate-200">{(activeUser.baseSalary || 0).toLocaleString('vi-VN')} đ</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>Phụ cấp cơm / Xăng xe:</span>
                          <span className="font-semibold text-slate-200">1.410.000 đ</span>
                        </div>
                        {activeUser.allowances?.seniority && (
                          <div className="flex justify-between text-slate-400">
                            <span>Thâm niên / Thưởng trách nhiệm:</span>
                            <span className="font-semibold text-slate-200">{activeUser.allowances.seniority.toLocaleString('vi-VN')} đ</span>
                          </div>
                        )}
                        <div className="flex justify-between text-slate-400">
                          <span>Thuế TNCN trích nộp:</span>
                          <span className="font-semibold text-amber-400">{(activeUser.personalTax || 0).toLocaleString('vi-VN')} đ</span>
                        </div>
                        
                        <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
                          <span className="font-bold text-slate-200">LƯƠNG THỰC LĨNH:</span>
                          <span className="text-lg font-black text-emerald-400">{(activeUser.netPay || 0).toLocaleString('vi-VN')} đ</span>
                        </div>
                      </div>

                      <div className="p-3 bg-slate-950 rounded-lg text-[10px] text-slate-400 leading-relaxed border border-slate-800/80">
                        🔒 <b>Nguyên tắc bảo mật:</b> Phiếu lương này được bảo mật cá nhân. Chỉ duy nhất bạn ({activeUser.name}) và cấp Quản lý trực tiếp mới có quyền xem thông tin này.
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 4: CHAT */}
                {mobileTab === 'chat' && (
                  <div className="flex flex-col h-full space-y-3">
                    <div className="text-xs font-bold text-emerald-400 pb-2 border-b border-slate-800 flex items-center justify-between">
                      <span>{currentCompany.chatChannel}</span>
                      <span className="text-[10px] text-slate-500">12 online</span>
                    </div>

                    <div className="flex-grow space-y-2 overflow-y-auto pr-1">
                      {currentCompany.chatMessages.map((msg, idx) => (
                        <div key={idx} className={`p-2.5 rounded-xl max-w-[85%] text-xs ${msg.isMe ? 'bg-emerald-600 text-white ml-auto' : 'bg-slate-900 border border-slate-800 text-slate-200'}`}>
                          <div className="text-[10px] opacity-75 font-semibold">{msg.sender}</div>
                          <div>{msg.text}</div>
                          <div className="text-[9px] text-right opacity-60 mt-0.5">{msg.time}</div>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                      <input 
                        type="text" 
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                        placeholder="Nhập tin nhắn nội bộ..."
                        className="flex-grow bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                      />
                      <button onClick={handleSendChat} className="p-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl">
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* TAB 5: ANNOUNCEMENTS */}
                {mobileTab === 'news' && (
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold text-white">Bảng Tin & Nội Quy</h3>
                    <div className="space-y-3">
                      {currentCompany.announcements.map(n => (
                        <div key={n.id} className="p-3 bg-slate-900 border-l-4 border-emerald-500 rounded-r-xl space-y-1">
                          <div className="text-xs font-extrabold text-white">{n.title}</div>
                          <div className="text-[10px] text-emerald-400 font-semibold">{n.date}</div>
                          <p className="text-[11px] text-slate-300 whitespace-pre-line leading-relaxed">{n.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

              {/* Bottom Mobile Navigation Bar */}
              <div className="bg-slate-950 border-t border-slate-900 p-2 grid grid-cols-5 text-center">
                <button onClick={() => setMobileTab('home')} className={`p-2 rounded-xl text-[10px] font-semibold flex flex-col items-center gap-1 ${mobileTab === 'home' ? 'text-emerald-400' : 'text-slate-500'}`}>
                  <Building2 className="w-4 h-4" /> Trang chủ
                </button>
                <button onClick={() => setMobileTab('leave')} className={`p-2 rounded-xl text-[10px] font-semibold flex flex-col items-center gap-1 ${mobileTab === 'leave' ? 'text-emerald-400' : 'text-slate-500'}`}>
                  <FileText className="w-4 h-4" /> Đơn nghỉ
                </button>
                <button onClick={() => setMobileTab('tasks')} className={`p-2 rounded-xl text-[10px] font-semibold flex flex-col items-center gap-1 ${mobileTab === 'tasks' ? 'text-emerald-400' : 'text-slate-500'}`}>
                  <Camera className="w-4 h-4" /> Báo ca
                </button>
                <button onClick={() => setMobileTab('payslip')} className={`p-2 rounded-xl text-[10px] font-semibold flex flex-col items-center gap-1 ${mobileTab === 'payslip' ? 'text-emerald-400' : 'text-slate-500'}`}>
                  <ShieldCheck className="w-4 h-4" /> Lương
                </button>
                <button onClick={() => setMobileTab('chat')} className={`p-2 rounded-xl text-[10px] font-semibold flex flex-col items-center gap-1 ${mobileTab === 'chat' ? 'text-emerald-400' : 'text-slate-500'}`}>
                  <MessageSquare className="w-4 h-4" /> Chat
                </button>
              </div>

            </div>
          </div>
        )}

        {/* MODE 2: DESKTOP ADMIN DASHBOARD VIEW */}
        {viewMode === 'desktop' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            
            {/* Sidebar Navigation */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
                <img src={currentCompany.logo} alt="Logo" className="w-10 h-10 object-contain" />
                <div>
                  <div className="text-sm font-extrabold text-white">{currentCompany.name}</div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Admin Dashboard</span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs font-semibold">
                <button 
                  onClick={() => handleAdminSectionClick('overview')}
                  className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-colors ${adminSection === 'overview' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-900'}`}
                >
                  <Building2 className="w-4 h-4" /> Tổng Quan Công Ca
                </button>
                <button 
                  onClick={() => handleAdminSectionClick('approvals')}
                  className={`w-full text-left px-4 py-3 rounded-xl flex items-center justify-between transition-colors ${adminSection === 'approvals' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-900'}`}
                >
                  <span className="flex items-center gap-3"><FileText className="w-4 h-4" /> Duyệt Đơn Xin Nghỉ</span>
                  <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 text-[10px]">
                    {currentCompany.leaves.filter(l => l.status === 'pending').length}
                  </span>
                </button>
                <button 
                  onClick={() => handleAdminSectionClick('employees')}
                  className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-colors ${adminSection === 'employees' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-900'}`}
                >
                  <UserCheck className="w-4 h-4" /> Danh Sách Nhân Sự
                </button>
                <button 
                  onClick={() => handleAdminSectionClick('payroll')}
                  className={`w-full text-left px-4 py-3 rounded-xl flex items-center justify-between transition-colors ${adminSection === 'payroll' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-900'}`}
                >
                  <span className="flex items-center gap-3"><FileSpreadsheet className="w-4 h-4 text-amber-400" /> Thống Kê Bảng Lương</span>
                  {!isAdminPinUnlocked && !activeUser.isManager && <Lock className="w-3.5 h-3.5 text-slate-500" />}
                </button>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-2">
                <div className="font-bold text-slate-300 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-400" /> Quyền Quản Lý HR
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Bảng lương tổng hợp được đồng bộ từ file gốc <b>{currentCompany.payrollFileSource || 'Excel 2026'}</b>. Chỉ có cấp Quản Lý có mã PIN mới xem được toàn bộ.
                </p>
              </div>
            </div>

            {/* Main Admin Dashboard Content Area */}
            <div className="lg:col-span-3 space-y-6">
              
              {/* Top Overview Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 bg-slate-950 border border-slate-800 rounded-2xl flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Tổng Nhân Sự</div>
                    <div className="text-xl font-black text-white">{currentCompany.employees.length} Nhân viên</div>
                    <div className="text-[10px] text-emerald-400 font-semibold">100% Đang hoạt động</div>
                  </div>
                </div>

                <div className="p-5 bg-slate-950 border border-slate-800 rounded-2xl flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Đã Check-in Hôm Nay</div>
                    <div className="text-xl font-black text-white">{currentCompany.employees.length} / {currentCompany.employees.length}</div>
                    <div className="text-[10px] text-emerald-400 font-semibold">100% Đúng giờ</div>
                  </div>
                </div>

                <div className="p-5 bg-slate-950 border border-slate-800 rounded-2xl flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Đơn Nghỉ Phép Chờ Duyệt</div>
                    <div className="text-xl font-black text-amber-400">{currentCompany.leaves.filter(l => l.status === 'pending').length} Đơn</div>
                    <div className="text-[10px] text-amber-300 font-semibold">Cần xử lý trong ca</div>
                  </div>
                </div>
              </div>

              {/* DYNAMIC SECTION 1: OVERVIEW & APPROVALS */}
              {(adminSection === 'overview' || adminSection === 'approvals') && (
                <div className="space-y-6">
                  <div className="p-6 bg-slate-950 border border-slate-800 rounded-2xl space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        <FileText className="w-5 h-5 text-amber-400" /> Danh Sách Đơn Xin Nghỉ Phép / Đổi Ca
                      </h3>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-900 text-slate-400 uppercase font-semibold border-b border-slate-800">
                          <tr>
                            <th className="p-3">Nhân Viên</th>
                            <th className="p-3">Loại Đơn</th>
                            <th className="p-3">Thời Gian</th>
                            <th className="p-3">Lý Do</th>
                            <th className="p-3">Trạng Thái / Thao Tác</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                          {currentCompany.leaves.map(l => (
                            <tr key={l.id} className="hover:bg-slate-900/50">
                              <td className="p-3 font-bold text-white">{l.employeeName}</td>
                              <td className="p-3 text-slate-300">{l.type}</td>
                              <td className="p-3 text-emerald-400 font-semibold">{l.dateRange}</td>
                              <td className="p-3 text-slate-400">{l.reason}</td>
                              <td className="p-3">
                                {l.status === 'pending' ? (
                                  <button onClick={() => handleApproveLeave(l.id)} className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-md">
                                    ✓ Duyệt ngay
                                  </button>
                                ) : (
                                  <span className="text-emerald-400 font-bold">✓ Đã duyệt</span>
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

              {/* DYNAMIC SECTION 2: EMPLOYEES LIST */}
              {adminSection === 'employees' && (
                <div className="p-6 bg-slate-950 border border-slate-800 rounded-2xl space-y-4">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-emerald-400" /> Danh Sách Nhân Sự Doanh Nghiệp ({currentCompany.employees.length} Nhân Viên)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentCompany.employees.map(emp => (
                      <div key={emp.id} className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between">
                        <div>
                          <div className="text-sm font-bold text-white flex items-center gap-2">
                            {emp.name} {emp.isManager && <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300">Quản Lý</span>}
                          </div>
                          <div className="text-xs text-emerald-400 font-medium">{emp.role}</div>
                          <div className="text-[11px] text-slate-400 mt-1">SĐT: {emp.phone} {emp.cmnd ? `| CMND: ${emp.cmnd}` : ''}</div>
                        </div>
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Đang hoạt động</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* DYNAMIC SECTION 3: PAYROLL MANAGEMENT (PROTECTED BY ROLE & PIN) */}
              {adminSection === 'payroll' && (
                <div className="space-y-6">
                  
                  {/* Total Payroll Banner */}
                  <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-emerald-500/40 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 mb-1">
                        <FileSpreadsheet className="w-4 h-4" /> Bảng Lương Chính Thức - {currentCompany.name}
                      </div>
                      <div className="text-xs text-slate-300">
                        Nguồn dữ liệu: <b>{currentCompany.payrollFileSource || 'LUONG COSOTA - BANG MOI - 2026.xlsx'}</b>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-400">Tổng Quỹ Lương Thực Lĩnh Ca Lương</div>
                      <div className="text-2xl font-black text-emerald-400">{totalPayrollFund.toLocaleString('vi-VN')} VNĐ</div>
                    </div>
                  </div>

                  {/* Payroll Table */}
                  <div className="p-6 bg-slate-950 border border-slate-800 rounded-2xl space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-white">Chi Tiết Bảng Lương Nhân Sự ({currentCompany.employees.length} Nhân Viên)</h3>
                      <button onClick={() => showToast('Đã xuất Báo cáo Lương Excel chuẩn mực!')} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center gap-2">
                        <Download className="w-4 h-4" /> Xuất Excel Lương
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-900 text-slate-400 uppercase font-semibold border-b border-slate-800">
                          <tr>
                            <th className="p-3">STT</th>
                            <th className="p-3">Họ và Tên / CMND</th>
                            <th className="p-3">Chức Vụ</th>
                            <th className="p-3">Lương Chính</th>
                            <th className="p-3">Thuế TNCN</th>
                            <th className="p-3">Thực Lĩnh</th>
                            <th className="p-3">Thao Tác</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                          {currentCompany.employees.map((emp, idx) => (
                            <tr key={emp.id} className="hover:bg-slate-900/50">
                              <td className="p-3 text-slate-400">{emp.stt || idx + 1}</td>
                              <td className="p-3">
                                <div className="font-bold text-white">{emp.name}</div>
                                <div className="text-[10px] text-slate-500">{emp.cmnd ? `CMND: ${emp.cmnd}` : ''}</div>
                              </td>
                              <td className="p-3"><span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300">{emp.role}</span></td>
                              <td className="p-3 font-semibold text-slate-200">{(emp.baseSalary || 0).toLocaleString('vi-VN')} đ</td>
                              <td className="p-3 text-amber-400 font-semibold">{(emp.personalTax || 0).toLocaleString('vi-VN')} đ</td>
                              <td className="p-3 text-emerald-400 font-black text-sm">{(emp.netPay || 0).toLocaleString('vi-VN')} đ</td>
                              <td className="p-3">
                                <button 
                                  onClick={() => alert(`🧾 PHIẾU LƯƠNG - ${emp.name}\nLương chính: ${(emp.baseSalary || 0).toLocaleString('vi-VN')} đ\nThuế TNCN: ${(emp.personalTax || 0).toLocaleString('vi-VN')} đ\nTHỰC LĨNH: ${(emp.netPay || 0).toLocaleString('vi-VN')} đ`)} 
                                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold rounded-lg flex items-center gap-1"
                                >
                                  <Eye className="w-3.5 h-3.5" /> Xem phiếu
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>

      {/* MODAL 1: CHECK-IN SELFIE CAMERA SIMULATOR */}
      {showCheckInModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-sm w-full space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Camera className="w-4 h-4 text-emerald-400" /> Xác thực Check-in GPS & Selfie
              </h3>
              <button onClick={() => setShowCheckInModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-500/50 aspect-square">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80" alt="Selfie" className="w-full h-full object-cover" />
              <div className="absolute inset-0 border-2 border-emerald-400/40 rounded-full m-8"></div>
              <div className="absolute bottom-2 left-2 right-2 bg-black/70 backdrop-blur p-2 rounded-xl text-[10px] text-slate-200 space-y-0.5">
                <div>🕒 {new Date().toLocaleDateString('vi-VN')} {new Date().toLocaleTimeString('vi-VN')}</div>
                <div>📍 GPS: {currentCompany.gpsCoords}</div>
                <div className="text-emerald-400 font-bold">📶 Wifi: {currentCompany.wifiSsid} (Hợp lệ)</div>
              </div>
            </div>

            <button 
              onClick={handleCheckInConfirm}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg flex items-center justify-center gap-2"
            >
              <Camera className="w-4 h-4" /> CHỤP ẢNH & XÁC NHẬN CHECK-IN
            </button>
          </div>
        </div>
      )}

      {/* MODAL 2: LEAVE REQUEST FORM */}
      {showLeaveModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">Tạo Đơn Xin Nghỉ / Đổi Ca</h3>
              <button onClick={() => setShowLeaveModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleLeaveSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-medium mb-1">Loại đơn:</label>
                <select 
                  value={leaveForm.type}
                  onChange={(e) => setLeaveForm({ ...leaveForm, type: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                >
                  <option value="Nghỉ phép năm">Nghỉ phép năm (Có lương)</option>
                  <option value="Xin đi muộn / Về sớm">Xin đi muộn / Về sớm</option>
                  <option value="Nghỉ ốm / Việc riêng">Nghỉ ốm / Việc riêng</option>
                  <option value="Xin đổi ca">Xin đổi ca làm việc</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Từ ngày:</label>
                  <input 
                    type="date" 
                    value={leaveForm.startDate}
                    onChange={(e) => setLeaveForm({ ...leaveForm, startDate: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Đến ngày:</label>
                  <input 
                    type="date" 
                    value={leaveForm.endDate}
                    onChange={(e) => setLeaveForm({ ...leaveForm, endDate: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Lý do nghỉ phép:</label>
                <textarea 
                  rows={3}
                  value={leaveForm.reason}
                  onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })}
                  placeholder="Nhập chi tiết lý do..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  required
                />
              </div>

              <button type="submit" className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl">
                GỬI ĐƠN CHO QUẢN LÝ DUYỆT
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: SECURITY ADMIN PIN PROMPT */}
      {showPinModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-amber-500/40 rounded-3xl p-6 max-w-xs w-full space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Xác Thực Quản Lý Lương</h3>
              <p className="text-[11px] text-slate-400 mt-1">Thông tin lương được bảo mật. Nhập mã PIN Quản lý để xem Bảng lương tổng hợp.</p>
            </div>

            <form onSubmit={verifyAdminPin} className="space-y-3">
              <input 
                type="password"
                maxLength={6}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Nhập mã PIN (Thử: 2026)"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-center text-sm font-bold text-white focus:border-amber-500"
                autoFocus
              />
              {pinError && <div className="text-[10px] text-red-400 font-semibold">{pinError}</div>}
              
              <div className="flex gap-2">
                <button type="button" onClick={() => setShowPinModal(false)} className="w-1/2 py-2 bg-slate-800 text-slate-300 text-xs font-bold rounded-xl">
                  Hủy bỏ
                </button>
                <button type="submit" className="w-1/2 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-xl">
                  Mở khóa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
