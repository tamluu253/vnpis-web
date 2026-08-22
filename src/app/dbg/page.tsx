export const dynamicParams = true;
export const dynamic = 'force-dynamic';
import React from 'react';
import Link from 'next/link';
import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { getTopKeywords } from './gsc';

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GA_CLIENT_EMAIL,
    private_key: process.env.GA_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
});

const propertyId = process.env.GA_PROPERTY_ID;

type PeriodType = 'day' | 'week' | 'month' | 'quarter' | 'year';

const dateRanges = {
  day: { startDate: '1daysAgo', endDate: 'today' },
  week: { startDate: '7daysAgo', endDate: 'today' },
  month: { startDate: '30daysAgo', endDate: 'today' },
  quarter: { startDate: '90daysAgo', endDate: 'today' },
  year: { startDate: '365daysAgo', endDate: 'today' },
};

async function getAnalyticsData(period: PeriodType) {
  if (!propertyId || !process.env.GA_CLIENT_EMAIL || !process.env.GA_PRIVATE_KEY) {
    return {
      visits: 'Lỗi API', organic: 'Thiếu cấu hình', leads: '-', ctr: '-',
      pages: [],
    };
  }

  const range = dateRanges[period] || dateRanges.week;

  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [range],
      metrics: [
        { name: 'sessions' },
        { name: 'newUsers' }, 
        { name: 'eventCount' }, 
      ],
    });

    const rows = response.rows;
    let visits = '0', organic = '0', leads = '0', ctr = '0.0%';
    
    if (rows && rows.length > 0) {
      const metricValues = rows[0].metricValues;
      if (metricValues) {
        const totalVisits = parseInt(metricValues[0].value || '0');
        const newUsers = parseInt(metricValues[1].value || '0');
        const events = parseInt(metricValues[2].value || '0');

        visits = totalVisits.toLocaleString();
        organic = newUsers.toLocaleString(); 
        leads = events.toLocaleString(); 
        ctr = totalVisits > 0 ? ((events / totalVisits) * 100).toFixed(1) + '%' : '0.0%';
      }
    }

    const [kwResponse] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [range],
      dimensions: [{ name: 'pageTitle' }],
      metrics: [{ name: 'sessions' }, { name: 'engagedSessions' }],
      orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
      limit: 10,
    });

    const pages = (kwResponse.rows || []).map((r, i) => {
      const dims = r.dimensionValues;
      const mets = r.metricValues;
      const sessionCount = parseInt(mets?.[0]?.value || '0');
      const engaged = parseInt(mets?.[1]?.value || '0');
      
      return {
        rank: i + 1,
        title: dims?.[0]?.value || 'Không xác định',
        sessions: sessionCount.toLocaleString(),
        ctr: sessionCount > 0 ? ((engaged / sessionCount) * 100).toFixed(1) + '%' : '0.0%',
        position: `Top ${i + 1}`
      };
    });

    return { visits, organic, leads, ctr, pages };

  } catch (e) {
    console.error('Lỗi khi gọi Google Analytics API:', e);
    return {
      visits: 'Lỗi', organic: 'API', leads: '-', ctr: '-',
      pages: [],
    };
  }
}

