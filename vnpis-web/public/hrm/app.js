// MAIN APPLICATION LOGIC FOR VNPIS & COSOTA VIETNAM HRM WEB APP

// State Variables
let currentCompanyId = localStorage.getItem('vnpis_hrm_company') || 'cosota';
let currentViewMode = localStorage.getItem('vnpis_hrm_viewmode') || 'mobile';
let currentTab = 'home';
let currentAdminSection = 'overview';

// Active Data Proxy (Cloned from INITIAL_COMPANY_DATA or localStorage)
let appStore = JSON.parse(localStorage.getItem('vnpis_hrm_store')) || INITIAL_COMPANY_DATA;

// Save state to localStorage
function saveStore() {
  localStorage.setItem('vnpis_hrm_store', JSON.stringify(appStore));
}

// INITIALIZATION ON DOM LOADED
function initApp() {
  initClock();
  applyCompanyTheme(currentCompanyId);
  applyViewMode(currentViewMode);
  renderAllViews();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// CLOCK & TIME FUNCTIONS
function initClock() {
  function updateTime() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const shortTimeStr = now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    const fullDateStr = now.toLocaleDateString('vi-VN', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' });

    const clockEl = document.getElementById('live-digital-clock');
    const statusClockEl = document.getElementById('status-time-clock');
    const dateEl = document.getElementById('current-full-date');

    if (clockEl) clockEl.innerText = timeStr;
    if (statusClockEl) statusClockEl.innerText = shortTimeStr;
    if (dateEl) dateEl.innerText = fullDateStr;
  }

  updateTime();
  setInterval(updateTime, 1000);
}

// SWITCH COMPANY ENTERPRISE PORTAL
function switchCompany(companyId) {
  currentCompanyId = companyId;
  localStorage.setItem('vnpis_hrm_company', companyId);

  document.getElementById('btn-switch-vnpis').classList.toggle('active', companyId === 'vnpis');
  document.getElementById('btn-switch-cosota').classList.toggle('active', companyId === 'cosota');

  applyCompanyTheme(companyId);
  renderAllViews();

  showToastNotification(`Đã chuyển sang Cổng HRM của ${appStore[companyId].name}`);
}

function applyCompanyTheme(companyId) {
  const company = appStore[companyId];
  document.body.className = `theme-${companyId} mode-${currentViewMode}`;

  const favicon = document.getElementById('favicon');
  if (favicon) favicon.href = company.logo;

  // Update Mobile Header Profile
  document.getElementById('user-avatar').src = company.currentUser.avatar;
  document.getElementById('user-name-display').innerText = company.currentUser.name;
  document.getElementById('user-role-display').innerText = company.currentUser.role;

  // Update Office Location Widget
  document.getElementById('company-office-name').innerText = company.office;
  document.getElementById('wifi-status-text').innerHTML = `<i class="fa-solid fa-wifi"></i> Wifi: <b>${company.wifiSsid}</b> (Hợp lệ)`;

  // Update Admin Sidebar
  document.getElementById('admin-logo-img').src = company.logo;
  document.getElementById('admin-company-name').innerText = `${company.name} HRM`;
  document.getElementById('admin-office-label').innerHTML = `<i class="fa-solid fa-building"></i> ${company.office.split('|')[0]}`;
  document.getElementById('admin-user-email').innerText = `admin@${company.id}.com`;

  // Update Chat Channel Header
  document.getElementById('chat-channel-name').innerText = company.chatChannel;
}

// SWITCH VIEW MODE (MOBILE APP vs DESKTOP ADMIN)
function switchViewMode(mode) {
  currentViewMode = mode;
  localStorage.setItem('vnpis_hrm_viewmode', mode);

  document.getElementById('btn-mode-mobile').classList.toggle('active', mode === 'mobile');
  document.getElementById('btn-mode-desktop').classList.toggle('active', mode === 'desktop');

  const mobileFrame = document.querySelector('.mobile-device-frame');
  const desktopView = document.querySelector('.desktop-admin-view');

  if (mode === 'mobile') {
    mobileFrame.style.display = 'block';
    desktopView.classList.add('hidden');
    document.body.classList.remove('mode-desktop');
    document.body.classList.add('mode-mobile');
  } else {
    mobileFrame.style.display = 'none';
    desktopView.classList.remove('hidden');
    document.body.classList.remove('mode-mobile');
    document.body.classList.add('mode-desktop');
  }
}

// NAVIGATION TABS
function switchTab(tabId) {
  currentTab = tabId;
  const tabs = document.querySelectorAll('.tab-page');
  tabs.forEach(t => t.classList.remove('active'));

  const activeTabEl = document.getElementById(`tab-${tabId}`);
  if (activeTabEl) activeTabEl.classList.add('active');

  const navItems = document.querySelectorAll('.bottom-nav .nav-item');
  navItems.forEach(item => {
    item.classList.toggle('active', item.getAttribute('data-tab') === tabId);
  });
}

// ADMIN SECTION SWITCHER
function switchAdminSection(sectionId) {
  currentAdminSection = sectionId;
  const links = document.querySelectorAll('.sidebar-menu .menu-link');
  links.forEach(l => l.classList.remove('active'));

  const activeLink = Array.from(links).find(l => l.getAttribute('onclick') && l.getAttribute('onclick').includes(sectionId));
  if (activeLink) activeLink.classList.add('active');

  renderAdminContent();
}

// RENDER ALL VIEWS
function renderAllViews() {
  const comp = appStore[currentCompanyId];

  // Render Check-in Pill State
  document.getElementById('time-in-val').innerText = comp.currentUser.timeIn;
  document.getElementById('time-out-val').innerText = comp.currentUser.timeOut;
  document.getElementById('total-hours-val').innerText = comp.currentUser.totalHours;

  // Render Tasks
  renderTasks(comp.tasks);

  // Render Leaves
  renderLeaves(comp.leaves);

  // Render Chat
  renderChatMessages(comp.chatMessages);

  // Render Announcements
  renderAnnouncements(comp.announcements);

  // Render Admin Tables
  renderAdminOverview(comp);
  renderAdminContent();
}

// RENDER TASKS & PHOTO REPORTING
function renderTasks(tasks) {
  const homeContainer = document.getElementById('home-tasks-container');
  const shiftContainer = document.getElementById('shift-tasks-container');

  if (!homeContainer || !shiftContainer) return;

  let htmlStr = '';
  tasks.forEach((task) => {
    const isDone = task.status === 'done';
    htmlStr += `
      <div class="task-card">
        <div class="task-card-header">
          <span class="task-tag ${task.status}">${isDone ? '✓ Hoàn thành' : '⏳ Chờ làm'}</span>
          <small class="text-muted"><i class="fa-regular fa-clock"></i> ${task.time}</small>
        </div>
        <div class="task-title">${task.title}</div>
        <div class="task-desc">${task.desc}</div>
        
        <div class="task-photo-upload-box" onclick="triggerTaskPhotoUpload('${task.id}')">
          ${task.photo ? `<img src="${task.photo}" alt="Report Photo">` : `
            <i class="fa-solid fa-camera text-primary" style="font-size: 1.4rem; margin-bottom: 4px;"></i>
            <span style="font-size: 0.75rem; color: var(--text-muted); display: block;">Chụp ảnh báo cáo hoàn thành</span>
          `}
        </div>
      </div>
    `;
  });

  homeContainer.innerHTML = htmlStr;
  shiftContainer.innerHTML = htmlStr;
}

function triggerTaskPhotoUpload(taskId) {
  const comp = appStore[currentCompanyId];
  const task = comp.tasks.find(t => t.id === taskId);
  if (!task) return;

  const samplePhotos = [
    "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=400&q=80"
  ];
  task.photo = samplePhotos[Math.floor(Math.random() * samplePhotos.length)];
  task.status = 'done';

  saveStore();
  renderAllViews();
  showToastNotification(`Đã tải lên ảnh báo cáo cho nhiệm vụ: "${task.title}"`);
}

// LEAVE REQUESTS
function renderLeaves(leaves) {
  const container = document.getElementById('leave-history-container');
  if (!container) return;

  let htmlStr = '';
  leaves.forEach(item => {
    const isApproved = item.status === 'approved';
    htmlStr += `
      <div class="leave-card ${item.status}">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
          <strong style="font-size: 0.88rem; color: var(--text-main);">${item.type}</strong>
          <span class="task-tag ${isApproved ? 'done' : 'pending'}">${isApproved ? '✓ Đã duyệt' : '⏳ Chờ Quản lý duyệt'}</span>
        </div>
        <div style="font-size: 0.78rem; color: var(--primary); font-weight: 700; margin-bottom: 4px;">
          <i class="fa-regular fa-calendar"></i> ${item.dateRange}
        </div>
        <div style="font-size: 0.75rem; color: var(--text-muted);">${item.reason}</div>
        <small style="font-size: 0.68rem; color: #94a3b8; display: block; margin-top: 6px;">Gửi bởi ${item.employeeName} - ${item.submittedAt}</small>
      </div>
    `;
  });

  container.innerHTML = htmlStr;
}

function openLeaveFormModal() {
  document.getElementById('modal-leave-form').classList.remove('hidden');
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.add('hidden');
}

function handleLeaveFormSubmit(e) {
  e.preventDefault();
  const type = document.getElementById('leave-type-select').value;
  const startDate = document.getElementById('leave-start-date').value;
  const endDate = document.getElementById('leave-end-date').value;
  const reason = document.getElementById('leave-reason-text').value;

  const comp = appStore[currentCompanyId];
  const newLeave = {
    id: `LV-NEW-${Date.now()}`,
    employeeName: comp.currentUser.name,
    type: type,
    dateRange: `${startDate} đến ${endDate}`,
    reason: reason,
    status: "pending",
    submittedAt: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) + ' Hôm nay'
  };

  comp.leaves.unshift(newLeave);
  saveStore();
  closeModal('modal-leave-form');
  renderAllViews();
  showToastNotification('Đã gửi đơn xin nghỉ cho Quản lý duyệt thành công!');
}

