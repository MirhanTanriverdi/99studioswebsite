import { useRef, useEffect } from 'react';
import { Renderer, Program, Triangle, Mesh, Texture } from 'ogl';

import './HalftoneReveal.css';

const DEFAULT_SRC = 'https://picsum.photos/seed/halftone-reveal/1200/800';

const hexToRgb = hex => {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex || '');
  return m ? [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255] : [0, 0, 0];
};

const MODES = { mono: 0, duotone: 1, color: 2 };
// `shade` (4) is a local addition: continuous-tone duotone with no dot screen.
const SHAPES = { circle: 0, square: 1, diamond: 2, line: 3, shade: 4 };
const TRIGGERS = { off: 0, hover: 1, always: 2 };

const vertex = `#version 300 es
in vec2 position;
out vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `#version 300 es
precision highp float;

uniform sampler2D tMap;
uniform vec2 iResolution;
uniform vec2 uImageSize;
uniform vec2 uMouse;
uniform float uActivity;

uniform float uDotSize;
uniform float uDensity;
uniform float uAngle;
uniform int uShape;
uniform vec3 uInk;
uniform vec3 uInkTop;
uniform float uTopStart;
uniform float uTopLift;
uniform vec3 uPaper;
uniform int uMode;
uniform float uContrast;
uniform float uInvert;

uniform float uRevealRadius;
uniform float uRevealAspect;
uniform float uEdge;
uniform float uIdleReveal;
uniform int uTrigger;

in vec2 vUv;
out vec4 fragColor;

vec2 uAspect() {
  return vec2(iResolution.x / max(iResolution.y, 1.0), 1.0);
}

vec2 coverUv(vec2 uv) {
  float ia = uImageSize.x / max(uImageSize.y, 1.0);
  float pa = iResolution.x / max(iResolution.y, 1.0);
  vec2 s = pa > ia ? vec2(1.0, ia / pa) : vec2(pa / ia, 1.0);
  return (uv - 0.5) * s + 0.5;
}

vec3 gradeRGB(vec3 c) {
  c = clamp((c - 0.5) * uContrast + 0.5, 0.0, 1.0);
  return mix(c, 1.0 - c, uInvert);
}

float shapeDist(vec2 f) {
  if (uShape == 1) return max(abs(f.x), abs(f.y));
  if (uShape == 2) return abs(f.x) + abs(f.y);
  if (uShape == 3) return abs(f.y);
  return length(f);
}

mat2 rot(float a) {
  float c = cos(a);
  float s = sin(a);
  return mat2(c, -s, s, c);
}

vec4 sampleCell(vec2 st, float dens, float ang) {
  vec2 rp = rot(ang) * st * dens;
  vec2 center = floor(rp) + 0.5;
  vec2 stC = rot(-ang) * (center / dens);
  vec2 uvC = stC / uAspect();
  return texture(tMap, clamp(coverUv(uvC), 0.0, 1.0));
}

float coverage(vec2 st, float dens, float ang, float ink, float rscale) {
  vec2 rp = rot(ang) * st * dens;
  vec2 f = fract(rp) - 0.5;
  float d = shapeDist(f);
  float r = sqrt(clamp(ink, 0.0, 1.0)) * 0.72 * rscale * uDotSize;
  float w = length(fwidth(rp)) * 0.6 + 1e-4;
  return smoothstep(r + w, r - w, d);
}

