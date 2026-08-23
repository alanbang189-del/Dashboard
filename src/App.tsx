import React, { useState } from 'react';
import { Segmen1 } from './segments/Segmen1';
import { SegmenJadwalSeragam } from './segments/SegmenJadwalSeragam';
import { Segmen2 } from './segments/Segmen2';
import { Segmen3 } from './segments/Segmen3';
import { Segmen4 } from './segments/Segmen4';
import { Segmen5 } from './segments/Segmen5';
import { Segmen6 } from './segments/Segmen6';
import { Segmen7 } from './segments/Segmen7';
import SegmenJadwalHT from './segments/SegmenJadwalHT';
import { 
  LayoutDashboard, 
  RadioTower, 
  Paperclip, 
  CarFront, 
  Package, 
  Tags, 
  CreditCard,
  Menu,
  X,
  Upload,
  Download,
  Pencil,
  Shirt,
  CalendarDays
} from 'lucide-react';
import { DataProvider, useData } from './DataContext';
import { formatCompactRupiah } from './utils';

function AppContent() {
  const data = useData();
  const [activeSegment, setActiveSegment] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const totals = {
    segmen1: data.distribusiData.reduce((acc, curr) => acc + curr.personil, 0) + ' Org',
    segmenSeragam: data.jadwalSeragamBulan.reduce((acc, curr) => acc + curr.agustus25 + curr.sep8 + curr.sep10_13, 0) + ' Pcs',
    segmen2: data.analisaHTData.reduce((acc, curr) => acc + curr.ht, 0) + ' Unit',
    segmenJadwalHT: formatCompactRupiah(data.jadwalBiayaHT.reduce((acc, curr) => acc + curr.total, 0)),
    segmen3: formatCompactRupiah(data.pengeluaranATKData.reduce((acc, curr) => acc + curr.mako + curr.unit, 0)),
    segmen4: formatCompactRupiah(data.pengeluaranKendaraanBulanan.reduce((acc, curr) => acc + curr.total, 0)),
    segmen5: data.paketData.reduce((acc, curr) => acc + curr.paket + curr.surat + curr.dokumen, 0) + ' Brg',
    segmen6: formatCompactRupiah(data.hargaHTData.reduce((acc, curr) => acc + curr.totalHarga, 0)),
    segmen7: formatCompactRupiah(data.statusVendorData.reduce((acc, curr) => acc + curr.value, 0))
  };

  const MENU_ITEMS = [
    { id: 1, title: 'Jadwal Distribusi Gam-Kap & Anggaran Gam-Kap', icon: LayoutDashboard, component: Segmen1, total: totals.segmen1 },
    { id: 8, title: 'Jadwal Seragam OB & MES', icon: Shirt, component: SegmenJadwalSeragam, total: totals.segmenSeragam },
    { id: 2, title: 'Analisa HT Mayora', icon: RadioTower, component: Segmen2, total: totals.segmen2 },
    { id: 9, title: 'Jadwal Pergantian HT Mayora', icon: CalendarDays, component: SegmenJadwalHT, total: totals.segmenJadwalHT },
    { id: 3, title: 'Pengeluaran ATK', icon: Paperclip, component: Segmen3, total: totals.segmen3 },
    { id: 4, title: 'Kendaraan Operasional', icon: CarFront, component: Segmen4, total: totals.segmen4 },
    { id: 5, title: 'Data Paket Mako GUA', icon: Package, component: Segmen5, total: totals.segmen5 },
    { id: 6, title: 'Harga HT All Unit', icon: Tags, component: Segmen6, total: totals.segmen6 },
    { id: 7, title: 'Status Pembayaran Vendor', icon: CreditCard, component: Segmen7, total: totals.segmen7 },
  ];

  const activeItem = MENU_ITEMS.find(item => item.id === activeSegment) || MENU_ITEMS[0];
  const ActiveComponent = activeItem.component;
  const activeTitle = activeItem.title;

  return (
    <div className="flex h-screen w-full bg-slate-50 font-sans text-slate-900 overflow-hidden">
      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        flex flex-col fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-slate-300 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex h-20 shrink-0 items-center px-6 bg-slate-950/50">
          <div>
            <h1 className="text-lg font-bold text-white tracking-wide leading-tight">
              DASHBOARD GA MAYORA
            </h1>
            <p className="text-xs text-slate-400 mt-1 font-medium">
              Periode Januari s/d Agustus 2026
            </p>
          </div>
          <button 
            className="ml-auto lg:hidden text-slate-400 hover:text-white"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 space-y-1 overflow-y-auto flex-1">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 mt-2 px-2">
            Segmen Laporan
          </div>
          {MENU_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSegment(item.id);
                setIsSidebarOpen(false);
              }}
              className={`
                w-full flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-lg transition-colors
                ${activeSegment === item.id 
                  ? 'bg-blue-600 text-white' 
                  : 'hover:bg-slate-800 hover:text-slate-100'}
              `}
            >
              <item.icon className={`h-5 w-5 shrink-0 ${activeSegment === item.id ? 'text-blue-200' : 'text-slate-500'}`} />
              <span className="text-left leading-tight truncate">{item.title}</span>
            </button>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 md:px-6 shadow-sm">
          <div className="flex items-center gap-4 min-w-0">
            <button 
              className="lg:hidden shrink-0 text-slate-500 hover:text-slate-700"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="min-w-0">
              <h2 className="text-xl font-bold text-slate-800 leading-tight hidden md:block truncate">
                Paparan Kerja Divisi General Affair (GA)
              </h2>
              <div className="text-sm font-medium text-blue-600 md:hidden truncate">{activeTitle}</div>
            </div>
          </div>
          <button 
            onClick={() => {
              const content = document.getElementById('dashboard-content');
              if (!content) return;
              
              const htmlString = `
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Laporan - ${activeTitle}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { background-color: #f8fafc; padding: 2rem; font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; }
    /* Pastikan input form disembunyikan saat laporan HTML karena ini view mode */
    input { pointer-events: none; }
  </style>
</head>
<body>
  <div class="max-w-6xl mx-auto">
    <div class="mb-8 border-b border-slate-200 pb-4">
      <h1 class="text-3xl font-bold text-slate-900 tracking-tight mb-2">Paparan Kerja Divisi General Affair (GA)</h1>
      <h2 class="text-xl text-slate-600">${activeTitle}</h2>
    </div>
    <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      ${content.innerHTML}
    </div>
  </div>
</body>
</html>`;
              
              const blob = new Blob([htmlString], { type: 'text/html;charset=utf-8' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `Laporan_${activeTitle.replace(/\s+/g, '_')}.html`;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
            }}
            className="flex items-center gap-2 bg-blue-50 text-blue-700 hover:bg-blue-100 px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-blue-200"
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Download HTML</span>
          </button>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-4 md:p-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-6 hidden md:block">
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{activeTitle}</h3>
            </div>
            
            <div id="dashboard-content">
              <ActiveComponent />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
}