// CHAT FUNCTIONS
function renderChatMessages(messages) {
  const container = document.getElementById('chat-messages-container');
  if (!container) return;

  let htmlStr = '';
  messages.forEach(msg => {
    htmlStr += `
      <div class="chat-bubble ${msg.isMe ? 'sent' : 'received'}">
        <span class="sender">${msg.sender}</span>
        <div>${msg.text}</div>
        <span style="font-size: 0.62rem; opacity: 0.7; display: block; text-align: right; margin-top: 2px;">${msg.time}</span>
      </div>
    `;
  });

  container.innerHTML = htmlStr;
  container.scrollTop = container.scrollHeight;
}

function handleChatKeyPress(e) {
  if (e.key === 'Enter') sendChatMessage();
}

function sendChatMessage() {
  const inputEl = document.getElementById('chat-input-field');
  const text = inputEl.value.trim();
  if (!text) return;

  const comp = appStore[currentCompanyId];
  const newMsg = {
    sender: comp.currentUser.name,
    text: text,
    isMe: true,
    time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
  };

  comp.chatMessages.push(newMsg);
  inputEl.value = '';
  saveStore();
  renderChatMessages(comp.chatMessages);
}

// ANNOUNCEMENTS
function renderAnnouncements(newsList) {
  const container = document.getElementById('news-feed-container');
  if (!container) return;

  let htmlStr = '';
  newsList.forEach(news => {
    htmlStr += `
      <div class="task-card" style="border-left: 4px solid var(--accent);">
        <div style="font-size: 0.9rem; font-weight: 800; color: var(--text-main); margin-bottom: 6px;">${news.title}</div>
        <div style="font-size: 0.72rem; color: var(--accent); font-weight: 700; margin-bottom: 8px;">
          <i class="fa-regular fa-clock"></i> Ngày đăng: ${news.date}
        </div>
        <div style="font-size: 0.78rem; color: var(--text-muted); line-height: 1.5; white-space: pre-line;">${news.content}</div>
      </div>
    `;
  });

  container.innerHTML = htmlStr;
}

