import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/Card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/Table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Pencil, Save, X, Shirt } from "lucide-react";
import { useData } from "../DataContext";

export function SegmenJadwalSeragam() {
  const { 
    jadwalSeragamBulan, setJadwalSeragamBulan,
    jadwalSeragamCabang, setJadwalSeragamCabang 
  } = useData();

  // State Edit for Table 1
  const [isEditingBulan, setIsEditingBulan] = useState(false);
  const [tempBulan, setTempBulan] = useState(jadwalSeragamBulan);
  useEffect(() => { setTempBulan(jadwalSeragamBulan); }, [jadwalSeragamBulan]);

  // State Edit for Table 2
  const [isEditingCabang, setIsEditingCabang] = useState(false);
  const [tempCabang, setTempCabang] = useState(jadwalSeragamCabang);
  useEffect(() => { setTempCabang(jadwalSeragamCabang); }, [jadwalSeragamCabang]);

  const totalSeragam = jadwalSeragamBulan.reduce((acc, curr) => acc + curr.agustus25 + curr.sep8 + curr.sep10_13, 0);

  // Handlers Table 1
  const handleSaveBulan = () => { setJadwalSeragamBulan(tempBulan); setIsEditingBulan(false); }
  const handleCancelBulan = () => { setTempBulan(jadwalSeragamBulan); setIsEditingBulan(false); }
  const handleChangeBulan = (idx: number, field: string, value: string | number) => {
    const newData = [...tempBulan];
    newData[idx] = { ...newData[idx], [field]: value };
    setTempBulan(newData);
  }

  // Handlers Table 2
  const handleSaveCabang = () => { setJadwalSeragamCabang(tempCabang); setIsEditingCabang(false); }
  const handleCancelCabang = () => { setTempCabang(jadwalSeragamCabang); setIsEditingCabang(false); }
  const handleChangeCabang = (idx: number, field: string, value: string | number) => {
    const newData = [...tempCabang];
    newData[idx] = { ...newData[idx], [field]: value };
    setTempCabang(newData);
  }

  const inputClass = "w-full border border-slate-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white";

  return (
    <div className="space-y-6">
      
      {/* Header Info */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-800">Jadwal Distribusi Seragam</h2>
              <p className="text-slate-600 font-medium">OB & MES Indomobil Finance</p>
              <p className="text-sm text-slate-500">Periode 25 Agustus & 10 September</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                <Shirt className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-500">Total Distribusi</p>
                <p className="text-2xl font-bold text-slate-800">{totalSeragam} Pcs</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Complex Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-slate-100">
          <CardTitle>Data Distribusi per Tanggal</CardTitle>
          {isEditingBulan ? (
            <div className="flex items-center gap-2">
              <button onClick={handleCancelBulan} className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 px-3 py-1.5 rounded-md text-sm font-medium transition-colors">
                <X className="h-4 w-4" /> Batal
              </button>
              <button onClick={handleSaveBulan} className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white border border-emerald-600 px-3 py-1.5 rounded-md text-sm font-medium transition-colors shadow-sm">
                <Save className="h-4 w-4" /> Simpan
              </button>
            </div>
          ) : (
            <button onClick={() => setIsEditingBulan(true)} className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 px-3 py-1.5 rounded-md text-sm font-medium transition-colors">
              <Pencil className="h-4 w-4" />
              Edit Data
            </button>
          )}
        </CardHeader>
        <CardContent className="pt-6">
          <div className="overflow-hidden rounded-lg border border-slate-200 shadow-sm">
            <table className="w-full text-sm text-left">
              <thead className="text-slate-700">
                <tr>
                  <th rowSpan={3} className="border-b border-r border-slate-200 p-4 text-center font-bold bg-sky-100 w-16">NO</th>
                  <th rowSpan={3} className="border-b border-r border-slate-200 p-4 font-bold bg-sky-100">JENIS PAKAIAN</th>
                  <th colSpan={3} className="border-b border-r border-slate-200 p-2 text-center font-bold bg-yellow-300">BULAN</th>
                  <th rowSpan={3} className="border-b border-slate-200 p-4 text-center font-bold bg-indigo-100 w-24">JUMLAH</th>
                </tr>
                <tr>
                  <th className="border-b border-r border-slate-200 p-2 text-center font-bold bg-emerald-300/80">AGUSTUS</th>
                  <th colSpan={2} className="border-b border-r border-slate-200 p-2 text-center font-bold bg-emerald-300/80">SEPTEMBER</th>
                </tr>
                <tr>
                  <th className="border-b border-r border-slate-200 p-2 text-center font-bold bg-amber-400/80 w-28">25</th>
                  <th className="border-b border-r border-slate-200 p-2 text-center font-bold bg-amber-400/80 w-28">8</th>
                  <th className="border-b border-r border-slate-200 p-2 text-center font-bold bg-amber-400/80 w-28">10,13</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {tempBulan.map((row, idx) => {
                  const rowTotal = row.agustus25 + row.sep8 + row.sep10_13;
                  return (
                    <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 text-center border-r border-slate-200">{row.id}</td>
                      <td className="p-3 border-r border-slate-200 font-medium">
                        {isEditingBulan ? <input type="text" className={inputClass} value={row.jenis} onChange={(e) => handleChangeBulan(idx, 'jenis', e.target.value)} /> : row.jenis}
                      </td>
                      <td className="p-3 text-center border-r border-slate-200">
                        {isEditingBulan ? <input type="number" className={inputClass} value={row.agustus25} onChange={(e) => handleChangeBulan(idx, 'agustus25', Number(e.target.value))} /> : row.agustus25}
                      </td>
                      <td className="p-3 text-center border-r border-slate-200">
                        {isEditingBulan ? <input type="number" className={inputClass} value={row.sep8} onChange={(e) => handleChangeBulan(idx, 'sep8', Number(e.target.value))} /> : row.sep8}
                      </td>
                      <td className="p-3 text-center border-r border-slate-200">
                        {isEditingBulan ? <input type="number" className={inputClass} value={row.sep10_13} onChange={(e) => handleChangeBulan(idx, 'sep10_13', Number(e.target.value))} /> : row.sep10_13}
                      </td>
                      <td className="p-3 text-center font-bold text-slate-800 bg-slate-50">{rowTotal}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Grid for Cabang Chart and Table */}
      <div className="grid gap-6 lg:grid-cols-2">
        
        {/* Cabang Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Distribusi per Cabang</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={jadwalSeragamCabang} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" />
                  <YAxis dataKey="cabang" type="category" width={100} tick={{ fontSize: 12, fill: '#475569' }} />
                  <Tooltip cursor={{ fill: '#f1f5f9' }} />
                  <Bar dataKey="jumlah" fill="#10b981" radius={[0, 4, 4, 0]} barSize={24} name="Jumlah Pakaian" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Cabang Table Raw */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle>Data Raw: Rincian Cabang</CardTitle>
            {isEditingCabang ? (
              <div className="flex items-center gap-2">
                <button onClick={handleCancelCabang} className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 px-3 py-1.5 rounded-md text-sm font-medium transition-colors">
                  <X className="h-4 w-4" /> Batal
                </button>
                <button onClick={handleSaveCabang} className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white border border-emerald-600 px-3 py-1.5 rounded-md text-sm font-medium transition-colors shadow-sm">
                  <Save className="h-4 w-4" /> Simpan
                </button>
              </div>
            ) : (
              <button onClick={() => setIsEditingCabang(true)} className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 px-3 py-1.5 rounded-md text-sm font-medium transition-colors">
                <Pencil className="h-4 w-4" />
                Edit Data
              </button>
            )}
          </CardHeader>
          <CardContent>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-emerald-100 hover:bg-emerald-100/80">
                    <TableHead className="font-bold text-slate-800">CABANG</TableHead>
                    <TableHead className="text-right font-bold text-slate-800 w-32 border-l border-emerald-200">JUMLAH</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tempCabang.map((row, idx) => (
                    <TableRow key={row.id}>
                      <TableCell className="font-medium">
                        {isEditingCabang ? <input type="text" className={inputClass} value={row.cabang} onChange={(e) => handleChangeCabang(idx, 'cabang', e.target.value)} /> : row.cabang}
                      </TableCell>
                      <TableCell className="text-right border-l border-slate-200">
                        {isEditingCabang ? <input type="number" className={inputClass} value={row.jumlah} onChange={(e) => handleChangeCabang(idx, 'jumlah', Number(e.target.value))} /> : row.jumlah}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-slate-50">
                    <TableCell className="font-bold">TOTAL KESELURUHAN</TableCell>
                    <TableCell className="text-right font-bold border-l border-slate-200 text-lg">
                      {tempCabang.reduce((acc, curr) => acc + curr.jumlah, 0)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