import { headers } from 'next/headers';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function AnalyticsDashboard(props: {
  searchParams: SearchParams;
}) {
  const headerList = await headers();
  const host = headerList.get('host') || '';
  const isInanvnpis = host.includes('inanvnpis');
  const dashboardTitle = isInanvnpis ? 'INANVNPIS.COM — ANALYTICS DASHBOARD' : 'VNPIS.COM — ANALYTICS DASHBOARD';

  const searchParams = await props.searchParams;
  const periodStr = typeof searchParams?.period === 'string' ? searchParams.period : 'week';
  const period = ['day', 'week', 'month', 'quarter', 'year'].includes(periodStr) 
      ? (periodStr as PeriodType) 
      : 'week';
  
  const currentStats = await getAnalyticsData(period);
  const pages = currentStats.pages;
  
  const periodDaysMap: Record<PeriodType, number> = {
    day: 1,
    week: 7,
    month: 30,
    quarter: 90,
    year: 365,
  };
  const periodDays = periodDaysMap[period] || 7;
  const { error: gscError, rows: gscKeywords } = await getTopKeywords(periodDays);

  // Compute GSC Summary Metrics
  const totalGscClicks = gscKeywords.reduce((acc: number, item: any) => acc + item.clicks, 0);
  const totalGscImpressions = gscKeywords.reduce((acc: number, item: any) => acc + item.impressions, 0);

  const getButtonStyle = (p: string) => ({
    backgroundColor: period === p ? '#f59e0b' : 'transparent',
    color: period === p ? '#0f172a' : '#94a3b8',
    padding: '8px 16px',
    borderRadius: '6px',
    fontWeight: 'bold',
    textDecoration: 'none',
    fontSize: '13px',
    textTransform: 'uppercase' as const,
    display: 'inline-block'
  });

  const getSmartInsight = (clicks: number, impressions: number, posStr: string) => {
    const pos = parseFloat(posStr) || 99;
    if (pos <= 3 && clicks > 0) return { label: '🔥 Đang Giữ Top 1-3', bg: '#15803d', color: '#ffffff' };
    if (impressions > 0 && clicks === 0) return { label: '💡 Cần Đổi Meta Title', bg: '#b45309', color: '#ffffff' };
    if (pos > 3 && pos <= 10) return { label: '🚀 Đang Cận Top 1-3', bg: '#1d4ed8', color: '#ffffff' };
    return { label: '📈 Đang Tăng Hạng', bg: '#475569', color: '#ffffff' };
  };

  return (
    <html lang="vi">
      <head>
        <title>{dashboardTitle}</title>
        <meta name="robots" content="noindex, nofollow, noarchive" />
      </head>
      <body style={{ backgroundColor: '#0b132b', color: '#f8fafc', fontFamily: 'sans-serif', margin: 0, padding: 0 }}>
        <div style={{ padding: '24px', maxWidth: '1280px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid #1e293b', paddingBottom: '16px' }}>
            <div>
              <span style={{ backgroundColor: '#22c55e', color: '#ffffff', fontSize: '11px', fontWeight: 'bold', padding: '4px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>Dữ liệu thực từ Google Analytics 4 & GSC</span>
              <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#f59e0b', margin: '8px 0 0 0' }}>{dashboardTitle}</h1>
              <p style={{ fontSize: '13px', color: '#94a3b8', margin: '4px 0 0 0' }}>Báo cáo hiệu suất lượt truy cập & nội dung trang web</p>
            </div>
            
            {/* Filter controls */}
            <div style={{ display: 'flex', gap: '8px', backgroundColor: '#1e293b', padding: '4px', borderRadius: '8px' }}>
              <Link href="?period=day" style={getButtonStyle('day')}>Ngày</Link>
              <Link href="?period=week" style={getButtonStyle('week')}>Tuần</Link>
              <Link href="?period=month" style={getButtonStyle('month')}>Tháng</Link>
              <Link href="?period=quarter" style={getButtonStyle('quarter')}>Quý</Link>
              <Link href="?period=year" style={getButtonStyle('year')}>Năm</Link>
            </div>
          </div>

          {/* Cards metrics GA4 & GSC */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            <div style={{ backgroundColor: '#1e293b', padding: '18px', borderRadius: '12px', borderLeft: '4px solid #3b82f6' }}>
              <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0, textTransform: 'uppercase', fontWeight: 'bold' }}>Tổng Truy Cập (Sessions)</p>
              <h2 style={{ fontSize: '26px', color: '#ffffff', margin: '6px 0 0 0' }}>{currentStats.visits}</h2>
              <span style={{ fontSize: '12px', color: '#22c55e' }}>Phiên truy cập website</span>
            </div>

            <div style={{ backgroundColor: '#1e293b', padding: '18px', borderRadius: '12px', borderLeft: '4px solid #f59e0b' }}>
              <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0, textTransform: 'uppercase', fontWeight: 'bold' }}>Người Dùng Mới (New Users)</p>
              <h2 style={{ fontSize: '26px', color: '#f59e0b', margin: '6px 0 0 0' }}>{currentStats.organic}</h2>
              <span style={{ fontSize: '12px', color: '#22c55e' }}>Thu hút KH mới</span>
            </div>

            <div style={{ backgroundColor: '#1e293b', padding: '18px', borderRadius: '12px', borderLeft: '4px solid #10b981' }}>
              <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0, textTransform: 'uppercase', fontWeight: 'bold' }}>Tổng Tương Tác (Events)</p>
              <h2 style={{ fontSize: '26px', color: '#10b981', margin: '6px 0 0 0' }}>{currentStats.leads}</h2>
              <span style={{ fontSize: '12px', color: '#94a3b8' }}>Click, Bấm gọi Zalo</span>
            </div>

            <div style={{ backgroundColor: '#1e293b', padding: '18px', borderRadius: '12px', borderLeft: '4px solid #8b5cf6' }}>
              <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0, textTransform: 'uppercase', fontWeight: 'bold' }}>Tổng Nhấp GSC (Clicks)</p>
              <h2 style={{ fontSize: '26px', color: '#8b5cf6', margin: '6px 0 0 0' }}>{totalGscClicks}</h2>
              <span style={{ fontSize: '12px', color: '#8b5cf6' }}>Từ kết quả tìm kiếm Google</span>
            </div>

            <div style={{ backgroundColor: '#1e293b', padding: '18px', borderRadius: '12px', borderLeft: '4px solid #ec4899' }}>
              <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0, textTransform: 'uppercase', fontWeight: 'bold' }}>Hiển Thị GSC (Impressions)</p>
              <h2 style={{ fontSize: '26px', color: '#ec4899', margin: '6px 0 0 0' }}>{totalGscImpressions}</h2>
              <span style={{ fontSize: '12px', color: '#ec4899' }}>Lượt hiển thị tìm kiếm</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '24px', marginBottom: '24px' }}>
            {/* Top Pages Table */}
            <div style={{ backgroundColor: '#1e293b', padding: '24px', borderRadius: '12px' }}>
              <h3 style={{ fontSize: '18px', color: '#f59e0b', margin: '0 0 16px 0' }}>🏆 Top Nội Dung Thu Hút Nhất (GA4)</h3>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #334155', color: '#94a3b8' }}>
                      <th style={{ padding: '10px', width: '70px' }}>Hạng</th>
                      <th style={{ padding: '10px' }}>Tiêu đề trang (Page Title)</th>
                      <th style={{ padding: '10px', width: '90px' }}>Số Phiên</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pages.length > 0 ? pages.map((page: any) => (
                      <tr key={page.rank} style={{ borderBottom: '1px solid #334155' }}>
                        <td style={{ padding: '10px', fontWeight: 'bold' }}>
                          <span style={{ backgroundColor: page.rank <= 3 ? '#f59e0b' : '#475569', color: '#0f172a', padding: '2px 6px', borderRadius: '4px', fontSize: '12px' }}>{page.position}</span>
                        </td>
                        <td style={{ padding: '10px', color: '#ffffff', fontWeight: 'bold' }}>{page.title}</td>
                        <td style={{ padding: '10px', color: '#cbd5e1', fontWeight: 'bold' }}>{page.sessions}</td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={3} style={{ padding: '20px', textAlign: 'center', color: '#64748b' }}>
                          Chưa có dữ liệu từ Google Analytics
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Top Keywords Table */}
            <div style={{ backgroundColor: '#1e293b', padding: '24px', borderRadius: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '18px', color: '#3b82f6', margin: 0 }}>🔍 Top Từ Khóa Tìm Kiếm (GSC Full Metrics)</h3>
                <span style={{ fontSize: '11px', color: '#94a3b8', backgroundColor: '#0f172a', padding: '4px 8px', borderRadius: '4px' }}>Top {gscKeywords.length} từ khóa</span>
              </div>
              
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #334155', color: '#94a3b8' }}>
                      <th style={{ padding: '10px', width: '70px' }}>Hạng GG</th>
                      <th style={{ padding: '10px' }}>Từ khóa (Query)</th>
                      <th style={{ padding: '10px', width: '60px' }}>Nhấp</th>
                      <th style={{ padding: '10px', width: '60px' }}>Hiển thị</th>
                      <th style={{ padding: '10px', width: '60px' }}>CTR</th>
                      <th style={{ padding: '10px', width: '140px' }}>Gợi ý chiến lược</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gscKeywords && gscKeywords.length > 0 ? gscKeywords.map((kw: any) => {
                      const insight = getSmartInsight(kw.clicks, kw.impressions, kw.position);
                      return (
                        <tr key={kw.rank} style={{ borderBottom: '1px solid #334155' }}>
                          <td style={{ padding: '10px', fontWeight: 'bold' }}>
                            <span style={{ backgroundColor: parseFloat(kw.position) <= 3 ? '#3b82f6' : '#475569', color: '#ffffff', padding: '2px 6px', borderRadius: '4px', fontSize: '11px' }}>
                              Top {kw.position}
                            </span>
                          </td>
                          <td style={{ padding: '10px', color: '#ffffff', fontWeight: 'bold' }}>{kw.query}</td>
                          <td style={{ padding: '10px', color: '#22c55e', fontWeight: 'bold' }}>{kw.clicks}</td>
                          <td style={{ padding: '10px', color: '#cbd5e1' }}>{kw.impressions}</td>
                          <td style={{ padding: '10px', color: parseFloat(kw.ctr) > 0 ? '#f59e0b' : '#64748b' }}>{kw.ctr}</td>
                          <td style={{ padding: '10px' }}>
                            <span style={{ backgroundColor: insight.bg, color: insight.color, padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold', display: 'inline-block' }}>
                              {insight.label}
                            </span>
                          </td>
                        </tr>
                      );
                    }) : (
                      <tr>
                        <td colSpan={6} style={{ padding: '24px', textAlign: 'center', color: '#f87171', fontSize: '13px', lineHeight: '1.6' }}>
                          {gscError ? (
                            <div>
                              <p style={{ fontWeight: 'bold', margin: '0 0 8px 0' }}>⚠️ {gscError}</p>
                              <p style={{ color: '#94a3b8', margin: 0, fontSize: '12px' }}>
                                Cần kích hoạt Google Search Console API tại Google Cloud Console &amp; cấp quyền User cho Email Service Account: <code>vnpis-seo-bot@vnpis-com.iam.gserviceaccount.com</code> trong Search Console.
                              </p>
                            </div>
                          ) : (
                            'Chưa có dữ liệu từ khóa hiển thị trong khoảng thời gian này (dữ liệu GSC có chênh lệch 2-3 ngày).'
                          )}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
