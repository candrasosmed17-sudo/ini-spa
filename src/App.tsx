/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, Star, Clock, Sparkles, Calendar, 
  ChevronRight, MapPin, Phone, Instagram, 
  Facebook, Twitter, CheckCircle2, AlertCircle
} from 'lucide-react';

// --- Types ---
interface Service {
  id: string;
  name: string;
  description: string;
  duration: string;
  benefits: string[];
  price: string;
  image: string;
}

interface Therapist {
  id: string;
  name: string;
  rating: number;
  specialty: string;
  experience: string;
  bio: string;
  image: string;
  status: 'Available' | 'Full';
  schedule: string[];
}

// --- Data ---
const SERVICES: Service[] = [
  {
    id: '1',
    name: 'Pijat Seluruh Tubuh',
    description: 'Lepaskan ketegangan dan stres dengan pijat seluruh tubuh khas kami.',
    duration: '60 / 90 mnt',
    benefits: ['Relaksasi otot', 'Meningkatkan sirkulasi', 'Pereda stres'],
    price: 'Rp 250rb',
    image: 'https://images.unsplash.com/photo-1544161515-4ae6ce6db874?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    name: 'Refleksi',
    description: 'Teknik penyembuhan kuno yang berfokus pada titik tekan di kaki Anda.',
    duration: '60 mnt',
    benefits: ['Keseimbangan energi', 'Pengurangan rasa sakit', 'Detoksifikasi'],
    price: 'Rp 150rb',
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '3',
    name: 'Totok Wajah',
    description: 'Akupresur wajah tradisional untuk peremajaan alami dan kulit bercahaya.',
    duration: '45 mnt',
    benefits: ['Pengencangan wajah', 'Cahaya alami', 'Pereda sinus'],
    price: 'Rp 120rb',
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '4',
    name: 'Aromaterapi',
    description: 'Tingkatkan kesejahteraan Anda dengan minyak esensial dan pijatan lembut.',
    duration: '90 mnt',
    benefits: ['Peningkatan suasana hati', 'Relaksasi mendalam', 'Tidur lebih nyenyak'],
    price: 'Rp 300rb',
    image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&q=80&w=800'
  }
];

const THERAPISTS: Therapist[] = [
  {
    id: '1',
    name: 'Siti Aminah',
    rating: 4.9,
    specialty: 'Pijat Tubuh & Aromaterapi',
    experience: '8 Tahun',
    bio: 'Pakar dalam teknik pijat tradisional Jawa dengan fokus pada relaksasi jaringan dalam.',
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&q=80&w=400',
    status: 'Available',
    schedule: ['09:00', '11:00', '14:00', '16:00']
  },
  {
    id: '2',
    name: 'Dewi Lestari',
    rating: 4.8,
    specialty: 'Refleksi & Totok Wajah',
    experience: '5 Tahun',
    bio: 'Spesialisasi dalam peremajaan wajah dan terapi titik tekan untuk kesehatan holistik.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
    status: 'Full',
    schedule: []
  },
  {
    id: '3',
    name: 'Budi Santoso',
    rating: 4.7,
    specialty: 'Pijat Jaringan Dalam & Olahraga',
    experience: '10 Tahun',
    bio: 'Sangat berpengalaman dalam pijat terapeutik untuk pemulihan otot dan nyeri kronis.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    status: 'Available',
    schedule: ['10:00', '13:00', '15:00', '17:00']
  }
];

// --- Components ---

