import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/Card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/Table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Pencil, Save, X } from "lucide-react";
import { useData } from "../DataContext";

export function Segmen5() {
  const { paketData, setPaketData } = useData();
  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState(paketData);

  useEffect(() => { setTempData(paketData); }, [paketData]);

  const totalPaket = paketData.reduce((acc, curr) => acc + curr.paket, 0);
  const totalSurat = paketData.reduce((acc, curr) => acc + curr.surat, 0);
  const totalDokumen = paketData.reduce((acc, curr) => acc + curr.dokumen, 0);
  const totalKeseluruhan = totalPaket + totalSurat + totalDokumen;

  const handleSave = () => { setPaketData(tempData); setIsEditing(false); }
  const handleCancel = () => { setTempData(paketData); setIsEditing(false); }
  const handleChange = (idx: number, field: string, value: string | number) => {
    const newData = [...tempData];
    newData[idx] = { ...newData[idx], [field]: value };
    setTempData(newData);
  }

  const inputClass = "w-full border border-slate-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white";

  return (
    <div className="space-y-6">
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Total Keseluruhan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalKeseluruhan.toLocaleString('id-ID')}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Total Paket</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{totalPaket.toLocaleString('id-ID')}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Total Surat</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-sky-600">{totalSurat.toLocaleString('id-ID')}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Total Dokumen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">{totalDokumen.toLocaleString('id-ID')}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Analisa Distribusi Paket Mako GUA</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600 mb-6">
            Penerimaan paket didominasi oleh <strong>Muni</strong> dan <strong>Dirut</strong>. 
            Volume penerimaan barang berbentuk Paket jauh melebihi Surat dan Dokumen, menandakan intensitas lalu lintas logistik barang yang tinggi dibanding persuratan konvensional di area Mako GUA.
          </p>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={paketData} margin={{ top: 20, right: 30, left: 0, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="nama" angle={-45} textAnchor="end" height={80} tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Legend verticalAlign="top" height={36}/>
                <Bar dataKey="paket" name="Paket" fill="#d97706" stackId="a" />
                <Bar dataKey="surat" name="Surat" fill="#0ea5e9" stackId="a" />
                <Bar dataKey="dokumen" name="Dokumen" fill="#10b981" stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle>Data Raw: Rekap Paket Mako GUA</CardTitle>
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
                <TableHead>Nama</TableHead>
                <TableHead className="text-right">Paket</TableHead>
                <TableHead className="text-right">Surat</TableHead>
                <TableHead className="text-right">Dokumen</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tempData.map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium">{isEditing ? <input type="text" className={inputClass} value={row.nama} onChange={(e) => handleChange(idx, 'nama', e.target.value)} /> : row.nama}</TableCell>
                  <TableCell className="text-right">{isEditing ? <input type="number" className={inputClass} value={row.paket} onChange={(e) => handleChange(idx, 'paket', Number(e.target.value))} /> : row.paket}</TableCell>
                  <TableCell className="text-right">{isEditing ? <input type="number" className={inputClass} value={row.surat} onChange={(e) => handleChange(idx, 'surat', Number(e.target.value))} /> : row.surat}</TableCell>
                  <TableCell className="text-right">{isEditing ? <input type="number" className={inputClass} value={row.dokumen} onChange={(e) => handleChange(idx, 'dokumen', Number(e.target.value))} /> : row.dokumen}</TableCell>
                  <TableCell className="text-right font-bold">{row.paket + row.surat + row.dokumen}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