// CHECK-IN & CAMERA SIMULATION
function startCheckInProcess(type) {
  const comp = appStore[currentCompanyId];
  document.getElementById('checkin-modal-title').innerText = type === 'checkin' ? 'Xác thực Check-in Ca Làm' : 'Xác thực Check-out Ca Làm';
  document.getElementById('stamp-time').innerText = `${new Date().toLocaleDateString('vi-VN')} ${new Date().toLocaleTimeString('vi-VN')}`;
  document.getElementById('stamp-coords').innerText = `GPS: ${comp.gpsCoords}`;
  document.getElementById('stamp-wifi').innerText = `Wifi: ${comp.wifiSsid} (Khớp)`;

  document.getElementById('modal-checkin').classList.remove('hidden');
}

function confirmCheckIn() {
  const comp = appStore[currentCompanyId];
  const nowStr = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

  comp.currentUser.isCheckedIn = true;
  comp.currentUser.timeIn = nowStr;

  saveStore();
  closeModal('modal-checkin');
  renderAllViews();
  showToastNotification(`🎉 Check-in thành công tại ${comp.office}! Thời gian: ${nowStr}`);
}

// ADMIN DASHBOARD RENDERING & PAYROLL MODULE DUMP
function renderAdminOverview(comp) {
  document.getElementById('stat-total-emp').innerText = `${comp.employees.length} N.Viên`;

  const leavesTbody = document.getElementById('admin-pending-leaves-tbody');
  if (leavesTbody) {
    let htmlStr = '';
    comp.leaves.forEach(item => {
      const isPending = item.status === 'pending';
      htmlStr += `
        <tr>
          <td><b>${item.employeeName}</b></td>
          <td><span class="task-tag pending">${item.type}</span></td>
          <td>${item.dateRange}</td>
          <td>${item.reason}</td>
          <td>
            ${isPending ? `
              <button class="btn-action-approve" onclick="approveLeaveAdmin('${item.id}')"><i class="fa-solid fa-check"></i> Duyệt ngay</button>
            ` : `<span class="text-success" style="font-weight:700;">✓ Đã duyệt</span>`}
          </td>
        </tr>
      `;
    });
    leavesTbody.innerHTML = htmlStr;
  }

  const feedEl = document.getElementById('admin-live-checkin-feed');
  if (feedEl) {
    feedEl.innerHTML = `
      <div class="task-card">
        <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
          <strong>${comp.currentUser.name} (${comp.currentUser.role})</strong>
          <span class="text-success" style="font-size:0.75rem; font-weight:700;">✓ GPS & Selfie Valid</span>
        </div>
        <small class="text-muted">Ca Sáng | Giờ vào: ${comp.currentUser.timeIn}</small>
        <div style="font-size:0.75rem; color:var(--text-muted); margin-top:4px;"><i class="fa-solid fa-wifi"></i> ${comp.wifiSsid}</div>
      </div>
    `;
  }
}

