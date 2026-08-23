import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/Card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/Table";
import { formatRupiah } from "../utils";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Pencil, Save, X } from "lucide-react";
import { useData } from "../DataContext";

export function Segmen4() {
  const { pengeluaranKendaraanBulanan, setPengeluaranKendaraanBulanan, pengeluaranMobilData, setPengeluaranMobilData } = useData();
  
  const [isEditingBulanan, setIsEditingBulanan] = useState(false);
  const [tempBulanan, setTempBulanan] = useState(pengeluaranKendaraanBulanan);
  useEffect(() => { setTempBulanan(pengeluaranKendaraanBulanan); }, [pengeluaranKendaraanBulanan]);

  const [isEditingMobil, setIsEditingMobil] = useState(false);
  const [tempMobil, setTempMobil] = useState(pengeluaranMobilData);
  useEffect(() => { setTempMobil(pengeluaranMobilData); }, [pengeluaranMobilData]);

  const totalKendaraan = pengeluaranKendaraanBulanan.reduce((acc, curr) => acc + curr.total, 0);

  const handleSaveBulanan = () => { setPengeluaranKendaraanBulanan(tempBulanan); setIsEditingBulanan(false); }
  const handleCancelBulanan = () => { setTempBulanan(pengeluaranKendaraanBulanan); setIsEditingBulanan(false); }
  const handleChangeBulanan = (idx: number, field: string, value: string | number) => {
    const newData = [...tempBulanan];
    newData[idx] = { ...newData[idx], [field]: value };
    setTempBulanan(newData);
  }

  const handleSaveMobil = () => { setPengeluaranMobilData(tempMobil); setIsEditingMobil(false); }
  const handleCancelMobil = () => { setTempMobil(pengeluaranMobilData); setIsEditingMobil(false); }
  const handleChangeMobil = (idx: number, field: string, value: string | number) => {
    const newData = [...tempMobil];
    newData[idx] = { ...newData[idx], [field]: value };
    setTempMobil(newData);
  }

  const inputClass = "w-full border border-slate-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white";

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-slate-500">Total Pengeluaran Kendaraan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{formatRupiah(totalKendaraan)}</div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Tren Pengeluaran Bulanan</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 mb-6 text-sm">
              Terdapat fluktuasi yang signifikan pada biaya operasional. Ini sejalan dengan jadwal maintenance besar berkala (Tune up & Spoor/Balancing).
            </p>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={pengeluaranKendaraanBulanan} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="bulan" tick={{ fontSize: 12 }} />
                  <YAxis hide />
                  <Tooltip formatter={(value: number) => formatRupiah(value)} />
                  <Line type="monotone" dataKey="total" stroke="#f43f5e" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pengeluaran Berdasarkan Jenis Kendaraan</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 mb-6 text-sm">
              <strong>Paliside</strong> dan <strong>Innova</strong> secara konsisten memakan biaya operasional dan maintenance tertinggi dibanding unit kendaraan lainnya.
            </p>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={pengeluaranMobilData} layout="vertical" margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" hide />
                  <YAxis dataKey="nama" type="category" tick={{ fontSize: 12 }} width={80} />
                  <Tooltip formatter={(value: number) => formatRupiah(value)} />
                  <Bar dataKey="total" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle>Data Raw: Pengeluaran Bulanan</CardTitle>
            {isEditingBulanan ? (
              <div className="flex items-center gap-2">
                <button onClick={handleCancelBulanan} className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 px-3 py-1.5 rounded-md text-sm font-medium transition-colors">
                  <X className="h-4 w-4" /> Batal
                </button>
                <button onClick={handleSaveBulanan} className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white border border-emerald-600 px-3 py-1.5 rounded-md text-sm font-medium transition-colors shadow-sm">
                  <Save className="h-4 w-4" /> Simpan
                </button>
              </div>
            ) : (
              <button onClick={() => setIsEditingBulanan(true)} className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 px-3 py-1.5 rounded-md text-sm font-medium transition-colors">
                <Pencil className="h-4 w-4" />
                Edit Data
              </button>
            )}
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bulan</TableHead>
                  <TableHead className="text-right">Total Pengeluaran</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tempBulanan.map((row, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">{isEditingBulanan ? <input type="text" className={inputClass} value={row.bulan} onChange={(e) => handleChangeBulanan(idx, 'bulan', e.target.value)} /> : row.bulan}</TableCell>
                    <TableCell className="text-right">{isEditingBulanan ? <input type="number" className={inputClass} value={row.total} onChange={(e) => handleChangeBulanan(idx, 'total', Number(e.target.value))} /> : formatRupiah(row.total)}</TableCell>
                  </TableRow>
                ))}
                <TableRow className="bg-slate-50 font-bold border-t-2 border-slate-300">
                  <TableCell className="text-center uppercase text-slate-800">Jumlah Total</TableCell>
                  <TableCell className="text-right text-slate-800">{formatRupiah(tempBulanan.reduce((acc, curr) => acc + curr.total, 0))}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle>Data Raw: Pengeluaran per Unit Mobil</CardTitle>
            {isEditingMobil ? (
              <div className="flex items-center gap-2">
                <button onClick={handleCancelMobil} className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 px-3 py-1.5 rounded-md text-sm font-medium transition-colors">
                  <X className="h-4 w-4" /> Batal
                </button>
                <button onClick={handleSaveMobil} className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white border border-emerald-600 px-3 py-1.5 rounded-md text-sm font-medium transition-colors shadow-sm">
                  <Save className="h-4 w-4" /> Simpan
                </button>
              </div>
            ) : (
              <button onClick={() => setIsEditingMobil(true)} className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 px-3 py-1.5 rounded-md text-sm font-medium transition-colors">
                <Pencil className="h-4 w-4" />
                Edit Data
              </button>
            )}
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Jenis Kendaraan</TableHead>
                  <TableHead className="text-right">Total Pengeluaran</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tempMobil.map((row, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">{isEditingMobil ? <input type="text" className={inputClass} value={row.nama} onChange={(e) => handleChangeMobil(idx, 'nama', e.target.value)} /> : row.nama}</TableCell>
                    <TableCell className="text-right">{isEditingMobil ? <input type="number" className={inputClass} value={row.total} onChange={(e) => handleChangeMobil(idx, 'total', Number(e.target.value))} /> : formatRupiah(row.total)}</TableCell>
                  </TableRow>
                ))}
                <TableRow className="bg-slate-50 font-bold border-t-2 border-slate-300">
                  <TableCell className="text-center uppercase text-slate-800">Jumlah Total</TableCell>
                  <TableCell className="text-right text-slate-800">{formatRupiah(tempMobil.reduce((acc, curr) => acc + curr.total, 0))}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
