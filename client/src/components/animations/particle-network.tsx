import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulsePhase: number;
  isHub: boolean;
}

interface DataPacket {
  fromIdx: number;
  toIdx: number;
  progress: number;
  speed: number;
  color: string;
}

const PRIMARY = "251, 179, 5";
const ACCENT  = "96, 165, 250";
const GREEN   = "74, 222, 128";

export function ParticleNetwork({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 0;
    const resize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W;
      canvas.height = H;
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    const NODE_COUNT = 42;
    const HUB_COUNT = 6;
    const CONNECTION_DIST = 160;
    const PACKET_COLORS = [PRIMARY, ACCENT, GREEN];

    const nodes: Node[] = Array.from({ length: NODE_COUNT }, (_, i) => {
      const isHub = i < HUB_COUNT;
      return {
        x: Math.random() * (W || 800),
        y: Math.random() * (H || 600),
        vx: (Math.random() - 0.5) * (isHub ? 0.15 : 0.3),
        vy: (Math.random() - 0.5) * (isHub ? 0.15 : 0.3),
        radius: isHub ? 3.5 + Math.random() * 1.5 : 1 + Math.random() * 1.5,
        pulsePhase: Math.random() * Math.PI * 2,
        isHub,
      };
    });

    const packets: DataPacket[] = [];

    function spawnPacket() {
      const conns: [number, number][] = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          if (dx * dx + dy * dy < CONNECTION_DIST * CONNECTION_DIST) {
            conns.push([i, j]);
          }
        }
      }
      if (conns.length === 0) return;
      const [a, b] = conns[Math.floor(Math.random() * conns.length)];
      const dir = Math.random() > 0.5;
      packets.push({
        fromIdx: dir ? a : b,
        toIdx: dir ? b : a,
        progress: 0,
        speed: 0.008 + Math.random() * 0.012,
        color: PACKET_COLORS[Math.floor(Math.random() * PACKET_COLORS.length)],
      });
    }

    let animId: number;
    let t = 0;
    let spawnTimer = 0;

    const draw = () => {
      t += 0.006;
      spawnTimer += 1;
      ctx.clearRect(0, 0, W, H);

      if (spawnTimer > 40 && packets.length < 8) {
        spawnPacket();
        spawnTimer = 0;
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distSq = dx * dx + dy * dy;
          const maxSq = CONNECTION_DIST * CONNECTION_DIST;
          if (distSq < maxSq) {
            const dist = Math.sqrt(distSq);
            const fade = 1 - dist / CONNECTION_DIST;
            const bothHub = nodes[i].isHub && nodes[j].isHub;
            const opacity = fade * (bothHub ? 0.35 : 0.18);
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(${PRIMARY}, ${opacity})`;
            ctx.lineWidth = bothHub ? 1 : 0.5;
            ctx.stroke();
          }
        }
      }

      for (let k = packets.length - 1; k >= 0; k--) {
        const pk = packets[k];
        pk.progress += pk.speed;
        if (pk.progress >= 1) {
          packets.splice(k, 1);
          continue;
        }
        const from = nodes[pk.fromIdx];
        const to = nodes[pk.toIdx];
        const px = from.x + (to.x - from.x) * pk.progress;
        const py = from.y + (to.y - from.y) * pk.progress;

        ctx.save();
        ctx.shadowColor = `rgba(${pk.color}, 0.8)`;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${pk.color}, 0.9)`;
        ctx.fill();
        ctx.restore();

        ctx.beginPath();
        ctx.arc(px, py, 5, 0, Math.PI * 2);
        const grd = ctx.createRadialGradient(px, py, 0, px, py, 5);
        grd.addColorStop(0, `rgba(${pk.color}, 0.25)`);
        grd.addColorStop(1, `rgba(${pk.color}, 0)`);
        ctx.fillStyle = grd;
        ctx.fill();
      }

      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;

        const pulse = 0.4 + 0.35 * Math.sin(t * 2 + n.pulsePhase);

        if (n.isHub) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius + 6, 0, Math.PI * 2);
          const glow = ctx.createRadialGradient(n.x, n.y, n.radius * 0.5, n.x, n.y, n.radius + 6);
          glow.addColorStop(0, `rgba(${PRIMARY}, ${pulse * 0.3})`);
          glow.addColorStop(1, `rgba(${PRIMARY}, 0)`);
          ctx.fillStyle = glow;
          ctx.fill();
          ctx.restore();

          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${PRIMARY}, ${pulse * 0.9})`;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius + 0.5, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${PRIMARY}, ${pulse * 0.4})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${PRIMARY}, ${pulse * 0.6})`;
          ctx.fill();
        }
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
}