const Navbar = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Beranda', 'Tentang', 'Layanan', 'Terapis', 'Booking', 'Kontak'];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-cream/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div 
          className="text-2xl font-serif font-bold tracking-tighter cursor-pointer"
          onClick={() => onNavigate('home')}
        >
          CANWELNES
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button 
              key={item} 
              onClick={() => onNavigate(item === 'Beranda' ? 'home' : item === 'Tentang' ? 'about' : item === 'Layanan' ? 'services' : item === 'Terapis' ? 'therapists' : item === 'Kontak' ? 'contact' : item.toLowerCase())}
              className="nav-link"
            >
              {item}
            </button>
          ))}
          <button 
            onClick={() => onNavigate('booking')}
            className="bg-brown text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-brown-dark transition-all"
          >
            Pesan Sekarang
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-cream shadow-xl md:hidden py-8 px-6 flex flex-col space-y-4"
          >
            {navItems.map((item) => (
              <button 
                key={item} 
                onClick={() => {
                  onNavigate(item.toLowerCase());
                  setIsMobileMenuOpen(false);
                }}
                className="text-lg font-medium text-left border-b border-brown/10 pb-2"
              >
                {item}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onBook }: { onBook: () => void }) => {
  return (
    <section id="home" className="relative h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1920" 
          alt="Spa Background" 
          className="w-full h-full object-cover opacity-40"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-cream via-cream/80 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <div className="flex items-center space-x-2 text-brown font-medium mb-4">
            <Sparkles size={18} />
            <span className="uppercase tracking-widest text-sm">Pengalaman Wellness Premium</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif leading-tight mb-6">
            Relaksasi Tubuh, <br />
            <span className="italic text-brown">Segarkan Pikiran</span>
          </h1>
          <p className="text-lg text-ink/70 mb-8 max-w-lg">
            Rasakan peremajaan terbaik dengan terapis profesional dan perawatan spa premium kami dalam lingkungan yang tenang.
          </p>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button onClick={onBook} className="btn-primary">
              Pesan Sekarang
            </button>
            <div className="flex items-center space-x-2 text-sm text-brown-dark font-medium">
              <AlertCircle size={16} className="text-red-500 animate-pulse" />
              <span>Slot terbatas tersedia hari ini!</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div 
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-20 hidden lg:block"
      >
        <div className="glass-card p-6 rounded-2xl shadow-xl max-w-xs">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-brown/20 flex items-center justify-center text-brown">
              <Star fill="currentColor" />
            </div>
            <div>
              <p className="font-bold text-lg">4.9/5.0</p>
              <p className="text-xs text-ink/60">Customer Satisfaction</p>
            </div>
          </div>
          <p className="text-sm italic text-ink/80">"The best reflexology experience I've ever had. Truly professional!"</p>
        </div>
      </motion.div>
    </section>
  );
};

const Services = () => {
  return (
    <section id="services" className="py-24 bg-cream-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif mb-4">Layanan Unggulan Kami</h2>
          <p className="text-ink/60 max-w-2xl mx-auto">Pilih dari pilihan perawatan kami yang dikurasi untuk mengembalikan keseimbangan dan vitalitas tubuh dan pikiran Anda.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((service, index) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={service.image} 
                  alt={service.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-brown">
                  {service.price}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-serif font-bold">{service.name}</h3>
                  <div className="flex items-center text-xs text-ink/50">
                    <Clock size={14} className="mr-1" />
                    {service.duration}
                  </div>
                </div>
                <p className="text-sm text-ink/60 mb-4 line-clamp-2">{service.description}</p>
                <div className="space-y-2 mb-6">
                  {service.benefits.map((benefit) => (
                    <div key={benefit} className="flex items-center text-xs text-brown font-medium">
                      <CheckCircle2 size={14} className="mr-2" />
                      {benefit}
                    </div>
                  ))}
                </div>
                <button className="w-full py-2 border border-brown/20 rounded-xl text-sm font-medium hover:bg-brown hover:text-white transition-colors">
                  Lihat Detail
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Therapists = ({ onSelect }: { onSelect: (t: Therapist) => void }) => {
  return (
    <section id="therapists" className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="mb-6 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">Temui Pakar Kami</h2>
            <p className="text-ink/60 max-w-xl">Terapis kami adalah profesional bersertifikat dengan pengalaman bertahun-tahun dalam berbagai modalitas kesehatan.</p>
          </div>
          <button className="btn-secondary">Lihat Semua Terapis</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {THERAPISTS.map((therapist, index) => (
            <motion.div 
              key={therapist.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="relative mb-6 inline-block">
                <div className="w-64 h-64 rounded-full overflow-hidden border-8 border-cream-dark shadow-lg mx-auto relative z-10">
                  <img 
                    src={therapist.image} 
                    alt={therapist.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 z-20 bg-white shadow-md rounded-full px-4 py-2 flex items-center space-x-1">
                  <Star size={16} className="text-yellow-500 fill-yellow-500" />
                  <span className="font-bold text-sm">{therapist.rating}</span>
                </div>
                <div className={`absolute top-4 left-4 z-20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${therapist.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {therapist.status}
                </div>
              </div>
              <h3 className="text-2xl font-serif font-bold mb-1">{therapist.name}</h3>
              <p className="text-brown font-medium text-sm mb-4">{therapist.specialty}</p>
              <button 
                onClick={() => onSelect(therapist)}
                className="text-sm font-bold uppercase tracking-widest text-ink/40 hover:text-brown transition-colors flex items-center justify-center mx-auto"
              >
                Lihat Profil <ChevronRight size={16} className="ml-1" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TherapistDetail = ({ therapist, onBack, onBook }: { therapist: Therapist, onBack: () => void, onBook: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[60] bg-cream overflow-y-auto pt-24 pb-12"
    >
      <div className="max-w-5xl mx-auto px-6">
        <button onClick={onBack} className="flex items-center text-ink/50 hover:text-brown mb-8 transition-colors">
          <ChevronRight size={20} className="rotate-180 mr-2" /> Kembali ke Daftar
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[3/4]">
            <img 
              src={therapist.image} 
              alt={therapist.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div>
            <div className="flex items-center space-x-3 mb-4">
              <span className="bg-brown/10 text-brown px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                Pengalaman {therapist.experience}
              </span>
              <div className="flex items-center text-yellow-500">
                <Star size={16} fill="currentColor" />
                <span className="ml-1 font-bold text-ink">{therapist.rating}</span>
              </div>
            </div>
            
            <h1 className="text-4xl font-serif mb-2">{therapist.name}</h1>
            <p className="text-xl text-brown font-medium mb-8">{therapist.specialty}</p>
            
            <div className="mb-10">
              <h3 className="text-lg font-bold mb-3 uppercase tracking-widest text-ink/40">Tentang</h3>
              <p className="text-ink/70 leading-relaxed">{therapist.bio}</p>
            </div>

            <div className="mb-10">
              <h3 className="text-lg font-bold mb-4 uppercase tracking-widest text-ink/40">Jadwal Tersedia</h3>
              <div className="grid grid-cols-4 gap-3">
                {therapist.schedule.length > 0 ? (
                  therapist.schedule.map((time) => (
                    <div key={time} className="bg-white border border-brown/10 py-3 rounded-xl text-center font-medium hover:border-brown hover:bg-brown/5 transition-all cursor-pointer">
                      {time}
                    </div>
                  ))
                ) : (
                  <div className="col-span-4 py-4 bg-red-50 text-red-600 rounded-xl text-center font-medium flex items-center justify-center">
                    <AlertCircle size={18} className="mr-2" /> Sudah Penuh Hari Ini
                  </div>
                )}
              </div>
            </div>

            <button 
              disabled={therapist.status === 'Full'}
              onClick={onBook}
              className={`w-full py-4 rounded-full font-bold text-lg transition-all ${therapist.status === 'Available' ? 'bg-brown text-white hover:bg-brown-dark shadow-xl' : 'bg-ink/10 text-ink/30 cursor-not-allowed'}`}
            >
              {therapist.status === 'Available' ? 'Pesan Terapis Ini' : 'Saat Ini Tidak Tersedia'}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const BookingSystem = ({ onClose }: { onClose: () => void }) => {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    serviceId: '',
    therapistId: '',
    date: '',
    time: ''
  });

  const handleWhatsAppBooking = () => {
    const service = SERVICES.find(s => s.id === bookingData.serviceId);
    const therapist = THERAPISTS.find(t => t.id === bookingData.therapistId);
    
    const message = `Halo Canwelnes, saya ingin booking:
Layanan: ${service?.name || ''}
Terapis: ${therapist?.name || ''}
Tanggal: ${bookingData.date}
Jam: ${bookingData.time}
Mohon konfirmasi ketersediaannya. Terima kasih.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/6281935593614?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    setStep(4);
    setTimeout(onClose, 3000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 z-[70] bg-ink/60 backdrop-blur-sm flex items-center justify-center p-6"
    >
      <div className="bg-cream w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl relative">
        <button onClick={onClose} className="absolute top-6 right-6 text-ink/40 hover:text-ink">
          <X size={24} />
        </button>

        <div className="p-8 md:p-12">
          {step < 4 && (
            <div className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <div className="flex justify-between w-32 relative">
                  <div className="absolute top-1/2 left-0 w-full h-0.5 bg-brown/10 -translate-y-1/2 z-0"></div>
                  {[1, 2, 3].map((s) => (
                    <div 
                      key={s} 
                      className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${step >= s ? 'bg-brown text-white' : 'bg-cream-dark text-ink/30 border border-brown/10'}`}
                    >
                      {s}
                    </div>
                  ))}
                </div>
                <div className="bg-red-50 border border-red-100 px-4 py-2 rounded-2xl flex items-center space-x-2 animate-pulse">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span className="text-xs font-bold text-red-600 uppercase tracking-wider">Sisa 3 Slot Hari Ini</span>
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h2 className="text-2xl font-serif mb-6">Pilih Layanan</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-64 overflow-y-auto pr-2">
                {SERVICES.map((s) => (
                  <button 
                    key={s.id}
                    onClick={() => {
                      setBookingData({ ...bookingData, serviceId: s.id });
                      setStep(2);
                    }}
                    className={`p-4 rounded-2xl text-left border-2 transition-all ${bookingData.serviceId === s.id ? 'border-brown bg-brown/5' : 'border-brown/10 hover:border-brown/30'}`}
                  >
                    <p className="font-bold">{s.name}</p>
                    <p className="text-xs text-ink/50">{s.duration} • {s.price}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h2 className="text-2xl font-serif mb-6">Pilih Terapis</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {THERAPISTS.map((t) => (
                  <button 
                    key={t.id}
                    disabled={t.status === 'Full'}
                    onClick={() => {
                      setBookingData({ ...bookingData, therapistId: t.id });
                      setStep(3);
                    }}
                    className={`p-4 rounded-2xl text-left border-2 flex items-center space-x-4 transition-all ${t.status === 'Full' ? 'opacity-50 cursor-not-allowed' : bookingData.therapistId === t.id ? 'border-brown bg-brown/5' : 'border-brown/10 hover:border-brown/30'}`}
                  >
                    <img src={t.image} className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <p className="font-bold">{t.name}</p>
                      <p className="text-xs text-ink/50">{t.specialty}</p>
                    </div>
                  </button>
                ))}
              </div>
              <button onClick={() => setStep(1)} className="mt-8 text-sm font-bold text-brown">Kembali</button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-serif">Pilih Tanggal & Waktu</h2>
                <div className="bg-red-600 text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter animate-bounce">
                  Hot Slot!
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-brown/5 border border-brown/10 p-4 rounded-2xl flex items-center space-x-4 mb-4">
                  <div className="bg-brown text-white p-2 rounded-xl">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-brown uppercase tracking-widest">Sisa Slot Hari Ini</p>
                    <p className="text-sm text-ink/70">Hanya tersisa <span className="font-black text-red-600">3 slot</span> untuk terapis pilihan Anda.</p>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-ink/40 mb-2">Tanggal</label>
                  <input 
                    type="date" 
                    className="w-full p-4 bg-white border border-brown/10 rounded-2xl focus:outline-none focus:border-brown"
                    onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-ink/40 mb-2">Slot Tersedia</label>
                  <div className="grid grid-cols-4 gap-2">
                    {['09:00', '11:00', '13:00', '15:00', '17:00'].map((time) => (
                      <button 
                        key={time}
                        onClick={() => setBookingData({ ...bookingData, time })}
                        className={`py-3 rounded-xl text-sm font-medium border-2 transition-all ${bookingData.time === time ? 'border-brown bg-brown text-white' : 'border-brown/10 hover:border-brown/30'}`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="pt-4">
                  <button 
                    onClick={handleWhatsAppBooking}
                    disabled={!bookingData.date || !bookingData.time}
                    className="w-full py-4 bg-green-600 text-white rounded-full font-bold text-lg hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    <span>Booking via WhatsApp</span>
                  </button>
                </div>
              </div>
              <button onClick={() => setStep(2)} className="mt-8 text-sm font-bold text-brown">Kembali</button>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }} 
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={40} />
              </div>
              <h2 className="text-3xl font-serif mb-4">Mengarahkan ke WhatsApp...</h2>
              <p className="text-ink/60">Terima kasih telah memilih Canwelnes. Mohon konfirmasi pesanan Anda melalui chat WhatsApp.</p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1544161515-4ae6ce6db874?auto=format&fit=crop&q=80&w=1000" 
                alt="About Canwelnes" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-brown-light/20 rounded-full blur-3xl -z-0"></div>
            <div className="absolute -top-10 -left-10 w-48 h-48 bg-brown/10 rounded-full blur-2xl -z-0"></div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-serif mb-8 leading-tight">Menciptakan Momen <br /><span className="italic text-brown">Ketenangan Murni</span></h2>
            <p className="text-ink/70 mb-6 leading-relaxed">
              Didirikan pada tahun 2018, Canwelnes lahir dari visi sederhana: menciptakan tempat perlindungan di mana kehidupan modern melambat. Kami percaya bahwa kesehatan sejati bukan sekadar kemewahan, melainkan kebutuhan untuk hidup yang seimbang.
            </p>
            <div className="grid grid-cols-2 gap-8 mb-10">
              <div>
                <h4 className="font-serif font-bold text-xl mb-2">Visi Kami</h4>
                <p className="text-sm text-ink/60">Menjadi tempat perlindungan terkemuka untuk kesehatan holistik dan peremajaan mental.</p>
              </div>
              <div>
                <h4 className="font-serif font-bold text-xl mb-2">Misi Kami</h4>
                <p className="text-sm text-ink/60">Memberikan pengalaman spa premium yang dipersonalisasi dengan integritas profesional.</p>
              </div>
            </div>
            <div className="space-y-4">
              {['Terapis Profesional Bersertifikat', 'Minyak Esensial Alami Premium', 'Lingkungan Tenang & Privat'].map((item) => (
                <div key={item} className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full bg-brown/10 flex items-center justify-center text-brown">
                    <CheckCircle2 size={14} />
                  </div>
                  <span className="font-medium text-ink/80">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const reviews = [
    { name: 'Sarah J.', text: 'Sesi aromaterapi sangat luar biasa. Saya merasa seperti orang baru setelahnya.', rating: 5 },
    { name: 'Michael R.', text: 'Staf profesional dan fasilitas sangat bersih. Sangat direkomendasikan!', rating: 5 },
    { name: 'Elena W.', text: 'Refleksi terbaik di kota. Terapis benar-benar tahu titik tekan mereka.', rating: 4 }
  ];

  return (
    <section className="py-24 bg-brown text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif mb-4">Apa Kata Tamu Kami</h2>
          <div className="w-24 h-1 bg-white/20 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/10"
            >
              <div className="flex mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" className="text-yellow-400" />
                ))}
              </div>
              <p className="italic mb-6 text-white/80">"{review.text}"</p>
              <p className="font-bold tracking-widest uppercase text-xs">— {review.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  return (
    <footer className="bg-ink text-white/90 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-serif font-bold mb-6 tracking-tighter">CANWELNES</h3>
            <p className="text-white/50 text-sm leading-relaxed mb-8">
              Tempat perlindungan premium Anda untuk kesehatan holistik dan peremajaan. Rasakan seni relaksasi.
            </p>
            <div className="flex space-x-4">
              <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brown transition-colors">
                <Instagram size={18} />
              </button>
              <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brown transition-colors">
                <Facebook size={18} />
              </button>
              <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brown transition-colors">
                <Twitter size={18} />
              </button>
            </div>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-white/30">Tautan Cepat</h4>
            <ul className="space-y-4">
              {['Beranda', 'Tentang', 'Layanan', 'Terapis', 'Booking', 'Kontak'].map((item) => (
                <li key={item}>
                  <button 
                    onClick={() => onNavigate(item === 'Beranda' ? 'home' : item === 'Tentang' ? 'about' : item === 'Layanan' ? 'services' : item === 'Terapis' ? 'therapists' : item === 'Kontak' ? 'contact' : item.toLowerCase())}
                    className="text-sm hover:text-brown transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-white/30">Hubungi Kami</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-sm">
                <MapPin size={18} className="text-brown shrink-0" />
                <span className="text-white/50">Jl. Wellness No. 123, Jakarta Selatan, Indonesia</span>
              </li>
              <li className="flex items-center space-x-3 text-sm">
                <Phone size={18} className="text-brown shrink-0" />
                <span className="text-white/50">+62 819 3559 3614</span>
              </li>
              <li className="flex items-center space-x-3 text-sm">
                <Calendar size={18} className="text-brown shrink-0" />
                <span className="text-white/50">Sen - Min: 09:00 - 21:00</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-white/30">Buletin</h4>
            <p className="text-xs text-white/40 mb-4">Berlangganan untuk mendapatkan penawaran khusus dan tips kesehatan.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Email Anda" 
                className="bg-white/5 border border-white/10 px-4 py-2 rounded-l-xl text-sm focus:outline-none focus:border-brown w-full"
              />
              <button className="bg-brown px-4 py-2 rounded-r-xl hover:bg-brown-dark transition-colors">
                Gabung
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center text-xs text-white/30">
          <p>© 2026 Canwelnes Spa & Wellness. Hak cipta dilindungi undang-undang.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <button className="hover:text-white">Kebijakan Privasi</button>
            <button className="hover:text-white">Ketentuan Layanan</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleNavigate = (page: string) => {
    setActivePage(page);
    if (page === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(page);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      <Navbar onNavigate={handleNavigate} />
      
      <main>
        <Hero onBook={() => setIsBookingOpen(true)} />
        <Services />
        <About />
        <Therapists onSelect={(t) => setSelectedTherapist(t)} />
        <Testimonials />
      </main>

      <Footer onNavigate={handleNavigate} />

      {/* Overlays */}
      <AnimatePresence>
        {selectedTherapist && (
          <TherapistDetail 
            therapist={selectedTherapist} 
            onBack={() => setSelectedTherapist(null)}
            onBook={() => {
              setSelectedTherapist(null);
              setIsBookingOpen(true);
            }}
          />
        )}
        {isBookingOpen && (
          <BookingSystem onClose={() => setIsBookingOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
