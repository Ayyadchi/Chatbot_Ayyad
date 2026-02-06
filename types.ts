
export interface FireStation {
  id: string;
  negeri: string;
  daerah: string;
  nama: string;
  alamat: string;
  lat: number;
  lng: number;
  jumlahKeanggotaan: number;
  wanita: number;
  lelaki: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface DashboardStats {
  totalStations: number;
  totalPersonnel: number;
  averagePersonnel: number;
  genderRatio: {
    male: number;
    female: number;
  };
}
