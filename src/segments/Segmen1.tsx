import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/Card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/Table";
import { formatRupiah } from "../utils";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Pencil, Save, X } from "lucide-react";
import { useData } from "../DataContext";

export function Segmen1() {
  const { distribusiData, setDistribusiData } = useData();
  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState(distribusiData);

  useEffect(() => { setTempData(distribusiData); }, [distribusiData]);

  const chartData = distribusiData.map(d => ({
    name: d.unit.length > 15 ? d.unit.substring(0, 15) + '...' : d.unit,
    "Gam Kap": d.gamKap,
    "Peralatan": d.peralatan
  }));

  const totalGamKap = distribusiData.reduce((acc, curr) => acc + curr.gamKap, 0);
  const totalPeralatan = distribusiData.reduce((acc, curr) => acc + curr.peralatan, 0);

  const handleSave = () => { setDistribusiData(tempData); setIsEditing(false); }
  const handleCancel = () => { setTempData(distribusiData); setIsEditing(false); }
  const handleChange = (idx: number, field: string, value: string | number) => {
    const newData = [...tempData];
    newData[idx] = { ...newData[idx], [field]: value };
    setTempData(newData);
  }

  const inputClass = "w-full border border-slate-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white";

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Total Anggaran Gam Kap</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatRupiah(totalGamKap)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Total Anggaran Peralatan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatRupiah(totalPeralatan)}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Analisa Jadwal Distribusi & Anggaran</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600 mb-6">
            Anggaran terbesar dialokasikan pada <strong>IMFI (Satpam)</strong> sebesar Rp 215.082.500 dengan total personil mencapai 227 orang.
            Jadwal distribusi berpusat pada bulan September dan Oktober untuk sebagian besar unit kerja Mayora. Total keseluruhan personil dari rencana distribusi ini adalah {distribusiData.reduce((acc, curr) => acc + curr.personil, 0)} orang.
          </p>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 40, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} tick={{ fontSize: 12 }} />
                <YAxis tickFormatter={(val) => `Rp ${val / 1000000}M`} width={80} />
                <Tooltip formatter={(value: number) => formatRupiah(value)} />
                <Legend verticalAlign="top" height={36}/>
                <Bar dataKey="Gam Kap" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Peralatan" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle>Data Raw: Distribusi Gam-Kap & Anggaran</CardTitle>
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
                <TableHead>No</TableHead>
                <TableHead>Unit Kerja</TableHead>
                <TableHead>Bulan</TableHead>
                <TableHead className="text-right">Personil</TableHead>
                <TableHead className="text-right">Gam Kap</TableHead>
                <TableHead className="text-right">Peralatan</TableHead>
                <TableHead className="text-right">Jumlah Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tempData.map((row, idx) => (
                <TableRow key={row.no}>
                  <TableCell>{row.no}</TableCell>
                  <TableCell>{isEditing ? <input type="text" className={inputClass} value={row.unit} onChange={(e) => handleChange(idx, 'unit', e.target.value)} /> : row.unit}</TableCell>
                  <TableCell>{isEditing ? <input type="text" className={inputClass} value={row.bulan} onChange={(e) => handleChange(idx, 'bulan', e.target.value)} /> : row.bulan}</TableCell>
                  <TableCell className="text-right">{isEditing ? <input type="number" className={inputClass} value={row.personil} onChange={(e) => handleChange(idx, 'personil', Number(e.target.value))} /> : row.personil}</TableCell>
                  <TableCell className="text-right">{isEditing ? <input type="number" className={inputClass} value={row.gamKap} onChange={(e) => handleChange(idx, 'gamKap', Number(e.target.value))} /> : formatRupiah(row.gamKap)}</TableCell>
                  <TableCell className="text-right">{isEditing ? <input type="number" className={inputClass} value={row.peralatan} onChange={(e) => handleChange(idx, 'peralatan', Number(e.target.value))} /> : formatRupiah(row.peralatan)}</TableCell>
                  <TableCell className="text-right font-medium">{formatRupiah(row.gamKap + row.peralatan)}</TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-slate-50 font-bold border-t-2 border-slate-300">
                <TableCell colSpan={3} className="text-center uppercase text-slate-800">Jumlah</TableCell>
                <TableCell className="text-right text-slate-800">{tempData.reduce((acc, curr) => acc + curr.personil, 0)}</TableCell>
                <TableCell className="text-right text-slate-800">{formatRupiah(tempData.reduce((acc, curr) => acc + curr.gamKap, 0))}</TableCell>
                <TableCell className="text-right text-slate-800">{formatRupiah(tempData.reduce((acc, curr) => acc + curr.peralatan, 0))}</TableCell>
                <TableCell className="text-right text-slate-800">{formatRupiah(tempData.reduce((acc, curr) => acc + curr.gamKap + curr.peralatan, 0))}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
