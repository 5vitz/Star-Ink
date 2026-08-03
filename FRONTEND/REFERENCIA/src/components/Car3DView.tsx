import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Float, useGLTF, Center, Environment } from '@react-three/drei';
import { Suspense, useState, useEffect } from 'react';

function SealionModel({ path, color }: { path: string, color?: string }) {
  const { scene } = useGLTF(path);
  
  useEffect(() => {
    if (!scene || !color) return;
    
    scene.traverse((child) => {
      if ((child as any).isMesh) {
        const mesh = child as any;
        if (mesh.material) {
          // Handle both single material and array of materials
          const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
          
          materials.forEach((mat) => {
            if (!mat._isCloned) {
              const newMat = mat.clone();
              newMat._isCloned = true;
              // If it was an array, we need to update the specific index
              if (Array.isArray(mesh.material)) {
                const index = mesh.material.indexOf(mat);
                mesh.material[index] = newMat;
              } else {
                mesh.material = newMat;
              }
            }

            const matName = (mat.name || '').toLowerCase();
            const meshName = (mesh.name || '').toLowerCase();
            
            // Body Paint Logic
            if (
              matName.includes('paint') || 
              matName.includes('body') ||
              matName.includes('exterior') ||
              matName.includes('metal') ||
              matName.includes('car_color') ||
              meshName.includes('body') ||
              meshName.includes('paint') ||
              meshName.includes('shell') ||
              meshName.includes('exterior')
            ) {
              try {
                if (mat.color) {
                  mat.color.set(color);
                  mat.roughness = 0.15;
                  mat.metalness = 0.85;
                }
              } catch (e) {}
            }

            // Glass Transparency Logic
            if (
              matName.includes('glass') || 
              matName.includes('window') ||
              meshName.includes('glass') ||
              meshName.includes('window') ||
              matName.includes('transp')
            ) {
              try {
                mat.transparent = true;
                mat.opacity = 0.3;
                mat.metalness = 1;
                mat.roughness = 0;
                mat.color.set('#111111');
              } catch (e) {}
            }
          });
        }
      }
    });
  }, [scene, color]);

  if (!scene) return null;
  return <primitive object={scene} scale={4.2} />;
}

function FallbackCar() {
  return (
    <group>
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[3.5, 0.8, 1.8]} />
        <meshStandardMaterial color="#1e40af" metalness={0.7} roughness={0.2} />
      </mesh>
      <mesh position={[-0.4, 1.1, 0]} castShadow>
        <boxGeometry args={[1.8, 0.6, 1.5]} />
        <meshStandardMaterial color="#60a5fa" metalness={0.9} roughness={0.1} transparent opacity={0.7} />
      </mesh>
    </group>
  );
}

export default function Car3DView({ 
  hideOverlays = false, 
  carName,
  carColor
}: { 
  hideOverlays?: boolean, 
  carName?: string,
  carColor?: string
}) {
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [isTimedOut, setIsTimedOut] = useState(false);
  const [detectedPath, setDetectedPath] = useState<string | null>(null);
  const isRealModel = carName === 'BYD Sealion 7';

  useEffect(() => {
    setError(null);
    setIsTimedOut(false);
    setDetectedPath(null);
    const filesToTry = ['/Sealion.glb', '/sealion_v2.glb', '/sealion.glb'];
    
    // Set a timeout for loading
    const timer = setTimeout(() => {
      setIsTimedOut(true);
    }, 10000); // 10 seconds timeout

    const checkFiles = async () => {
      console.log('Iniciando verificação de arquivos 3D...');
      for (const file of filesToTry) {
        try {
          const res = await fetch(file, { method: 'HEAD' });
          if (res.ok) {
            const contentType = res.headers.get('content-type');
            if (contentType && !contentType.includes('text/html')) {
              console.log(`Arquivo encontrado: ${file}`);
              setDetectedPath(file);
              clearTimeout(timer);
              return; 
            }
          }
        } catch (e) {
          console.error(`Erro ao checar ${file}:`, e);
        }
      }
      
      // If we get here, no file was found
      setError("O arquivo Sealion.glb ainda não foi detectado pelo servidor. Tente fazer o upload novamente na pasta public.");
      clearTimeout(timer);
    };

    checkFiles();
    return () => clearTimeout(timer);
  }, [retryCount]);

  return (
    <div className="w-full h-full bg-[#050505] rounded-3xl relative overflow-hidden border border-white/5 flex items-center justify-center">
      <Suspense fallback={
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
          <p className="text-zinc-500 text-[10px] font-mono uppercase tracking-widest">Carregando...</p>
        </div>
      }>
        <Canvas 
          dpr={1} 
          camera={{ position: [6, 0.8, 6], fov: 15 }}
          style={{ background: '#000000' }}
        >
          <ambientLight intensity={1.0} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <directionalLight position={[-10, 5, -5]} intensity={0.8} />
          <spotLight position={[0, 10, 0]} intensity={1.2} distance={20} angle={0.5} />
          
          <Suspense fallback={null}>
            <Center>
              {(error || isTimedOut || !detectedPath) ? (
                <FallbackCar />
              ) : (
                <SealionModel path={detectedPath} color={carColor} />
              )}
            </Center>
          </Suspense>

          <OrbitControls 
            enablePan={false} 
            enableZoom={!hideOverlays}
            minPolarAngle={Math.PI / 4} 
            maxPolarAngle={Math.PI / 2.1} 
            autoRotate
            autoRotateSpeed={0.4}
            makeDefault 
          />
        </Canvas>
      </Suspense>

      {error && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6 text-center">
          <div className="max-w-md">
            <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-6 h-6 text-red-500">⚠️</div>
            </div>
            <h3 className="text-white font-medium mb-2">Erro de Carregamento</h3>
            <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
              {error}
            </p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => setRetryCount(prev => prev + 1)}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-full transition-colors"
              >
                Tentar Novamente
              </button>
              <button 
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-medium rounded-full transition-colors"
              >
                Recarregar Página Inteira
              </button>
              <p className="text-zinc-500 text-[10px] uppercase tracking-widest">
                Ou verifique se o arquivo Sealion.glb está na pasta public
              </p>
            </div>
          </div>
        </div>
      )}

      {!hideOverlays && (
        <>
          {/* Technical UI Overlay */}
          <div className="absolute top-6 left-6 pointer-events-none space-y-2">
            <div className="bg-blue-600/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-blue-500/20">
              <p className="text-[9px] text-blue-400 uppercase tracking-widest font-bold flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                {isRealModel ? 'Showroom Digital BYD' : 'Showroom Digital (Demo)'}
              </p>
            </div>
          </div>

          <div className="absolute bottom-6 right-6 text-right pointer-events-none">
            <p className="text-zinc-500 text-[9px] uppercase tracking-widest leading-relaxed">
              {isRealModel ? 'Modelo Oficial BYD' : 'Modelo de Referência'}<br />
              <span className="text-blue-500/50">
                {isRealModel ? 'Sealion 7 — High Performance' : `Visualizando ${carName} (Demo Sealion)`}
              </span>
            </p>
          </div>

          {/* Interaction Guide */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none">
            <p className="text-[8px] text-zinc-700 uppercase tracking-[0.3em] font-bold">
              Interação 3D Habilitada
            </p>
          </div>
        </>
      )}
    </div>
  );
}