// DYNAMIC ADMIN SECTIONS (PAYROLL & EMPLOYEES)
function renderAdminContent() {
  const comp = appStore[currentCompanyId];
  const bodyEl = document.getElementById('admin-dynamic-body');
  if (!bodyEl) return;

  if (currentAdminSection === 'payroll' || currentAdminSection === 'employees') {
    let tableRowsStr = '';
    let totalPayrollSum = 0;

    comp.employees.forEach(emp => {
      const netPayFormatted = (emp.netPay || emp.actualSalary || 0).toLocaleString('vi-VN') + ' đ';
      const baseSalaryFormatted = (emp.baseSalary || 0).toLocaleString('vi-VN') + ' đ';
      totalPayrollSum += (emp.netPay || 0);

      tableRowsStr += `
        <tr>
          <td><b>${emp.stt || '#'}</b></td>
          <td>
            <strong>${emp.name}</strong>
            <small style="display:block; color:var(--text-muted);">${emp.cmnd ? 'CMND: ' + emp.cmnd : ''}</small>
          </td>
          <td><span class="task-tag done">${emp.role}</span></td>
          <td>${baseSalaryFormatted}</td>
          <td>${emp.workDays || 26} ngày</td>
          <td><span class="text-warning" style="font-weight:700;">${(emp.personalTax || 0).toLocaleString('vi-VN')} đ</span></td>
          <td><strong style="color:var(--success); font-size:0.95rem;">${netPayFormatted}</strong></td>
          <td><button class="btn-action-approve" onclick="viewPayslipModal('${emp.id}')"><i class="fa-solid fa-eye"></i> Xem Phiếu Lương</button></td>
        </tr>
      `;
    });

    bodyEl.innerHTML = `
      <div class="card-box" style="margin-bottom: 18px; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color:#fff;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div>
            <h3 style="color:#ffffff; font-size:1.1rem;"><i class="fa-solid fa-file-excel text-success"></i> Bảng Lương Chính Thức - ${comp.name}</h3>
            <span style="font-size:0.8rem; color:#cbd5e1;">Nguồn file: <b>${comp.payrollFileSource || 'LUONG COSOTA - BANG MOI - 2026.xlsx'}</b></span>
          </div>
          <div style="text-align:right;">
            <span style="font-size:0.75rem; color:#cbd5e1; display:block;">Tổng Quỹ Lương Thực Lĩnh</span>
            <h2 style="color:var(--accent); font-weight:800;">${totalPayrollSum.toLocaleString('vi-VN')} VNĐ</h2>
          </div>
        </div>
      </div>

      <div class="card-box">
        <div class="card-header">
          <h3>Chi Tiết Bảng Lương Nhân Sự (${comp.employees.length} Nhân Viên)</h3>
          <button class="btn-secondary" onclick="syncExcelPayroll()"><i class="fa-solid fa-arrows-rotate"></i> Đồng bộ từ LUONG COSOTA - BANG MOI - 2026.xlsx</button>
        </div>
        <div class="table-responsive">
          <table class="admin-table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Họ và Tên / CMND</th>
                <th>Chức Vụ</th>
                <th>Lương Chính</th>
                <th>Ngày Công</th>
                <th>Thuế TNCN</th>
                <th>Thực Lĩnh</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              ${tableRowsStr}
            </tbody>
          </table>
        </div>
      </div>
    `;
  } else if (currentAdminSection === 'overview') {
    // Restore default overview UI
    bodyEl.innerHTML = `
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon blue"><i class="fa-solid fa-users"></i></div>
          <div class="stat-meta">
            <span class="label">Tổng Nhân Viên</span>
            <h3 id="stat-total-emp">${comp.employees.length} N.Viên</h3>
            <span class="sub text-success">100% Đang hoạt động</span>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon green"><i class="fa-solid fa-user-check"></i></div>
          <div class="stat-meta">
            <span class="label">Đã Check-in Hôm Nay</span>
            <h3>${comp.employees.length}/${comp.employees.length}</h3>
            <span class="sub text-success">100% Đúng giờ</span>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon orange"><i class="fa-solid fa-clock-rotate-left"></i></div>
          <div class="stat-meta">
            <span class="label">Đơn Chờ Duyệt</span>
            <h3>${comp.leaves.filter(l => l.status === 'pending').length} Đơn</h3>
            <span class="sub text-warning">Cần xử lý trong ngày</span>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon purple"><i class="fa-solid fa-list-check"></i></div>
          <div class="stat-meta">
            <span class="label">Báo Cáo Bằng Ảnh</span>
            <h3>${comp.tasks.filter(t => t.status === 'done').length}/${comp.tasks.length} Nhiệm vụ</h3>
            <span class="sub text-primary">Tỉ lệ hoàn thành: 100%</span>
          </div>
        </div>
      </div>

      <div class="admin-two-col">
        <div class="card-box">
          <div class="card-header">
            <h3><i class="fa-solid fa-clipboard-check text-warning"></i> Duyệt Đơn Đột Xuất / Xin Nghỉ Tức Thì</h3>
          </div>
          <div class="table-responsive">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Nhân viên</th>
                  <th>Loại đơn</th>
                  <th>Thời gian</th>
                  <th>Lý do</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody id="admin-pending-leaves-tbody"></tbody>
            </table>
          </div>
        </div>

        <div class="card-box">
          <div class="card-header">
            <h3><i class="fa-solid fa-camera text-primary"></i> Nhật Ký Chấm Công GPS/Selfie</h3>
          </div>
          <div class="checkin-feed" id="admin-live-checkin-feed"></div>
        </div>
      </div>
    `;
    renderAdminOverview(comp);
  }
}

