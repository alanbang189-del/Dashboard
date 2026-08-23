import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/Card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/Table";
import { formatRupiah } from "../utils";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { CheckCircle2, AlertCircle, Pencil, Save, X } from "lucide-react";
import { useData } from "../DataContext";

export function Segmen7() {
  const { statusVendorData, setStatusVendorData, detailBelumLunasData, setDetailBelumLunasData } = useData();
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingDetail, setIsEditingDetail] = useState(false);
  
  const [tempData, setTempData] = useState(statusVendorData);
  const [tempDetailData, setTempDetailData] = useState(detailBelumLunasData);

  useEffect(() => { setTempData(statusVendorData); }, [statusVendorData]);
  useEffect(() => { setTempDetailData(detailBelumLunasData); }, [detailBelumLunasData]);

  const COLORS = ['#22c55e', '#ef4444'];
  const totalLunas = statusVendorData.find(d => d.name === 'Sudah Lunas')?.value || 0;
  const totalBelumLunas = statusVendorData.find(d => d.name === 'Belum Lunas')?.value || 0;
  const totalKeseluruhan = totalLunas + totalBelumLunas;

  const totalTempLunas = tempData.find(d => d.name === 'Sudah Lunas')?.value || 0;
  const totalTempBelumLunas = tempData.find(d => d.name === 'Belum Lunas')?.value || 0;
  const totalTempKeseluruhan = totalTempLunas + totalTempBelumLunas;

  const handleSave = () => { setStatusVendorData(tempData); setIsEditing(false); }
  const handleCancel = () => { setTempData(statusVendorData); setIsEditing(false); }
  const handleChange = (idx: number, field: string, value: string | number) => {
    const newData = [...tempData];
    newData[idx] = { ...newData[idx], [field]: value };
    setTempData(newData);
  }

  const handleSaveDetail = () => { 
    setDetailBelumLunasData(tempDetailData); 
    
    // Auto update chart when detail changes
    const newTotalBelumLunas = tempDetailData.reduce((acc, curr) => acc + curr.rp, 0);
    const updatedVendorData = statusVendorData.map(d => 
      d.name === 'Belum Lunas' ? { ...d, value: newTotalBelumLunas } : d
    );
    setStatusVendorData(updatedVendorData);
    setTempData(updatedVendorData);
    
    setIsEditingDetail(false); 
  }
  const handleCancelDetail = () => { setTempDetailData(detailBelumLunasData); setIsEditingDetail(false); }
  const handleDetailChange = (id: number, field: string, value: string | number) => {
    setTempDetailData(tempDetailData.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  }

  const inputClass = "w-full border border-slate-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white";
  
  const activeDetailData = isEditingDetail ? tempDetailData : detailBelumLunasData;
  const totalDetailRp = activeDetailData.reduce((acc, curr) => acc + curr.rp, 0);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Total Nominal PO</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatRupiah(totalKeseluruhan)}</div>
          </CardContent>
        </Card>
        <Card className="border-emerald-200 bg-emerald-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-emerald-700 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Sudah Lunas ({((totalLunas / (totalKeseluruhan || 1)) * 100).toFixed(0)}%)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-700">{formatRupiah(totalLunas)}</div>
          </CardContent>
        </Card>
        <Card className="border-red-200 bg-red-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" /> Belum Lunas ({((totalBelumLunas / (totalKeseluruhan || 1)) * 100).toFixed(0)}%)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-700">{formatRupiah(totalBelumLunas)}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Analisa Status Pembayaran Vendor</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-slate-600 mb-4 leading-relaxed">
              Manajemen pembayaran vendor berjalan sangat baik, di mana sebagian besar dari total tagihan Purchase Order (PO) telah berhasil dilunasi. 
            </p>
            <p className="text-slate-600 leading-relaxed">
              Terdapat sisa tunggakan pembayaran atau status "Belum Lunas" yang perlu segera dijadwalkan dan diselesaikan sesuai dengan termin/waktu kesepakatan dengan vendor untuk menjaga likuiditas operasional dan kepercayaan rekanan pihak ketiga.
            </p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={statusVendorData} 
                  cx="50%" 
                  cy="50%" 
                  innerRadius={80} 
                  outerRadius={110} 
                  paddingAngle={2} 
                  dataKey="value"
                >
                  {statusVendorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => formatRupiah(value)} />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle>Data Raw: Status Pembayaran Vendor</CardTitle>
          {isEditing ? (
            <div className="flex items-center gap-2">
              <button onClick={handleCancel} className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 px-3 py-1.5 rounded-md text-sm font-medium transition-colors">
                <X className="h-4 w-4" /> Batal
              </button>
              <button onClick={handleSave} className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white border border-emerald-600 px-3 py-1.5 rounded-md text-sm font-medium transition-colors shadow-sm">
                <Save className="h-4 w-4" /> Simpan
              </button>
            </div>
          ) : (
            <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 px-3 py-1.5 rounded-md text-sm font-medium transition-colors">
              <Pencil className="h-4 w-4" />
              Edit Data
            </button>
          )}
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Status Pembayaran</TableHead>
                <TableHead className="text-right">Persentase</TableHead>
                <TableHead className="text-right">Nominal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tempData.map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium">{isEditing ? <input type="text" className={inputClass} value={row.name} onChange={(e) => handleChange(idx, 'name', e.target.value)} /> : row.name}</TableCell>
                  <TableCell className="text-right">
                    {((row.value / (totalTempKeseluruhan || 1)) * 100).toFixed(0)}%
                  </TableCell>
                  <TableCell className="text-right">{isEditing ? <input type="number" className={inputClass} value={row.value} onChange={(e) => handleChange(idx, 'value', Number(e.target.value))} /> : formatRupiah(row.value)}</TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-slate-50 font-bold">
                <TableCell>Total</TableCell>
                <TableCell className="text-right">100%</TableCell>
                <TableCell className="text-right">{formatRupiah(totalTempKeseluruhan)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle>Rincian Tagihan Belum Lunas</CardTitle>
          {isEditingDetail ? (
            <div className="flex items-center gap-2">
              <button onClick={handleCancelDetail} className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 px-3 py-1.5 rounded-md text-sm font-medium transition-colors">
                <X className="h-4 w-4" /> Batal
              </button>
              <button onClick={handleSaveDetail} className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white border border-emerald-600 px-3 py-1.5 rounded-md text-sm font-medium transition-colors shadow-sm">
                <Save className="h-4 w-4" /> Simpan
              </button>
            </div>
          ) : (
            <button onClick={() => setIsEditingDetail(true)} className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 px-3 py-1.5 rounded-md text-sm font-medium transition-colors">
              <Pencil className="h-4 w-4" />
              Edit Rincian
            </button>
          )}
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16 text-center">NO</TableHead>
                  <TableHead>UNIT KERJA</TableHead>
                  <TableHead>JENIS BARANG</TableHead>
                  <TableHead>VENDOR</TableHead>
                  <TableHead className="text-right">RP</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(() => {
                  const rows: React.ReactNode[] = [];
                  let subtotal = 0;

                  activeDetailData.forEach((row, index) => {
                    if (index > 0 && row.vendor !== activeDetailData[index - 1].vendor) {
                      rows.push(
                        <TableRow key={`subtotal-${index}`} className="font-bold">
                          <TableCell colSpan={4}></TableCell>
                          <TableCell className="text-right text-slate-900 border-b-2 border-slate-300">{formatRupiah(subtotal)}</TableCell>
                        </TableRow>
                      );
                      subtotal = 0;
                    }

                    subtotal += row.rp;

                    rows.push(
                      <TableRow key={row.id}>
                        <TableCell className="text-center font-medium">
                          {isEditingDetail ? <input type="text" className={`${inputClass} text-center`} value={row.no} onChange={(e) => handleDetailChange(row.id, 'no', e.target.value)} /> : row.no}
                        </TableCell>
                        <TableCell>
                          {isEditingDetail ? <input type="text" className={inputClass} value={row.unitKerja} onChange={(e) => handleDetailChange(row.id, 'unitKerja', e.target.value)} /> : row.unitKerja}
                        </TableCell>
                        <TableCell>
                          {isEditingDetail ? <input type="text" className={inputClass} value={row.jenisBarang} onChange={(e) => handleDetailChange(row.id, 'jenisBarang', e.target.value)} /> : row.jenisBarang}
                        </TableCell>
                        <TableCell>
                          {isEditingDetail ? <input type="text" className={inputClass} value={row.vendor} onChange={(e) => handleDetailChange(row.id, 'vendor', e.target.value)} /> : row.vendor}
                        </TableCell>
                        <TableCell className="text-right">
                          {isEditingDetail ? <input type="number" className={`${inputClass} text-right`} value={row.rp} onChange={(e) => handleDetailChange(row.id, 'rp', Number(e.target.value))} /> : formatRupiah(row.rp)}
                        </TableCell>
                      </TableRow>
                    );

                    if (index === activeDetailData.length - 1) {
                      rows.push(
                        <TableRow key={`subtotal-last`} className="font-bold">
                          <TableCell colSpan={4}></TableCell>
                          <TableCell className="text-right text-slate-900 border-b-2 border-slate-300">{formatRupiah(subtotal)}</TableCell>
                        </TableRow>
                      );
                    }
                  });

                  return rows;
                })()}
                <TableRow className="bg-slate-100 border-t-2 border-slate-300 font-bold">
                  <TableCell colSpan={4} className="text-left">TOTAL PO BELUM DIBAYAR</TableCell>
                  <TableCell className="text-right text-red-600">{formatRupiah(totalDetailRp)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
