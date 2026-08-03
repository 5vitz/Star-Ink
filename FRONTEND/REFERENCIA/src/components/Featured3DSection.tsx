import { useState } from 'react';
import { motion } from 'motion/react';
import { Rotate3d, Palette, Info, Box, Image as ImageIcon, ArrowRight } from 'lucide-react';
import { BYD_CARS } from '../constants';
import Car3DView from './Car3DView';
import ErrorBoundary from './ErrorBoundary';

const COLORS = [
  { name: 'Branco Neve', hex: '#FFFFFF' },
  { name: 'Cinza Cosmos', hex: '#4A4A4A' },
  { name: 'Azul Oceano', hex: '#1E3A8A' },
  { name: 'Preto Noite', hex: '#000000' },
];

const ANGLES = [
  { id: 'front', label: 'Frente', suffix: '?q=80&w=1200&auto=format&fit=crop&auto=compress' },
  { id: 'side', label: 'Lateral', suffix: '?q=80&w=1200&auto=format&fit=crop&auto=compress&sat=-100' },
  { id: 'back', label: 'Traseira', suffix: '?q=80&w=1200&auto=format&fit=crop&auto=compress&hue=200' },
  { id: 'interior', label: 'Interior', suffix: '?q=80&w=1200&auto=format&fit=crop&auto=compress&blur=2' },
];

export default function Featured3DSection() {
  const car = BYD_CARS.find(c => c.id === 'sealion-7') || BYD_CARS[BYD_CARS.length - 1];
  const [activeColor, setActiveColor] = useState(COLORS[0]);
  const [viewMode, setViewMode] = useState<'2d' | '3d'>('3d');
  const [activeAngle, setActiveAngle] = useState(ANGLES[0]);

  return (
    <section className="py-12 bg-black border-b border-white/5">
      <div className="container mx-auto px-6">
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Viewport */}
          <div className="w-full lg:w-3/4 aspect-video rounded-[2.5rem] overflow-hidden bg-black border border-white/10 shadow-[0_0_100px_rgba(59,130,246,0.05)] relative">
            {viewMode === '2d' ? (
              <div className="w-full h-full relative">
                <motion.img
                  key={activeAngle.id + activeColor.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  src={car.image + activeAngle.suffix}
                  alt={`${car.name} ${activeAngle.label}`}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 bg-black/40 backdrop-blur-md p-2 rounded-full border border-white/10">
                  {ANGLES.map((angle) => (
                    <button
                      key={angle.id}
                      onClick={() => setActiveAngle(angle)}
                      className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                        activeAngle.id === angle.id 
                          ? 'bg-blue-600 text-white' 
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      {angle.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <ErrorBoundary fallback={
                <div className="w-full h-full relative group">
                  <img 
                    src={car.image} 
                    alt={car.name} 
                    className="w-full h-full object-cover opacity-50 grayscale"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 text-center p-8">
                    <Rotate3d className="w-12 h-12 text-blue-500/50 mb-4" />
                    <h3 className="text-white font-bold mb-2 text-lg">Visualização 3D Indisponível</h3>
                    <p className="text-zinc-400 text-sm max-w-xs mb-6">
                      Seu navegador ou dispositivo encontrou uma limitação ao renderizar o modelo 3D.
                    </p>
                    <button 
                      onClick={() => window.location.reload()}
                      className="px-8 py-3 bg-blue-600 text-white text-sm font-bold rounded-full hover:bg-blue-500 transition-all"
                    >
                      Tentar Recarregar
                    </button>
                  </div>
                </div>
              }>
                <Car3DView carName={car.name} carColor={activeColor.hex} />
              </ErrorBoundary>
            )}
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-1/4 flex flex-col gap-6">
            <div className="bg-zinc-900/50 border border-white/10 p-6 rounded-[2rem]">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2 text-sm">
                <Palette className="w-4 h-4 text-blue-500" />
                Personalizar
              </h3>
              <div className="grid grid-cols-4 gap-3">
                {COLORS.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setActiveColor(color)}
                    className="group flex flex-col items-center gap-1 transition-transform hover:scale-110"
                  >
                    <div 
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        activeColor.name === color.name ? 'border-blue-500 scale-110 shadow-lg shadow-blue-500/20' : 'border-white/10'
                      }`}
                      style={{ backgroundColor: color.hex }}
                    />
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-zinc-500 mt-4 uppercase tracking-widest text-center">
                {activeColor.name}
              </p>
            </div>

            <div className="bg-zinc-900/50 border border-white/10 p-6 rounded-[2rem]">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2 text-sm">
                <Info className="w-4 h-4 text-blue-500" />
                Destaque
              </h3>
              <p className="text-zinc-400 text-xs leading-relaxed mb-6">
                O {car.name} combina performance esportiva com a mais avançada tecnologia de baterias Blade da BYD.
              </p>
              <button 
                onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full bg-blue-600 text-white text-[10px] font-bold py-3 rounded-xl hover:bg-blue-500 transition-all uppercase tracking-widest flex items-center justify-center gap-2"
              >
                Ver Especificações Completas
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => setViewMode(viewMode === '3d' ? '2d' : '3d')}
                className="flex-1 bg-zinc-900 border border-white/10 text-white text-[10px] font-bold py-3 rounded-xl hover:bg-zinc-800 transition-all uppercase tracking-widest"
              >
                {viewMode === '3d' ? 'Ver Fotos' : 'Ver 3D'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
