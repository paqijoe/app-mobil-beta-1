// @ts-nocheck
import React, { useState, useEffect } from 'react';

const CarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a2 2 0 0 0-1.6-.8H8.3a2 2 0 0 0-1.6.8L4 11l-5.16.86a1 1 0 0 0-.84.99V16h3m10 0a2 2 0 1 1-4 0m4 0a2 2 0 1 0-4 0m-10 0a2 2 0 1 1-4 0m4 0a2 2 0 1 0-4 0"/></svg>
);
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);
const LogOutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
);
const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
);
const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
);
const WrenchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
);
const AlertIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
);
const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
);

const initialCars = [
  { 
    id: 1, 
    name: 'Daihatsu Luxio', 
    plate: 'BE 1234 YAY', 
    capacity: 8, 
    status: 'Tersedia',
    currentKm: 126500, 
    lastOilChangeKm: 120000, 
    lastOilChangeDate: '2025-10-15', 
    lastOilBrand: 'Pertamina Fastron 10W-40',
    oilChangeLimitKm: 5000, 
    oilChangeLimitMonths: 6 
  },
];

const initialRequests = [];

const OPT_PENUMPANG = [
  "Yayasan - Pengurus", "Yayasan - Staff", "Guru/Staff/Murid - SMPIT", 
  "Guru/Staff/Murid - SDIT", "Guru/Staff/Murid - TKIT", 
  "Pemakaian Pribadi - Internal Yayasan", "Pemakaian Pribadi - Umum"
];

const OPT_LOKASI = ["Garasi Pak Supri", "Garasi Pak Rahmat", "Lainnya"];
const OPT_KERUSAKAN = ["Tertabrak", "Ditabrak", "Terserempet", "Lainnya"];