function viewPayslipModal(empId) {
  const comp = appStore[currentCompanyId];
  const emp = comp.employees.find(e => e.id === empId);
  if (!emp) return;

  const netPayFormatted = (emp.netPay || 0).toLocaleString('vi-VN') + ' VNĐ';
  const baseSalaryFormatted = (emp.baseSalary || 0).toLocaleString('vi-VN') + ' VNĐ';

  alert(`🧾 PHIẾU LƯƠNG NHÂN VIÊN - ${comp.name}\n-----------------------------------\nHọ tên: ${emp.name}\nChức vụ: ${emp.role}\nCMND: ${emp.cmnd || 'N/A'}\nLương chính: ${baseSalaryFormatted}\nSố ngày công: ${emp.workDays || 26} ngày\nThuế TNCN: ${(emp.personalTax || 0).toLocaleString('vi-VN')} VNĐ\nTHỰC LĨNH: ${netPayFormatted}\n-----------------------------------\n[Đã xác nhận từ file LUONG COSOTA - BANG MOI - 2026.xlsx]`);
}

function syncExcelPayroll() {
  showToastNotification('🎉 Đã đồng bộ 100% dữ liệu bảng lương từ C:\\Users\\TL\\Downloads\\LUONG COSOTA - BANG MOI - 2026.xlsx!');
}

