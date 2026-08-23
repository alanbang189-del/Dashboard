import React, { createContext, useContext, useState } from 'react';
import * as initialData from './data';

type DataContextType = {
  distribusiData: typeof initialData.distribusiData;
  setDistribusiData: React.Dispatch<React.SetStateAction<typeof initialData.distribusiData>>;
  analisaHTData: typeof initialData.analisaHTData;
  setAnalisaHTData: React.Dispatch<React.SetStateAction<typeof initialData.analisaHTData>>;
  pengeluaranATKData: typeof initialData.pengeluaranATKData;
  setPengeluaranATKData: React.Dispatch<React.SetStateAction<typeof initialData.pengeluaranATKData>>;
  pengeluaranKendaraanBulanan: typeof initialData.pengeluaranKendaraanBulanan;
  setPengeluaranKendaraanBulanan: React.Dispatch<React.SetStateAction<typeof initialData.pengeluaranKendaraanBulanan>>;
  pengeluaranMobilData: typeof initialData.pengeluaranMobilData;
  setPengeluaranMobilData: React.Dispatch<React.SetStateAction<typeof initialData.pengeluaranMobilData>>;
  paketData: typeof initialData.paketData;
  setPaketData: React.Dispatch<React.SetStateAction<typeof initialData.paketData>>;
  hargaHTData: typeof initialData.hargaHTData;
  setHargaHTData: React.Dispatch<React.SetStateAction<typeof initialData.hargaHTData>>;
  statusVendorData: typeof initialData.statusVendorData;
  setStatusVendorData: React.Dispatch<React.SetStateAction<typeof initialData.statusVendorData>>;
  detailBelumLunasData: typeof initialData.detailBelumLunasData;
  setDetailBelumLunasData: React.Dispatch<React.SetStateAction<typeof initialData.detailBelumLunasData>>;
  jadwalSeragamBulan: typeof initialData.jadwalSeragamBulan;
  setJadwalSeragamBulan: React.Dispatch<React.SetStateAction<typeof initialData.jadwalSeragamBulan>>;
  jadwalSeragamCabang: typeof initialData.jadwalSeragamCabang;
  setJadwalSeragamCabang: React.Dispatch<React.SetStateAction<typeof initialData.jadwalSeragamCabang>>;
  jadwalBiayaHT: typeof initialData.jadwalBiayaHT;
  setJadwalBiayaHT: React.Dispatch<React.SetStateAction<typeof initialData.jadwalBiayaHT>>;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [distribusiData, setDistribusiData] = useState(initialData.distribusiData);
  const [analisaHTData, setAnalisaHTData] = useState(initialData.analisaHTData);
  const [pengeluaranATKData, setPengeluaranATKData] = useState(initialData.pengeluaranATKData);
  const [pengeluaranKendaraanBulanan, setPengeluaranKendaraanBulanan] = useState(initialData.pengeluaranKendaraanBulanan);
  const [pengeluaranMobilData, setPengeluaranMobilData] = useState(initialData.pengeluaranMobilData);
  const [paketData, setPaketData] = useState(initialData.paketData);
  const [hargaHTData, setHargaHTData] = useState(initialData.hargaHTData);
  const [statusVendorData, setStatusVendorData] = useState(initialData.statusVendorData);
  const [detailBelumLunasData, setDetailBelumLunasData] = useState(initialData.detailBelumLunasData);
  const [jadwalSeragamBulan, setJadwalSeragamBulan] = useState(initialData.jadwalSeragamBulan);
  const [jadwalSeragamCabang, setJadwalSeragamCabang] = useState(initialData.jadwalSeragamCabang);
  const [jadwalBiayaHT, setJadwalBiayaHT] = useState(initialData.jadwalBiayaHT);

  return (
    <DataContext.Provider value={{
      distribusiData, setDistribusiData,
      analisaHTData, setAnalisaHTData,
      pengeluaranATKData, setPengeluaranATKData,
      pengeluaranKendaraanBulanan, setPengeluaranKendaraanBulanan,
      pengeluaranMobilData, setPengeluaranMobilData,
      paketData, setPaketData,
      hargaHTData, setHargaHTData,
      statusVendorData, setStatusVendorData,
      detailBelumLunasData, setDetailBelumLunasData,
      jadwalSeragamBulan, setJadwalSeragamBulan,
      jadwalSeragamCabang, setJadwalSeragamCabang,
      jadwalBiayaHT, setJadwalBiayaHT
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData must be used within a DataProvider");
  return context;
}