const Badge = ({ status }) => {
  let color = 'bg-gray-100 text-gray-800';
  if (status === 'Selesai') color = 'bg-green-100 text-green-800';
  if (status === 'Booking') color = 'bg-blue-100 text-blue-800';

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${color}`}>
      {status}
    </span>
  );
};

const checkMaintenanceStatus = (car) => {
  const { currentKm, lastOilChangeKm, lastOilChangeDate, oilChangeLimitKm, oilChangeLimitMonths } = car;
  
  const nextOilKm = lastOilChangeKm + oilChangeLimitKm;
  const kmExceeded = currentKm - nextOilKm;
  const isKmWarning = kmExceeded > 0;

  const lastDate = new Date(lastOilChangeDate);
  const limitDate = new Date(lastDate);
  limitDate.setMonth(limitDate.getMonth() + oilChangeLimitMonths);
  
  const now = new Date();
  const isDateWarning = now > limitDate;
  
  let dateWarningText = "";
  if (isDateWarning) {
    let tempDate = new Date(limitDate);
    let monthsExceeded = 0;
    
    while (true) {
      let nextMonth = new Date(tempDate);
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      if (nextMonth <= now) {
        monthsExceeded++;
        tempDate = nextMonth;
      } else {
        break;
      }
    }
    const daysExceeded = Math.floor((now.getTime() - tempDate.getTime()) / (1000 * 60 * 60 * 24));
    
    let textParts = [];
    if (monthsExceeded > 0) textParts.push(`${monthsExceeded} bulan`);
    if (daysExceeded > 0) textParts.push(`${daysExceeded} hari`);
    
    dateWarningText = textParts.length > 0 ? textParts.join(" ") : "beberapa hari";
  }

  return {
    nextOilKm,
    kmExceeded,
    isKmWarning,
    limitDateStr: limitDate.toISOString().split('T')[0],
    isDateWarning,
    dateWarningText
  };
};

export default function App() {
  const [role, setRole] = useState(null);
  const [cars, setCars] = useState(initialCars);
  const [requests, setRequests] = useState(initialRequests);
  const [activeTab, setActiveTab] = useState('dashboard');

  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showOilModal, setShowOilModal] = useState(false);
  const [showCarModal, setShowCarModal] = useState(false);
  
  const [selectedCar, setSelectedCar] = useState(null);
  const [activeRequest, setActiveRequest] = useState(null);
  const [editingCar, setEditingCar] = useState(null);
  
  const [newReq, setNewReq] = useState({ 
    pengaju: '', driver: '', tujuan: '', alamat: '', 
    penumpang: OPT_PENUMPANG[0], tglMulai: '', bensinAwal: '8', 
    lokasiAmbil: OPT_LOKASI[0], lokasiAmbilLainnya: '' 
  });

  const [newReport, setNewReport] = useState({
    tglSelesai: '', adaKerusakan: 'Tidak', jenisKerusakan: OPT_KERUSAKAN[0], kerusakanLainnya: '',
    isiBensin: 'Tidak', bensinAkhir: '8', kilometer: '',
    lokasiKembali: OPT_LOKASI[0], lokasiKembaliLainnya: '',
    interiorDibersihkan: 'Sudah', barangTertinggal: '-', kondisiKebersihan: 'Bersih'
  });

  const [newOilData, setNewOilData] = useState({ 
    date: new Date().toISOString().split('T')[0], 
    km: '', brand: '', limitKm: 5000, limitMonths: 6 
  });

  const [carFormData, setCarFormData] = useState({
    name: '', plate: '', capacity: 8, currentKm: 0, status: 'Beroperasi'
  });

  const handleLogin = (selectedRole) => {
    setRole(selectedRole);
    setActiveTab(selectedRole === 'admin' ? 'maintenance' : 'available-cars');
  };

  const handleLogout = () => setRole(null);

  const handleSubmitRequest = (e) => {
    e.preventDefault();
    const finalLokasiAmbil = newReq.lokasiAmbil === 'Lainnya' ? newReq.lokasiAmbilLainnya : newReq.lokasiAmbil;
    
    const request = {
      id: Date.now(),
      carId: selectedCar.id,
      carName: selectedCar.name,
      status: 'Booking',
      reqData: { ...newReq, lokasiAmbil: finalLokasiAmbil }, 
      reportData: null 
    };
    
    setRequests([request, ...requests]);
    setNewReq({ 
      pengaju: '', driver: '', tujuan: '', alamat: '', 
      penumpang: OPT_PENUMPANG[0], tglMulai: '', bensinAwal: '8', 
      lokasiAmbil: OPT_LOKASI[0], lokasiAmbilLainnya: '' 
    });
    setShowRequestModal(false);
    setActiveTab('my-requests');
  };

  const openReportModal = (req) => {
    setActiveRequest(req);
    setShowReportModal(true);
  };

  const handleSubmitReport = (e) => {
    e.preventDefault();
    
    const finalLokasiKembali = newReport.lokasiKembali === 'Lainnya' ? newReport.lokasiKembaliLainnya : newReport.lokasiKembali;
    let finalKerusakan = 'Tidak Ada';
    if (newReport.adaKerusakan === 'Ya') {
        finalKerusakan = newReport.jenisKerusakan === 'Lainnya' ? newReport.kerusakanLainnya : newReport.jenisKerusakan;
    }

    const processedReport = {
        ...newReport,
        lokasiKembali: finalLokasiKembali,
        detailKerusakan: finalKerusakan
    };

    setRequests(requests.map(req => 
      req.id === activeRequest.id 
        ? { ...req, status: 'Selesai', reportData: processedReport } 
        : req
    ));

    const reportedKm = parseInt(newReport.kilometer, 10);
    if (!isNaN(reportedKm)) {
      setCars(cars.map(c => 
        c.id === activeRequest.carId
          ? { ...c, currentKm: Math.max(c.currentKm, reportedKm) }
          : c
      ));
    }
    
    setShowReportModal(false);
    setActiveRequest(null);
    setNewReport({
      tglSelesai: '', adaKerusakan: 'Tidak', jenisKerusakan: OPT_KERUSAKAN[0], kerusakanLainnya: '',
      isiBensin: 'Tidak', bensinAkhir: '8', kilometer: '',
      lokasiKembali: OPT_LOKASI[0], lokasiKembaliLainnya: '',
      interiorDibersihkan: 'Sudah', barangTertinggal: '-', kondisiKebersihan: 'Bersih'
    });
  };

  const handleUpdateOil = (e) => {
    e.preventDefault();
    setCars(cars.map(c => 
      c.id === selectedCar.id
        ? { 
            ...c, 
            lastOilChangeKm: parseInt(newOilData.km, 10), 
            lastOilChangeDate: newOilData.date,
            currentKm: Math.max(c.currentKm, parseInt(newOilData.km, 10)),
            lastOilBrand: newOilData.brand,
            oilChangeLimitKm: parseInt(newOilData.limitKm, 10),
            oilChangeLimitMonths: parseInt(newOilData.limitMonths, 10)
          }
        : c
    ));
    setShowOilModal(false);
  };

  const openAddCarModal = () => {
    setEditingCar(null);
    setCarFormData({ name: '', plate: '', capacity: 8, currentKm: 0, status: 'Beroperasi' });
    setShowCarModal(true);
  };

  const openEditCarModal = (car) => {
    setEditingCar(car);
    setCarFormData({
      name: car.name, plate: car.plate, capacity: car.capacity,
      currentKm: car.currentKm, status: car.status || 'Beroperasi'
    });
    setShowCarModal(true);
  };

  const handleSaveCar = (e) => {
    e.preventDefault();
    const kmParsed = parseInt(carFormData.currentKm, 10) || 0;
    const capacityParsed = parseInt(carFormData.capacity, 10) || 1;

    if (editingCar) {
      setCars(cars.map(c => c.id === editingCar.id ? { 
        ...c, ...carFormData, currentKm: kmParsed, capacity: capacityParsed 
      } : c));
    } else {
      const newCar = {
        ...carFormData,
        id: Date.now(), currentKm: kmParsed, capacity: capacityParsed,
        lastOilChangeKm: kmParsed, lastOilChangeDate: new Date().toISOString().split('T')[0],
        lastOilBrand: '-', oilChangeLimitKm: 5000, oilChangeLimitMonths: 6
      };
      setCars([...cars, newCar]);
    }
    setShowCarModal(false);
  };

  const openDetailModal = (req) => {
    setActiveRequest(req);
    setShowDetailModal(true);
  };

  if (!role) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-indigo-600 p-6 text-center text-white">
            <div className="flex justify-center mb-4"><CarIcon /></div>
            <h1 className="text-2xl font-bold">Portal Kendaraan Yayasan</h1>
            <p className="text-indigo-100 mt-2 text-sm">Pilih peran Anda untuk masuk ke sistem</p>
          </div>
          <div className="p-6 space-y-4">
            <button onClick={() => handleLogin('user')} className="w-full flex items-center justify-center gap-3 bg-white border-2 border-indigo-100 hover:border-indigo-600 hover:bg-indigo-50 text-indigo-700 font-semibold py-4 px-6 rounded-xl transition-all">
              <UserIcon /> Masuk sebagai Pengguna
            </button>
            <button onClick={() => handleLogin('admin')} className="w-full flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-6 rounded-xl transition-all shadow-md">
              <CarIcon /> Masuk sebagai Penanggung Jawab
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans pb-20">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-600">
            <CarIcon />
            <span className="font-bold text-lg hidden sm:block">Mobil Yayasan</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium bg-gray-100 px-3 py-1.5 rounded-full text-gray-700">
              {role === 'admin' ? '👋 PJ Kendaraan' : '👋 Pengguna'}
            </span>
            <button onClick={handleLogout} className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors" title="Keluar">
              <LogOutIcon />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Tab Navigasi */}
        <div className="flex space-x-1 bg-gray-200/50 p-1 rounded-xl mb-8 overflow-x-auto">
          {role === 'admin' ? (
            <>
              <button onClick={() => setActiveTab('maintenance')} className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${activeTab === 'maintenance' ? 'bg-white shadow text-indigo-700' : 'text-gray-600 hover:text-gray-900'}`}>Status & Perawatan</button>
              <button onClick={() => setActiveTab('history')} className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${activeTab === 'history' ? 'bg-white shadow text-indigo-700' : 'text-gray-600 hover:text-gray-900'}`}>Semua Riwayat</button>
            </>
          ) : (
            <>
              <button onClick={() => setActiveTab('available-cars')} className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${activeTab === 'available-cars' ? 'bg-white shadow text-indigo-700' : 'text-gray-600 hover:text-gray-900'}`}>Booking</button>
              <button onClick={() => setActiveTab('global-history')} className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${activeTab === 'global-history' ? 'bg-white shadow text-indigo-700' : 'text-gray-600 hover:text-gray-900'}`}>Jadwal Global</button>
              <button onClick={() => setActiveTab('my-requests')} className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${activeTab === 'my-requests' ? 'bg-white shadow text-indigo-700' : 'text-gray-600 hover:text-gray-900'}`}>Peminjaman Saya</button>
            </>
          )}
        </div>

        {role === 'admin' && activeTab === 'maintenance' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">Status & Perawatan Kendaraan</h2>
              <button onClick={openAddCarModal} className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center gap-2 shadow-sm text-sm">
                <PlusIcon /> Tambah Mobil
              </button>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {cars.map(car => {
                const maintStatus = checkMaintenanceStatus(car);
                return (
                  <div key={car.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative">
                      <div className="absolute top-4 right-4 md:static">
                        <button onClick={() => openEditCarModal(car)} className="flex items-center gap-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 py-1.5 px-3 rounded-md font-medium transition-colors border border-gray-200">
                          <EditIcon /> Edit Info
                        </button>
                      </div>
                      <div className="mt-6 md:mt-0">
                        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                          {car.name} 
                          {car.status !== 'Beroperasi' && car.status && (
                            <span className="text-xs px-2.5 py-1 bg-red-100 text-red-700 rounded-full font-medium">{car.status}</span>
                          )}
                        </h3>
                        <p className="text-gray-500 font-mono">{car.plate} &bull; Kapasitas: {car.capacity} Org</p>
                      </div>
                      <div className="text-left md:text-right w-full md:w-auto mt-2 md:mt-0 bg-gray-50 md:bg-transparent p-3 md:p-0 rounded-lg border md:border-0 border-gray-100">
                        <p className="text-sm text-gray-500">Kilometer Saat Ini</p>
                        <p className="text-2xl font-bold text-indigo-700">{car.currentKm.toLocaleString('id-ID')} KM</p>
                      </div>
                    </div>
                    
                    <div className="p-6 bg-gray-50 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className={`p-4 rounded-xl border ${maintStatus.isKmWarning ? 'bg-red-50 border-red-200' : 'bg-white border-gray-200 shadow-sm'}`}>
                         <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2"><WrenchIcon /> Jadwal Oli (Jarak)</h4>
                         <div className="space-y-2 text-sm">
                           <p className="flex justify-between"><span className="text-gray-600">Merk Oli:</span> <span className="font-medium text-right">{car.lastOilBrand || '-'}</span></p>
                           <p className="flex justify-between"><span className="text-gray-600">Terakhir Ganti:</span> <span className="font-medium">{car.lastOilChangeKm.toLocaleString('id-ID')} KM</span></p>
                           <p className="flex justify-between"><span className="text-gray-600">Batas Maksimal:</span> <span className="font-medium">{maintStatus.nextOilKm.toLocaleString('id-ID')} KM</span></p>
                         </div>
                         {maintStatus.isKmWarning && (
                           <div className="mt-4 flex items-start gap-2 text-red-700 text-sm font-medium p-3 bg-red-100 rounded-lg">
                             <AlertIcon />
                             <p>Melebihi batas ganti oli sejauh <b>{maintStatus.kmExceeded.toLocaleString('id-ID')} KM</b>.</p>
                           </div>
                         )}
                      </div>

                      <div className={`p-4 rounded-xl border ${maintStatus.isDateWarning ? 'bg-red-50 border-red-200' : 'bg-white border-gray-200 shadow-sm'}`}>
                         <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2"><WrenchIcon /> Jadwal Oli (Waktu)</h4>
                         <div className="space-y-2 text-sm">
                           <p className="flex justify-between"><span className="text-gray-600">Merk Oli:</span> <span className="font-medium text-right">{car.lastOilBrand || '-'}</span></p>
                           <p className="flex justify-between"><span className="text-gray-600">Terakhir Ganti:</span> <span className="font-medium">{car.lastOilChangeDate}</span></p>
                           <p className="flex justify-between"><span className="text-gray-600">Batas Maksimal:</span> <span className="font-medium">{maintStatus.limitDateStr} ({car.oilChangeLimitMonths} bln)</span></p>
                         </div>
                         {maintStatus.isDateWarning && (
                           <div className="mt-4 flex items-start gap-2 text-red-700 text-sm font-medium p-3 bg-red-100 rounded-lg">
                             <AlertIcon />
                             <p>Melewati batas waktu selama <b>{maintStatus.dateWarningText}</b>.</p>
                           </div>
                         )}
                      </div>
                    </div>
                    
                    <div className="p-4 bg-white border-t border-gray-100 flex justify-end">
                      <button onClick={() => { setSelectedCar(car); setNewOilData({ date: new Date().toISOString().split('T')[0], km: car.currentKm, brand: car.lastOilBrand || '', limitKm: car.oilChangeLimitKm || 5000, limitMonths: car.oilChangeLimitMonths || 6 }); setShowOilModal(true); }} className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-5 rounded-lg transition-colors flex items-center gap-2 shadow-sm">
                        <PlusIcon /> Catat Ganti Oli Baru
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {role === 'admin' && activeTab === 'history' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-800">Semua Riwayat Peminjaman</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-600 text-sm">
                    <th className="p-4 border-b">Tgl Mulai</th>
                    <th className="p-4 border-b">Pengaju & Driver</th>
                    <th className="p-4 border-b">Mobil & Tujuan</th>
                    <th className="p-4 border-b">Status</th>
                    <th className="p-4 border-b">Aksi</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-gray-800">
                  {requests.map(req => (
                    <tr key={req.id} className="border-b hover:bg-gray-50/50">
                      <td className="p-4 font-medium text-gray-600">{req.reqData.tglMulai.replace('T', ' ')}</td>
                      <td className="p-4">
                        <div className="font-medium text-gray-900">{req.reqData.pengaju}</div>
                        <div className="text-gray-500 text-xs mt-1">Dr: {req.reqData.driver}</div>
                      </td>
                      <td className="p-4">
                        <div className="font-medium">{req.carName}</div>
                        <div className="text-gray-500 text-xs mt-1">{req.reqData.tujuan}</div>
                      </td>
                      <td className="p-4"><Badge status={req.status} /></td>
                      <td className="p-4">
                        <button onClick={() => openDetailModal(req)} className="flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-gray-200">
                          <EyeIcon /> Detail
                        </button>
                      </td>
                    </tr>
                  ))}
                  {requests.length === 0 && <tr><td colSpan="5" className="p-8 text-center text-gray-500">Belum ada data.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {role === 'user' && activeTab === 'available-cars' && (
           <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-800">Booking Kendaraan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cars.map(car => (
                <div key={car.id} className={`rounded-xl shadow-sm border p-5 flex flex-col bg-white ${car.status === 'Sedang Servis' || car.status === 'Tidak Aktif' ? 'border-red-200 opacity-75' : 'border-green-200'}`}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{car.name}</h3>
                      <p className="text-gray-500 font-mono text-sm">{car.plate}</p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${car.status === 'Sedang Servis' || car.status === 'Tidak Aktif' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                      {car.status || 'Beroperasi'}
                    </span>
                  </div>
                  <div className="mb-6 space-y-2 text-sm text-gray-600">
                    <p>Kapasitas: <span className="font-medium text-gray-900">{car.capacity} Org</span></p>
                    <p>Kilometer: <span className="font-medium text-gray-900">{car.currentKm.toLocaleString('id-ID')} KM</span></p>
                  </div>
                  <button 
                    disabled={car.status === 'Sedang Servis' || car.status === 'Tidak Aktif'}
                    onClick={() => { setSelectedCar(car); setShowRequestModal(true); }}
                    className={`mt-auto w-full py-2.5 rounded-lg text-sm font-semibold transition-colors shadow ${car.status === 'Sedang Servis' || car.status === 'Tidak Aktif' ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
                  >
                    {car.status === 'Sedang Servis' || car.status === 'Tidak Aktif' ? 'Tidak Tersedia' : 'Isi Form Booking'}
                  </button>
                </div>
              ))}
            </div>
         </div>
        )}

        {role === 'user' && activeTab === 'global-history' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-800">Jadwal Booking Global</h2>
              <p className="text-sm text-gray-500 mt-1">Cek jadwal agar waktu booking Anda tidak bentrok.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-600 text-sm">
                    <th className="p-4 border-b">Tanggal Mulai</th>
                    <th className="p-4 border-b">Pengaju & Driver</th>
                    <th className="p-4 border-b">Tujuan</th>
                    <th className="p-4 border-b">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-gray-800">
                  {requests.map(req => (
                    <tr key={req.id} className="border-b hover:bg-gray-50/50">
                      <td className="p-4 text-gray-900 font-medium">{req.reqData.tglMulai.replace('T', ' ')}</td>
                      <td className="p-4">
                        <div className="font-medium text-gray-900">{req.reqData.pengaju}</div>
                        <div className="text-gray-500 text-xs mt-1">Dr: {req.reqData.driver}</div>
                      </td>
                      <td className="p-4">{req.reqData.tujuan}</td>
                      <td className="p-4"><Badge status={req.status} /></td>
                    </tr>
                  ))}
                  {requests.length === 0 && <tr><td colSpan="4" className="p-8 text-center text-gray-500">Belum ada jadwal.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {role === 'user' && activeTab === 'my-requests' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-800">Peminjaman Saya</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-600 text-sm">
                    <th className="p-4 border-b">Tujuan & Alamat</th>
                    <th className="p-4 border-b">Tanggal Mulai</th>
                    <th className="p-4 border-b">Status</th>
                    <th className="p-4 border-b">Aksi</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-gray-800">
                  {requests.map(req => (
                    <tr key={req.id} className="border-b hover:bg-gray-50/50">
                      <td className="p-4">
                        <div className="font-medium text-gray-900">{req.reqData.tujuan}</div>
                        <div className="text-gray-500 text-xs mt-1">{req.reqData.alamat}</div>
                      </td>
                      <td className="p-4 text-gray-600">{req.reqData.tglMulai.replace('T', ' ')}</td>
                      <td className="p-4"><Badge status={req.status} /></td>
                      <td className="p-4 flex gap-2 flex-wrap">
                        <button onClick={() => openDetailModal(req)} className="flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-gray-200">
                          <EyeIcon /> Detail
                        </button>
                         {req.status === 'Booking' && (
                           <button onClick={() => openReportModal(req)} className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-blue-700 shadow-sm">
                             Kembalikan & Lapor
                           </button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {requests.length === 0 && <tr><td colSpan="4" className="p-8 text-center text-gray-500">Anda belum pernah melakukan peminjaman.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* --- SEMUA MODAL DI BAWAH SINI --- */}
      
      {showOilModal && selectedCar && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 overflow-y-auto">
           <div className="bg-white rounded-2xl w-full max-w-md p-6 my-8">
              <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-800">Catat Ganti Oli Baru</h3>
                <button type="button" onClick={() => setShowOilModal(false)} className="text-gray-400 hover:text-gray-600"><PlusIcon style={{transform: 'rotate(45deg)'}}/></button>
              </div>
              <form onSubmit={handleUpdateOil} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Ganti Oli</label>
                    <input required type="date" value={newOilData.date} onChange={e => setNewOilData({...newOilData, date: e.target.value})} className="w-full border-gray-300 rounded-lg p-2.5 border outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">KM Saat Ganti</label>
                    <input required type="number" value={newOilData.km} onChange={e => setNewOilData({...newOilData, km: e.target.value})} className="w-full border-gray-300 rounded-lg p-2.5 border outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Merk Oli</label>
                  <input required type="text" value={newOilData.brand} onChange={e => setNewOilData({...newOilData, brand: e.target.value})} className="w-full border-gray-300 rounded-lg p-2.5 border outline-none focus:ring-2 focus:ring-indigo-600" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200 mt-2">
                   <div className="col-span-1 md:col-span-2">
                     <label className="block text-sm font-semibold text-gray-800 mb-1">Batas Penggantian Berikutnya</label>
                   </div>
                   <div>
                     <label className="block text-xs font-medium text-gray-700 mb-1">Batas (KM)</label>
                     <input required type="number" value={newOilData.limitKm} onChange={e => setNewOilData({...newOilData, limitKm: e.target.value})} className="w-full border-gray-300 rounded-lg p-2.5 border outline-none" />
                   </div>
                   <div>
                     <label className="block text-xs font-medium text-gray-700 mb-1">Batas (Bulan)</label>
                     <input required type="number" value={newOilData.limitMonths} onChange={e => setNewOilData({...newOilData, limitMonths: e.target.value})} className="w-full border-gray-300 rounded-lg p-2.5 border outline-none" />
                   </div>
                </div>
                <div className="pt-4 border-t">
                  <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 shadow-sm">Simpan Data</button>
                </div>
              </form>
           </div>
        </div>
      )}

      {showRequestModal && selectedCar && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl p-6 my-8">
            <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-800">Booking: {selectedCar.name}</h3>
              <button type="button" onClick={() => setShowRequestModal(false)} className="text-gray-400 hover:text-gray-600"><PlusIcon style={{transform: 'rotate(45deg)'}}/></button>
            </div>
            
            <form onSubmit={handleSubmitRequest} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pengaju / PJ</label>
                  <input required type="text" value={newReq.pengaju} onChange={e => setNewReq({...newReq, pengaju: e.target.value})} className="w-full border-gray-300 rounded-lg p-2.5 border focus:ring-2 focus:ring-indigo-600 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Driver</label>
                  <input required type="text" value={newReq.driver} onChange={e => setNewReq({...newReq, driver: e.target.value})} className="w-full border-gray-300 rounded-lg p-2.5 border focus:ring-2 focus:ring-indigo-600 outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tujuan</label>
                  <input required type="text" value={newReq.tujuan} onChange={e => setNewReq({...newReq, tujuan: e.target.value})} className="w-full border-gray-300 rounded-lg p-2.5 border focus:ring-2 focus:ring-indigo-600 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Alamat (Kec, Kab)</label>
                  <input required type="text" value={newReq.alamat} onChange={e => setNewReq({...newReq, alamat: e.target.value})} className="w-full border-gray-300 rounded-lg p-2.5 border focus:ring-2 focus:ring-indigo-600 outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kategori Penumpang</label>
                <select value={newReq.penumpang} onChange={e => setNewReq({...newReq, penumpang: e.target.value})} className="w-full border-gray-300 rounded-lg p-2.5 border outline-none bg-white">
                  {OPT_PENUMPANG.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Mulai</label>
                  <input required type="datetime-local" value={newReq.tglMulai} onChange={e => setNewReq({...newReq, tglMulai: e.target.value})} className="w-full border-gray-300 rounded-lg p-2.5 border outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bensin Awal (Bar)</label>
                  <select value={newReq.bensinAwal} onChange={e => setNewReq({...newReq, bensinAwal: e.target.value})} className="w-full border-gray-300 rounded-lg p-2.5 border outline-none bg-white">
                    {[1,2,3,4,5,6,7,8].map(num => <option key={num} value={num}>{num} Bar</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi Pengambilan</label>
                <select value={newReq.lokasiAmbil} onChange={e => setNewReq({...newReq, lokasiAmbil: e.target.value})} className="w-full border-gray-300 rounded-lg p-2.5 border outline-none bg-white mb-2">
                  {OPT_LOKASI.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                {newReq.lokasiAmbil === 'Lainnya' && (
                  <input required type="text" value={newReq.lokasiAmbilLainnya} onChange={e => setNewReq({...newReq, lokasiAmbilLainnya: e.target.value})} className="w-full border-gray-300 rounded-lg p-2.5 border focus:ring-2 focus:ring-indigo-600 outline-none" placeholder="Tuliskan lokasi..." />
                )}
              </div>

              <div className="pt-4 border-t">
                <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 shadow-lg">Submit Booking</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showReportModal && activeRequest && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl p-6 my-8">
            <div className="flex justify-between items-center mb-4 border-b pb-3">
              <h3 className="text-xl font-bold text-gray-800">Laporan Pengembalian</h3>
              <button type="button" onClick={() => setShowReportModal(false)} className="text-gray-400 hover:text-gray-600"><PlusIcon style={{transform: 'rotate(45deg)'}}/></button>
            </div>
            
            <form onSubmit={handleSubmitReport} className="space-y-5">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Selesai</label>
                    <input required type="datetime-local" value={newReport.tglSelesai} onChange={e => setNewReport({...newReport, tglSelesai: e.target.value})} className="w-full border-gray-300 rounded-lg p-2.5 border outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Kilometer (KM Akhir)</label>
                    <input required type="number" value={newReport.kilometer} onChange={e => setNewReport({...newReport, kilometer: e.target.value})} className="w-full border-gray-300 rounded-lg p-2.5 border outline-none" />
                  </div>
               </div>

               <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Ada Kerusakan?</label>
                  <div className="flex gap-4 mb-3">
                    <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="kerusakan" value="Tidak" checked={newReport.adaKerusakan === 'Tidak'} onChange={e => setNewReport({...newReport, adaKerusakan: e.target.value})} /> Tidak</label>
                    <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="kerusakan" value="Ya" checked={newReport.adaKerusakan === 'Ya'} onChange={e => setNewReport({...newReport, adaKerusakan: e.target.value})} /> Ya</label>
                  </div>
                  {newReport.adaKerusakan === 'Ya' && (
                    <div className="mt-2 pl-4 border-l-2 border-red-300">
                      <select value={newReport.jenisKerusakan} onChange={e => setNewReport({...newReport, jenisKerusakan: e.target.value})} className="w-full border-gray-300 rounded-lg p-2 border outline-none bg-white mb-2 text-sm">
                        {OPT_KERUSAKAN.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                      {newReport.jenisKerusakan === 'Lainnya' && (
                        <input required type="text" value={newReport.kerusakanLainnya} onChange={e => setNewReport({...newReport, kerusakanLainnya: e.target.value})} className="w-full border-gray-300 rounded-lg p-2 border outline-none text-sm" placeholder="Jelaskan..." />
                      )}
                    </div>
                  )}
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Isi Bensin?</label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2"><input type="radio" name="isiBensin" value="Ya" checked={newReport.isiBensin === 'Ya'} onChange={e => setNewReport({...newReport, isiBensin: e.target.value})} /> Ya</label>
                      <label className="flex items-center gap-2"><input type="radio" name="isiBensin" value="Tidak" checked={newReport.isiBensin === 'Tidak'} onChange={e => setNewReport({...newReport, isiBensin: e.target.value})} /> Tidak</label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bensin Akhir (Bar)</label>
                    <select value={newReport.bensinAkhir} onChange={e => setNewReport({...newReport, bensinAkhir: e.target.value})} className="w-full border-gray-300 rounded-lg p-2.5 border outline-none bg-white">
                      {[1,2,3,4,5,6,7,8].map(num => <option key={num} value={num}>{num} Bar</option>)}
                    </select>
                  </div>
               </div>

               <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi Kembali</label>
                <select value={newReport.lokasiKembali} onChange={e => setNewReport({...newReport, lokasiKembali: e.target.value})} className="w-full border-gray-300 rounded-lg p-2.5 border outline-none bg-white mb-2">
                  {OPT_LOKASI.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                {newReport.lokasiKembali === 'Lainnya' && (
                  <input required type="text" value={newReport.lokasiKembaliLainnya} onChange={e => setNewReport({...newReport, lokasiKembaliLainnya: e.target.value})} className="w-full border-gray-300 rounded-lg p-2.5 border outline-none" placeholder="Tuliskan lokasi..." />
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Interior Dibersihkan?</label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2"><input type="radio" name="interior" value="Sudah" checked={newReport.interiorDibersihkan === 'Sudah'} onChange={e => setNewReport({...newReport, interiorDibersihkan: e.target.value})} /> Sudah</label>
                      <label className="flex items-center gap-2"><input type="radio" name="interior" value="Belum" checked={newReport.interiorDibersihkan === 'Belum'} onChange={e => setNewReport({...newReport, interiorDibersihkan: e.target.value})} /> Belum</label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Kondisi Kebersihan</label>
                    <select value={newReport.kondisiKebersihan} onChange={e => setNewReport({...newReport, kondisiKebersihan: e.target.value})} className="w-full border-gray-300 rounded-lg p-2.5 border outline-none bg-white">
                      <option value="Bersih">Bersih</option>
                      <option value="Kotor Ringan">Kotor Ringan</option>
                      <option value="Kotor Berat">Kotor Berat</option>
                    </select>
                  </div>
               </div>

               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Barang Tertinggal</label>
                  <input type="text" value={newReport.barangTertinggal} onChange={e => setNewReport({...newReport, barangTertinggal: e.target.value})} className="w-full border-gray-300 rounded-lg p-2.5 border outline-none" placeholder="Kosongkan jika tidak ada" />
               </div>

              <div className="pt-4 border-t">
                <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 shadow-lg">Kirim Laporan</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDetailModal && activeRequest && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl p-6 my-8">
            <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-800">Detail Peminjaman</h3>
              <button type="button" onClick={() => setShowDetailModal(false)} className="text-gray-400 hover:text-gray-600"><PlusIcon style={{transform: 'rotate(45deg)'}}/></button>
            </div>
            
            <div className="space-y-6 text-sm">
              <div>
                <h4 className="font-bold text-indigo-700 mb-2 border-b pb-1">Data Pengajuan</h4>
                <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                  <p><span className="text-gray-500">Mobil:</span> <br/><span className="font-semibold">{activeRequest.carName}</span></p>
                  <p><span className="text-gray-500">Status:</span> <br/><Badge status={activeRequest.status} /></p>
                  <p><span className="text-gray-500">Pengaju/PJ:</span> <br/><span className="font-semibold">{activeRequest.reqData.pengaju}</span></p>
                  <p><span className="text-gray-500">Driver:</span> <br/><span className="font-semibold">{activeRequest.reqData.driver}</span></p>
                  <p className="col-span-2"><span className="text-gray-500">Penumpang:</span> <br/><span className="font-semibold">{activeRequest.reqData.penumpang}</span></p>
                  <p className="col-span-2"><span className="text-gray-500">Tujuan:</span> <br/><span className="font-semibold">{activeRequest.reqData.tujuan} - {activeRequest.reqData.alamat}</span></p>
                  <p><span className="text-gray-500">Waktu Mulai:</span> <br/><span className="font-semibold">{activeRequest.reqData.tglMulai.replace('T', ' ')}</span></p>
                  <p><span className="text-gray-500">Ambil & Bensin:</span> <br/><span className="font-semibold">{activeRequest.reqData.lokasiAmbil} (Bensin {activeRequest.reqData.bensinAwal} Bar)</span></p>
                </div>
              </div>

              {activeRequest.reportData ? (
                <div className="bg-gray-50 p-4 rounded-xl border">
                  <h4 className="font-bold text-blue-700 mb-3 border-b pb-1">Laporan Pengembalian</h4>
                  <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                    <p><span className="text-gray-500">Selesai:</span> <br/><span className="font-semibold">{activeRequest.reportData.tglSelesai.replace('T', ' ')}</span></p>
                    <p><span className="text-gray-500">KM Akhir:</span> <br/><span className="font-semibold">{activeRequest.reportData.kilometer} KM</span></p>
                    <p><span className="text-gray-500">Isi Bensin / Sisa:</span> <br/><span className="font-semibold">{activeRequest.reportData.isiBensin === 'Ya' ? 'Ya (Diisi)' : 'Tidak Diisi'} / {activeRequest.reportData.bensinAkhir} Bar</span></p>
                    <p><span className="text-gray-500">Lokasi Kembali:</span> <br/><span className="font-semibold">{activeRequest.reportData.lokasiKembali}</span></p>
                    <p className="col-span-2"><span className="text-gray-500">Kerusakan:</span> <br/><span className={`font-semibold ${activeRequest.reportData.detailKerusakan !== 'Tidak Ada' ? 'text-red-600' : 'text-green-600'}`}>{activeRequest.reportData.detailKerusakan}</span></p>
                    <p><span className="text-gray-500">Kebersihan:</span> <br/><span className="font-semibold">{activeRequest.reportData.kondisiKebersihan} ({activeRequest.reportData.interiorDibersihkan})</span></p>
                    <p className="col-span-2"><span className="text-gray-500">Barang Tertinggal:</span> <br/><span className="font-semibold">{activeRequest.reportData.barangTertinggal || '-'}</span></p>
                  </div>
                </div>
              ) : (
                <div className="bg-yellow-50 text-yellow-700 p-3 rounded-lg border border-yellow-200 text-center">
                  Laporan belum diisi (kendaraan masih digunakan).
                </div>
              )}
            </div>
            <div className="mt-6 pt-4 border-t text-right">
              <button type="button" onClick={() => setShowDetailModal(false)} className="bg-gray-200 text-gray-800 px-5 py-2 rounded-lg font-medium hover:bg-gray-300">Tutup</button>
            </div>
          </div>
        </div>
      )}

      {showCarModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 overflow-y-auto">
           <div className="bg-white rounded-2xl w-full max-w-md p-6 my-8">
              <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-800">{editingCar ? 'Edit Mobil' : 'Tambah Mobil'}</h3>
                <button type="button" onClick={() => setShowCarModal(false)} className="text-gray-400 hover:text-gray-600"><PlusIcon style={{transform: 'rotate(45deg)'}}/></button>
              </div>
              <form onSubmit={handleSaveCar} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama Mobil</label>
                  <input required type="text" value={carFormData.name} onChange={e => setCarFormData({...carFormData, name: e.target.value})} className="w-full border-gray-300 rounded-lg p-2.5 border outline-none focus:ring-2 focus:ring-indigo-600" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Plat Nomor</label>
                    <input required type="text" value={carFormData.plate} onChange={e => setCarFormData({...carFormData, plate: e.target.value})} className="w-full border-gray-300 rounded-lg p-2.5 border outline-none focus:ring-2 focus:ring-indigo-600" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Kapasitas (Org)</label>
                    <input required type="number" min="1" value={carFormData.capacity} onChange={e => setCarFormData({...carFormData, capacity: e.target.value})} className="w-full border-gray-300 rounded-lg p-2.5 border outline-none focus:ring-2 focus:ring-indigo-600" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select value={carFormData.status} onChange={e => setCarFormData({...carFormData, status: e.target.value})} className="w-full border-gray-300 rounded-lg p-2.5 border outline-none bg-white">
                      <option value="Beroperasi">Beroperasi</option>
                      <option value="Sedang Servis">Sedang Servis</option>
                      <option value="Tidak Aktif">Tidak Aktif</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">KM Saat Ini</label>
                    <input required type="number" value={carFormData.currentKm} onChange={e => setCarFormData({...carFormData, currentKm: e.target.value})} className="w-full border-gray-300 rounded-lg p-2.5 border outline-none focus:ring-2 focus:ring-indigo-600" />
                  </div>
                </div>
                <div className="pt-4 border-t mt-6">
                  <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 shadow-sm">
                    {editingCar ? 'Simpan' : 'Tambahkan'}
                  </button>
                </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
}
