import React, { useState } from 'react';
import { useData } from '../DataContext';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { Pencil, Check, X } from 'lucide-react';

export default function SegmenJadwalHT() {
  const { jadwalBiayaHT, setJadwalBiayaHT } = useData();
  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState([...jadwalBiayaHT]);

  const handleEditChange = (id: number, field: string, value: string) => {
    setTempData(tempData.map(item => {
      if (item.id === id) {
        const numValue = parseInt(value.replace(/[^0-9-]/g, '')) || 0;
        const updatedItem = { ...item };
        
        if (field === 'plant') {
          updatedItem.plant = value;
        } else {
          (updatedItem as any)[field] = numValue;
          // recalculate total
          if (['hargaSatuan', 'qtty'].includes(field)) {
             updatedItem.total = updatedItem.hargaSatuan * updatedItem.qtty;
          }
        }
        return updatedItem;
      }
      return item;
    }));
  };

  const saveEdits = () => {
    setJadwalBiayaHT(tempData);
    setIsEditing(false);
  };

  const cancelEdits = () => {
    setTempData([...jadwalBiayaHT]);
    setIsEditing(false);
  };

  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat('id-ID').format(number);
  };

  // Grouped Rendering Helpers
  const renderRow = (item: any, index: number) => {
    return (
      <tr key={item.id} className="border-b border-slate-200 hover:bg-slate-50 text-sm">
        <td className="py-2 px-3 text-center border-r border-slate-200">{item.id}</td>
        <td className="py-2 px-3 border-r border-slate-200">
          {isEditing ? (
            <input 
              type="text" 
              value={item.plant}
              onChange={(e) => handleEditChange(item.id, 'plant', e.target.value)}
              className="w-full bg-blue-50 border border-blue-200 rounded px-2 py-1"
            />
          ) : (
            item.plant
          )}
        </td>
        <td className="py-2 px-3 text-center border-r border-slate-200">
          {isEditing ? (
            <input 
              type="text" 
              value={item.jml}
              onChange={(e) => handleEditChange(item.id, 'jml', e.target.value)}
              className="w-16 bg-blue-50 border border-blue-200 rounded px-2 py-1 text-center"
            />
          ) : (
            item.jml
          )}
        </td>
        <td className={`py-2 px-3 text-center border-r border-slate-200 ${item.sep > 0 && !isEditing ? 'bg-green-100' : ''}`}>
          {isEditing ? (
            <input 
              type="text" 
              value={item.sep}
              onChange={(e) => handleEditChange(item.id, 'sep', e.target.value)}
              className="w-12 bg-blue-50 border border-blue-200 rounded px-1 py-1 text-center"
            />
          ) : (
            item.sep > 0 ? item.sep : ''
          )}
        </td>
        <td className={`py-2 px-3 text-center border-r border-slate-200 ${item.okt > 0 && !isEditing ? 'bg-green-100' : ''}`}>
          {isEditing ? (
            <input 
              type="text" 
              value={item.okt}
              onChange={(e) => handleEditChange(item.id, 'okt', e.target.value)}
              className="w-12 bg-blue-50 border border-blue-200 rounded px-1 py-1 text-center"
            />
          ) : (
            item.okt > 0 ? item.okt : ''
          )}
        </td>
        <td className={`py-2 px-3 text-center border-r border-slate-200 ${item.nov > 0 && !isEditing ? 'bg-green-100' : ''}`}>
          {isEditing ? (
            <input 
              type="text" 
              value={item.nov}
              onChange={(e) => handleEditChange(item.id, 'nov', e.target.value)}
              className="w-12 bg-blue-50 border border-blue-200 rounded px-1 py-1 text-center"
            />
          ) : (
            item.nov > 0 ? item.nov : ''
          )}
        </td>
        <td className={`py-2 px-3 text-center border-r border-slate-200 ${item.des > 0 && !isEditing ? 'bg-green-100' : ''}`}>
          {isEditing ? (
            <input 
              type="text" 
              value={item.des}
              onChange={(e) => handleEditChange(item.id, 'des', e.target.value)}
              className="w-12 bg-blue-50 border border-blue-200 rounded px-1 py-1 text-center"
            />
          ) : (
            item.des > 0 ? item.des : ''
          )}
        </td>
        <td className="py-2 px-3 text-right border-r border-slate-200">
          {isEditing ? (
            <input 
              type="text" 
              value={formatRupiah(item.hargaSatuan)}
              onChange={(e) => handleEditChange(item.id, 'hargaSatuan', e.target.value)}
              className="w-24 bg-blue-50 border border-blue-200 rounded px-2 py-1 text-right"
            />
          ) : (
            formatRupiah(item.hargaSatuan)
          )}
        </td>
        <td className="py-2 px-3 text-center border-r border-slate-200">
          {isEditing ? (
            <input 
              type="text" 
              value={item.qtty}
              onChange={(e) => handleEditChange(item.id, 'qtty', e.target.value)}
              className="w-12 bg-blue-50 border border-blue-200 rounded px-1 py-1 text-center"
            />
          ) : (
            item.qtty
          )}
        </td>
        <td className="py-2 px-3 text-right">
          {formatRupiah(item.total)}
        </td>
      </tr>
    );
  };

  const renderSubtotal = (minggu: number, label: string) => {
    const data = isEditing ? tempData : jadwalBiayaHT;
    const groupData = data.filter(d => d.minggu === minggu);
    const totalGroup = groupData.reduce((acc, curr) => acc + curr.total, 0);

    return (
      <tr className="bg-slate-50 border-b-2 border-slate-300 font-bold text-sm">
        <td colSpan={9} className="py-2 px-3 uppercase border-r border-slate-200">{label}</td>
        <td className="py-2 px-3 text-right">{formatRupiah(totalGroup)}</td>
      </tr>
    );
  };

  const dataToUse = isEditing ? tempData : jadwalBiayaHT;
  
  // Overall Totals
  const totalJml = dataToUse.reduce((sum, item) => sum + item.jml, 0);
  const totalSep = dataToUse.reduce((sum, item) => sum + item.sep, 0);
  const totalOkt = dataToUse.reduce((sum, item) => sum + item.okt, 0);
  const totalNov = dataToUse.reduce((sum, item) => sum + item.nov, 0);
  const totalDes = dataToUse.reduce((sum, item) => sum + item.des, 0);
  const totalKeseluruhan = dataToUse.reduce((sum, item) => sum + item.total, 0);

  // Chart Data preparation
  const chartData = [
    { name: 'SEP', Biaya: dataToUse.filter(d => d.minggu === 1).reduce((sum, d) => sum + d.total, 0), Qtty: dataToUse.filter(d => d.minggu === 1).reduce((sum, d) => sum + d.qtty, 0) },
    { name: 'OKT', Biaya: dataToUse.filter(d => d.minggu === 2).reduce((sum, d) => sum + d.total, 0), Qtty: dataToUse.filter(d => d.minggu === 2).reduce((sum, d) => sum + d.qtty, 0) },
    { name: 'NOV', Biaya: dataToUse.filter(d => d.minggu === 3).reduce((sum, d) => sum + d.total, 0), Qtty: dataToUse.filter(d => d.minggu === 3).reduce((sum, d) => sum + d.qtty, 0) },
    { name: 'DES', Biaya: dataToUse.filter(d => d.minggu === 4).reduce((sum, d) => sum + d.total, 0), Qtty: dataToUse.filter(d => d.minggu === 4).reduce((sum, d) => sum + d.qtty, 0) },
  ];

  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      
      {/* Header & Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Summary Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col justify-center items-center text-center">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Total Anggaran HT</h2>
          <div className="text-4xl font-bold text-blue-700 mb-2">Rp {formatRupiah(totalKeseluruhan)}</div>
          <p className="text-slate-500 text-sm">Alokasi jadwal per bulan (Sep - Des)</p>
          <div className="mt-6 flex gap-4 w-full">
            <div className="flex-1 bg-slate-50 rounded-lg p-3 border border-slate-100">
              <div className="text-xs text-slate-500 mb-1">Total Plant</div>
              <div className="font-bold text-lg text-slate-800">{dataToUse.length} Unit</div>
            </div>
            <div className="flex-1 bg-slate-50 rounded-lg p-3 border border-slate-100">
              <div className="text-xs text-slate-500 mb-1">Total Qtty HT</div>
              <div className="font-bold text-lg text-slate-800">{dataToUse.reduce((s,i) => s + i.qtty, 0)} Pcs</div>
            </div>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-base font-bold text-slate-800 mb-6">Grafik Biaya HT per Bulan</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 0, right: 0, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748B', fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748B', fontSize: 12 }}
                  tickFormatter={(value) => `${value / 1000000}M`}
                />
                <Tooltip
                  cursor={{ fill: '#F1F5F9' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: number) => [`Rp ${formatRupiah(value)}`, 'Biaya']}
                />
                <Bar 
                  dataKey="Biaya" 
                  fill="#3B82F6" 
                  radius={[4, 4, 0, 0]} 
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <h2 className="text-base font-bold text-slate-800">Tabel Rincian Jadwal & Biaya</h2>
          {!isEditing ? (
            <button 
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors shadow-sm"
            >
              <Pencil className="h-4 w-4" />
              Edit Data
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button 
                onClick={cancelEdits}
                className="flex items-center gap-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
              >
                <X className="h-4 w-4" />
                Batal
              </button>
              <button 
                onClick={saveEdits}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors shadow-sm"
              >
                <Check className="h-4 w-4" />
                Simpan
              </button>
            </div>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200 text-slate-700">
                <th rowSpan={2} className="py-2 px-3 text-center border-r border-slate-200 font-semibold text-xs">NO</th>
                <th rowSpan={2} className="py-2 px-3 text-left border-r border-slate-200 font-semibold text-xs">PLANT</th>
                <th rowSpan={2} className="py-2 px-3 text-center border-r border-slate-200 font-semibold text-xs">JML</th>
                <th colSpan={4} className="py-1 px-3 text-center border-r border-b border-slate-200 font-semibold text-xs">BULAN</th>
                <th rowSpan={2} className="py-2 px-3 text-right border-r border-slate-200 font-semibold text-xs">HARGA SATUAN</th>
                <th rowSpan={2} className="py-2 px-3 text-center border-r border-slate-200 font-semibold text-xs">QTTY</th>
                <th rowSpan={2} className="py-2 px-3 text-right font-semibold text-xs">TOTAL</th>
              </tr>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600">
                <th className="py-1 px-3 text-center border-r border-slate-200 font-medium text-xs">SEP<br/><span className="text-[10px]">M4</span></th>
                <th className="py-1 px-3 text-center border-r border-slate-200 font-medium text-xs">OKT<br/><span className="text-[10px]">M4</span></th>
                <th className="py-1 px-3 text-center border-r border-slate-200 font-medium text-xs">NOV<br/><span className="text-[10px]">M4</span></th>
                <th className="py-1 px-3 text-center border-r border-slate-200 font-medium text-xs">DES<br/><span className="text-[10px]">M4</span></th>
              </tr>
            </thead>
            <tbody>
              {/* Group 1 */}
              {dataToUse.filter(d => d.minggu === 1).map((item, index) => renderRow(item, index))}
              {renderSubtotal(1, 'TOTAL MINGGU KE 1')}
              
              {/* Group 2 */}
              {dataToUse.filter(d => d.minggu === 2).map((item, index) => renderRow(item, index))}
              {renderSubtotal(2, 'TOTAL MINGGU KE 2')}
              
              {/* Group 3 */}
              {dataToUse.filter(d => d.minggu === 3).map((item, index) => renderRow(item, index))}
              {renderSubtotal(3, 'TOTAL MINGGU KE 3')}
              
              {/* Group 4 */}
              {dataToUse.filter(d => d.minggu === 4).map((item, index) => renderRow(item, index))}
              {renderSubtotal(4, 'TOTAL MINGGU KE 4')}
              
              {/* Grand Total Row */}
              <tr className="bg-blue-50 border-t-2 border-blue-200 font-bold text-sm text-slate-800">
                <td colSpan={2} className="py-3 px-3 uppercase border-r border-slate-200">TOTAL</td>
                <td className="py-3 px-3 text-center border-r border-slate-200">{totalJml}</td>
                <td className="py-3 px-3 text-center border-r border-slate-200">{totalSep > 0 ? totalSep : ''}</td>
                <td className="py-3 px-3 text-center border-r border-slate-200">{totalOkt > 0 ? totalOkt : ''}</td>
                <td className="py-3 px-3 text-center border-r border-slate-200">{totalNov > 0 ? totalNov : ''}</td>
                <td className="py-3 px-3 text-center border-r border-slate-200">{totalDes > 0 ? totalDes : ''}</td>
                <td className="py-3 px-3 border-r border-slate-200"></td>
                <td className="py-3 px-3 text-center border-r border-slate-200"></td>
                <td className="py-3 px-3 text-right text-blue-700">{formatRupiah(totalKeseluruhan)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
}
