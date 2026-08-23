import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/Card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/Table";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { Pencil, Save, X } from "lucide-react";
import { useData } from "../DataContext";

export function Segmen2() {
  const { analisaHTData, setAnalisaHTData } = useData();
  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState(analisaHTData);

  useEffect(() => { setTempData(analisaHTData); }, [analisaHTData]);

  const totalService = analisaHTData.reduce((acc, curr) => acc + curr.service, 0);
  const totalBelum = analisaHTData.reduce((acc, curr) => acc + curr.belum, 0);
  const totalBaik = analisaHTData.reduce((acc, curr) => acc + curr.baik, 0);
  const totalRusak = analisaHTData.reduce((acc, curr) => acc + curr.rusak, 0);

  const statusServiceData = [
    { name: 'Sudah Service', value: totalService, color: '#3b82f6' },
    { name: 'Belum Service', value: totalBelum, color: '#f59e0b' },
  ];

  const kondisiData = [
    { name: 'Kondisi Baik', value: totalBaik, color: '#10b981' },
    { name: 'Kondisi Rusak', value: totalRusak, color: '#ef4444' },
  ];

  const handleSave = () => { setAnalisaHTData(tempData); setIsEditing(false); }
  const handleCancel = () => { setTempData(analisaHTData); setIsEditing(false); }
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
          <CardHeader>
            <CardTitle>Riwayat Service HT</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={statusServiceData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {statusServiceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Kondisi HT</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={kondisiData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {kondisiData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Analisa Data HT (Handy Talkie)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600 mb-6">
            Dari total {analisaHTData.reduce((acc, curr) => acc + curr.ht, 0)} unit Handy Talkie (HT), mayoritas berada dalam kondisi <strong>Baik</strong>. Namun, perhatian khusus perlu diberikan pada aspek pemeliharaan karena sebagian besar unit HT belum pernah diservice.
            Plant JAYANTI 3 mencatatkan unit terbanyak. Perlu penjadwalan service berkala segera untuk meminimalisir kerusakan unit lebih lanjut.
          </p>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analisaHTData} margin={{ top: 20, right: 30, left: 0, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="plant" angle={-45} textAnchor="end" height={80} tick={{ fontSize: 11 }} />
                <YAxis />
                <Tooltip />
                <Legend verticalAlign="top" height={36}/>
                <Bar dataKey="baik" name="Kondisi Baik" fill="#10b981" stackId="a" />
                <Bar dataKey="rusak" name="Kondisi Rusak" fill="#ef4444" stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle>Data Raw: Analisa Handy Talkie (HT)</CardTitle>
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
                <TableHead>Plant</TableHead>
                <TableHead className="text-right">Jumlah HT</TableHead>
                <TableHead className="text-right">Service</TableHead>
                <TableHead className="text-right">Belum Service</TableHead>
                <TableHead className="text-right">Kondisi Baik</TableHead>
                <TableHead className="text-right">Kondisi Rusak</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tempData.map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium">{isEditing ? <input type="text" className={inputClass} value={row.plant} onChange={(e) => handleChange(idx, 'plant', e.target.value)} /> : row.plant}</TableCell>
                  <TableCell className="text-right">{isEditing ? <input type="number" className={inputClass} value={row.ht} onChange={(e) => handleChange(idx, 'ht', Number(e.target.value))} /> : row.ht}</TableCell>
                  <TableCell className="text-right">{isEditing ? <input type="number" className={inputClass} value={row.service} onChange={(e) => handleChange(idx, 'service', Number(e.target.value))} /> : row.service}</TableCell>
                  <TableCell className="text-right">{isEditing ? <input type="number" className={inputClass} value={row.belum} onChange={(e) => handleChange(idx, 'belum', Number(e.target.value))} /> : row.belum}</TableCell>
                  <TableCell className="text-right text-emerald-600">{isEditing ? <input type="number" className={inputClass} value={row.baik} onChange={(e) => handleChange(idx, 'baik', Number(e.target.value))} /> : row.baik}</TableCell>
                  <TableCell className="text-right text-red-600">{isEditing ? <input type="number" className={inputClass} value={row.rusak} onChange={(e) => handleChange(idx, 'rusak', Number(e.target.value))} /> : row.rusak}</TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-slate-50 font-bold border-t-2 border-slate-300">
                <TableCell className="text-center uppercase text-slate-800">Jumlah Total</TableCell>
                <TableCell className="text-right text-slate-800">{tempData.reduce((acc, curr) => acc + curr.ht, 0)}</TableCell>
                <TableCell className="text-right text-slate-800">{tempData.reduce((acc, curr) => acc + curr.service, 0)}</TableCell>
                <TableCell className="text-right text-slate-800">{tempData.reduce((acc, curr) => acc + curr.belum, 0)}</TableCell>
                <TableCell className="text-right text-emerald-600">{tempData.reduce((acc, curr) => acc + curr.baik, 0)}</TableCell>
                <TableCell className="text-right text-red-600">{tempData.reduce((acc, curr) => acc + curr.rusak, 0)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