void main() {
  vec2 aspect = uAspect();
  vec2 st = vUv * aspect;
  float ang = radians(uAngle);

  vec2 duv = (vUv - uMouse) * aspect;
  // Squash the vertical axis of the falloff so the reveal is a wide ellipse
  // rather than a circle. uRevealAspect = 1 restores the original shape.
  float dist = length(vec2(duv.x, duv.y * max(uRevealAspect, 1e-4)));

  float act = uTrigger == 2 ? 1.0 : (uTrigger == 0 ? 0.0 : uActivity);
  float radius = max(uRevealRadius, 1e-4) * mix(0.4, 1.0, act);

  float px = 1.4 / max(iResolution.y, 1.0);
  float band = max(px, radius * (1.0 - clamp(uEdge, 0.0, 1.0)) * 0.45);
  float loupe = 1.0 - smoothstep(radius - band, radius + band, dist);
  float focus = clamp(max(loupe * act, uIdleReveal), 0.0, 1.0);

  float dens = uDensity;

  vec3 print;
  if (uMode == 2) {
    vec3 gc = gradeRGB(sampleCell(st, dens, ang + radians(15.0)).rgb);
    vec3 gm = gradeRGB(sampleCell(st, dens, ang + radians(75.0)).rgb);
    vec3 gy = gradeRGB(sampleCell(st, dens, ang).rgb);
    vec3 gk = gradeRGB(sampleCell(st, dens, ang + radians(45.0)).rgb);
    float c = 1.0 - gc.r;
    float m = 1.0 - gm.g;
    float y = 1.0 - gy.b;
    float k = 1.0 - dot(gk, vec3(0.299, 0.587, 0.114));
    float gcr = min(min(c, m), y) * 0.5;
    c = clamp(c - gcr, 0.0, 1.0);
    m = clamp(m - gcr, 0.0, 1.0);
    y = clamp(y - gcr, 0.0, 1.0);
    k = clamp(max(gcr, k * k * 0.9), 0.0, 1.0);
    float covC = coverage(st, dens, ang + radians(15.0), c, 0.82);
    float covM = coverage(st, dens, ang + radians(75.0), m, 0.82);
    float covY = coverage(st, dens, ang, y, 0.82);
    float covK = coverage(st, dens, ang + radians(45.0), k, 0.78);
    print = uPaper;
    print = mix(print, print * vec3(0.10, 0.72, 0.90), covC);
    print = mix(print, print * vec3(0.92, 0.10, 0.52), covM);
    print = mix(print, print * vec3(0.98, 0.86, 0.10), covY);
    print = mix(print, print * vec3(0.08), covK);
  } else if (uMode == 1) {
    vec3 ink2 = mix(uInk.gbr, vec3(0.90, 0.24, 0.30), 0.7);
    float lumA = dot(gradeRGB(sampleCell(st, dens, ang).rgb), vec3(0.299, 0.587, 0.114));
    float lumB = dot(gradeRGB(sampleCell(st, dens, ang + radians(38.0)).rgb), vec3(0.299, 0.587, 0.114));
    float covA = coverage(st, dens, ang, 1.0 - lumA, 1.0);
    float covB = coverage(st, dens, ang + radians(38.0), pow(1.0 - lumB, 1.4), 0.92);
    print = uPaper;
    print = mix(print, ink2, covB * 0.85);
    print = mix(print, uInk, covA);
  } else if (uShape == 4) {
    // Continuous-tone duotone: sample per pixel rather than per dot cell, and
    // ramp straight from paper (shadows) to ink (highlights). No screen, so the
    // tonal order stays photographic instead of reading as a negative.
    vec3 src = gradeRGB(texture(tMap, clamp(coverUv(vUv), 0.0, 1.0)).rgb);
    float lum = dot(src, vec3(0.299, 0.587, 0.114));
    // Ramp the highlight ink toward uInkTop over the upper part of the frame.
    // vUv.y = 1 is the top edge. Shadows stay on uPaper so only the lit areas
    // pick up the tint.
    float topRamp = smoothstep(uTopStart, 1.0, vUv.y);
    vec3 base = mix(uPaper, uInk, lum);
    // In the top band, render the image as shades of uInkTop rather than
    // ramping out of near-black: uTopLift sets the darkest shade, so even
    // unlit areas stay recognisably the same hue instead of going muddy.
    vec3 topShades = uInkTop * (uTopLift + (1.0 - uTopLift) * lum);
    print = mix(base, topShades, topRamp);
  } else {
    float lum = dot(gradeRGB(sampleCell(st, dens, ang).rgb), vec3(0.299, 0.587, 0.114));
    float cov = coverage(st, dens, ang, 1.0 - lum, 1.0);
    print = mix(uPaper, uInk, cov);
  }

  float t = clamp(dist / radius, 0.0, 1.0);
  float bend = t * t * t * t;
  vec2 dir = dist > 1e-5 ? duv / dist : vec2(0.0);
  // Scale the lens displacement and chromatic aberration by cursor activity.
  // Upstream applies them unconditionally, so bend saturates to 1 beyond the
  // loupe radius and any non-zero uIdleReveal smears colour fringing across the
  // whole frame. Gating on act keeps the resting image clean while preserving
  // the full lens effect under the cursor.
  float lens = act * loupe;
  vec2 off = dir * bend * radius * 0.22 / aspect * lens;
  vec2 ca = dir * bend * 0.0045 / aspect * lens;
  vec3 sharp = gradeRGB(vec3(
    texture(tMap, clamp(coverUv(vUv - off - ca), 0.0, 1.0)).r,
    texture(tMap, clamp(coverUv(vUv - off), 0.0, 1.0)).g,
    texture(tMap, clamp(coverUv(vUv - off + ca), 0.0, 1.0)).b
  ));

  vec3 col = mix(print, sharp, focus);
  fragColor = vec4(col, 1.0);
}
`;

const HalftoneReveal = ({
  src = DEFAULT_SRC,
  inkColor = '#141414',
  // Optional second highlight ink blended in toward the top edge (shade mode).
  // Defaults to inkColor, making the ramp a no-op.
  inkColorTop = null,
  topStart = 0.8,
  // Darkest shade of inkColorTop in the top band (0 = black, 1 = flat colour).
  topLift = 0.4,
  paperColor = '#fff7e6',
  mode = 'mono',
  dotSize = 1,
  dotDensity = 71,
  angle = 45,
  shape = 'circle',
  contrast = 1.15,
  invert = false,
  revealRadius = 0.4,
  // >1 squashes the reveal vertically into a wide ellipse; 1 = circle.
  revealAspect = 1,
  edge = 0.8,
  follow = 0.37,
  idleReveal = 0,
  trigger = 'hover',
  borderRadius = '16px',
  className = '',
  style
}) => {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const uniformsRef = useRef(null);
  const rafRef = useRef(null);
  const kickRef = useRef(null);
  const followRef = useRef(follow);
  const mouseRef = useRef({ x: 0.5, y: 0.5, sx: 0.5, sy: 0.5, active: 0, target: 0 });

  useEffect(() => {
    followRef.current = follow;
  }, [follow]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Phones: cap the backing store at 1.5x. The shader runs once per device
    // pixel, so 2x vs 1.5x is ~1.8x the GPU work for no visible difference
    // under a halftone/duotone effect. A full-screen triangle needs no MSAA.
    const coarse =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(pointer: coarse)').matches;
    const renderer = new Renderer({
      dpr: Math.min(window.devicePixelRatio || 1, coarse ? 1.5 : 2),
      alpha: false,
      antialias: false
    });
    rendererRef.current = renderer;
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 1);
    gl.canvas.style.width = '100%';
    gl.canvas.style.height = '100%';
    gl.canvas.style.display = 'block';
    container.appendChild(gl.canvas);

    const texture = new Texture(gl, { generateMipmaps: false });

    const uniforms = {
      tMap: { value: texture },
      iResolution: { value: [1, 1] },
      uImageSize: { value: [1, 1] },
      uMouse: { value: [0.5, 0.5] },
      uActivity: { value: 0 },
      uDotSize: { value: dotSize },
      uDensity: { value: dotDensity },
      uAngle: { value: angle },
      uShape: { value: SHAPES[shape] ?? 0 },
      uInk: { value: hexToRgb(inkColor) },
      uInkTop: { value: hexToRgb(inkColorTop || inkColor) },
      uTopStart: { value: topStart },
      uTopLift: { value: topLift },
      uPaper: { value: hexToRgb(paperColor) },
      uMode: { value: MODES[mode] ?? 0 },
      uContrast: { value: contrast },
      uInvert: { value: invert ? 1 : 0 },
      uRevealRadius: { value: revealRadius },
      uRevealAspect: { value: revealAspect },
      uEdge: { value: edge },
      uIdleReveal: { value: idleReveal },
      uTrigger: { value: TRIGGERS[trigger] ?? 1 }
    };
    uniformsRef.current = uniforms;

    const program = new Program(gl, { vertex, fragment, uniforms });
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

    // Render on demand: the image is static, so frames are only needed while
    // the pointer reveal is easing, after a resize, or when the texture lands.
    // The loop stops itself once everything has settled, and never runs while
    // the canvas is off-screen or the tab is hidden.
    let visible = true;
    let prev = performance.now();
    const settled = () => {
      const m = mouseRef.current;
      return (
        Math.abs(m.target - m.active) < 0.001 &&
        (m.active < 0.001 || (Math.abs(m.x - m.sx) < 0.0005 && Math.abs(m.y - m.sy) < 0.0005))
      );
    };
    const loop = now => {
      rafRef.current = null;
      const dt = Math.min(0.05, Math.max(0.001, (now - prev) / 1000));
      prev = now;

      const m = mouseRef.current;
      const a = 1 - Math.exp(-dt / Math.max(0.001, followRef.current));
      m.sx += (m.x - m.sx) * a;
      m.sy += (m.y - m.sy) * a;
      const ba = 1 - Math.exp(-dt / 0.18);
      m.active += (m.target - m.active) * ba;

      uniforms.uMouse.value[0] = m.sx;
      uniforms.uMouse.value[1] = m.sy;
      uniforms.uActivity.value = m.active;

      renderer.render({ scene: mesh });

      if (visible && !document.hidden && !settled()) {
        rafRef.current = requestAnimationFrame(loop);
      }
    };
    const kick = () => {
      if (rafRef.current || !visible || document.hidden) return;
      prev = performance.now();
      rafRef.current = requestAnimationFrame(loop);
    };

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = src;
    img.onload = () => {
      texture.image = img;
      uniforms.uImageSize.value = [img.naturalWidth, img.naturalHeight];
      kick();
    };

    const resize = () => {
      const w = container.clientWidth || 1;
      const h = container.clientHeight || 1;
      renderer.setSize(w, h);
      uniforms.iResolution.value = [gl.canvas.width, gl.canvas.height];
      kick();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) kick();
    });
    io.observe(container);
    const onVisibility = () => {
      if (!document.hidden) kick();
    };
    document.addEventListener('visibilitychange', onVisibility);

    const onMove = e => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = (e.clientX - rect.left) / rect.width;
      mouseRef.current.y = 1 - (e.clientY - rect.top) / rect.height;
      mouseRef.current.target = reduced ? 0 : 1;
      kick();
    };
    const onLeave = () => {
      mouseRef.current.target = 0;
      kick();
    };
    container.addEventListener('pointermove', onMove, { passive: true });
    container.addEventListener('pointerenter', onMove, { passive: true });
    container.addEventListener('pointerleave', onLeave, { passive: true });

    kickRef.current = kick;
    kick();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      container.removeEventListener('pointermove', onMove);
      container.removeEventListener('pointerenter', onMove);
      container.removeEventListener('pointerleave', onLeave);
      const ext = gl.getExtension('WEBGL_lose_context');
      if (ext) ext.loseContext();
      if (gl.canvas.parentNode) gl.canvas.parentNode.removeChild(gl.canvas);
      rendererRef.current = null;
      uniformsRef.current = null;
      kickRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  useEffect(() => {
    const u = uniformsRef.current;
    if (!u) return;
    u.uDotSize.value = dotSize;
    u.uDensity.value = dotDensity;
    u.uAngle.value = angle;
    u.uShape.value = SHAPES[shape] ?? 0;
    u.uInk.value = hexToRgb(inkColor);
    u.uInkTop.value = hexToRgb(inkColorTop || inkColor);
    u.uTopStart.value = topStart;
    u.uTopLift.value = topLift;
    u.uPaper.value = hexToRgb(paperColor);
    u.uMode.value = MODES[mode] ?? 0;
    u.uContrast.value = contrast;
    u.uInvert.value = invert ? 1 : 0;
    u.uRevealRadius.value = revealRadius;
    u.uRevealAspect.value = revealAspect;
    u.uEdge.value = edge;
    u.uIdleReveal.value = idleReveal;
    u.uTrigger.value = TRIGGERS[trigger] ?? 1;
    kickRef.current?.();
  }, [
    dotSize,
    dotDensity,
    angle,
    shape,
    inkColor,
    inkColorTop,
    topStart,
    topLift,
    paperColor,
    mode,
    contrast,
    invert,
    revealRadius,
    revealAspect,
    edge,
    idleReveal,
    trigger
  ]);

  return (
    <div ref={containerRef} className={`halftone-reveal ${className}`.trim()} style={{ borderRadius, ...style }} />
  );
};

export default HalftoneReveal;