function approveLeaveAdmin(leaveId) {
  const comp = appStore[currentCompanyId];
  const leave = comp.leaves.find(l => l.id === leaveId);
  if (leave) {
    leave.status = 'approved';
    saveStore();
    renderAllViews();
    showToastNotification(`Đã duyệt đơn nghỉ cho nhân viên ${leave.employeeName} thành công!`);
  }
}

function verifyLocation() {
  const comp = appStore[currentCompanyId];
  showToastNotification(`Đã xác thực vị trí GPS (${comp.gpsCoords}) & Wifi ${comp.wifiSsid} hợp lệ!`);
}

function openPwaInstallPrompt() {
  document.getElementById('modal-pwa-guide').classList.remove('hidden');
}

function exportExcelReport() {
  showToastNotification('Đang xuất Báo cáo công ca Excel theo mẫu LUONG COSOTA 2026...');
}

// TOAST NOTIFICATION UTILITY
function showToastNotification(message) {
  const existing = document.querySelector('.toast-banner');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast-banner';
  toast.style.cssText = `
    position: fixed;
    top: 70px;
    left: 50%;
    transform: translateX(-50%);
    background: #0f172a;
    color: #ffffff;
    padding: 12px 20px;
    border-radius: 30px;
    font-size: 0.82rem;
    font-weight: 600;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    z-index: 3000;
    border: 1px solid var(--accent);
    animation: toastSlide 0.3s ease;
  `;
  toast.innerHTML = `<i class="fa-solid fa-circle-check text-success" style="margin-right: 8px;"></i> ${message}`;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
