// src/components/Hero3D.tsx (Versión simple sin Three.js)
'use client';

export default function Hero3D() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 relative overflow-hidden">
      {/* Orbes animados */}
      <div className="absolute inset-0">
        <div 
          className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float"
          style={{ 
            top: '10%', 
            left: '10%',
            animation: 'float 20s ease-in-out infinite'
          }}
        ></div>
        <div 
          className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float-delayed"
          style={{ 
            bottom: '10%', 
            right: '10%',
            animation: 'float 25s ease-in-out infinite 5s'
          }}
        ></div>
        <div 
          className="absolute w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-float-slow"
          style={{ 
            top: '50%', 
            left: '50%',
            transform: 'translate(-50%, -50%)',
            animation: 'float 30s ease-in-out infinite 10s'
          }}
        ></div>
      </div>
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-30" 
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          maskImage: 'radial-gradient(circle, black 0%, transparent 70%)'
        }}
      ></div>

      {/* Animación de partículas (determinística) */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => {
          // Usar valores determinísticos basados en el índice
          const positions = [
            { top: '70.46%', left: '13.24%' },
            { top: '29.41%', left: '52.65%' },
            { top: '73.17%', left: '70.89%' },
            { top: '2.93%', left: '5.06%' },
            { top: '4.63%', left: '42.56%' },
            { top: '74.79%', left: '81.38%' },
            { top: '38.63%', left: '5.00%' },
            { top: '96.34%', left: '7.43%' },
            { top: '80.58%', left: '93.11%' },
            { top: '72.85%', left: '62.92%' },
            { top: '23.26%', left: '8.84%' },
            { top: '11.47%', left: '50.28%' },
            { top: '55.19%', left: '89.53%' },
            { top: '31.14%', left: '86.04%' },
            { top: '43.92%', left: '7.45%' },
            { top: '44.29%', left: '11.86%' },
            { top: '28.59%', left: '23.13%' },
            { top: '90.51%', left: '77.62%' },
            { top: '21.83%', left: '10.40%' },
            { top: '30.20%', left: '66.03%' }
          ];

          const durations = [
            4.91, 2.58, 4.16, 4.72, 2.37, 3.04, 3.56, 3.47, 2.67, 3.90,
            4.42, 4.33, 2.31, 4.22, 2.29, 3.88, 2.11, 3.26, 3.46, 4.80
          ];

          const delays = [
            1.80, 0.86, 1.51, 1.07, 0.69, 0.10, 0.77, 0.49, 1.35, 0.75,
            1.31, 0.89, 1.57, 0.02, 1.74, 0.48, 0.77, 1.05, 0.72, 1.21
          ];

          return (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-50"
              style={{
                top: positions[i].top,
                left: positions[i].left,
                animation: `twinkle ${durations[i]}s ease-in-out infinite ${delays[i]}s`
              }}
            ></div>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-30px, 30px) scale(0.9); }
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}