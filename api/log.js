export default function handler(req, res) {
  // Configuración CORS (Obligatorio para que acepte datos desde tu frontend)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Si es una petición de verificación (OPTIONS), terminamos aquí.
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // --- SOLUCIÓN DIRECTA ---
  // NO usamos JSON.parse().
  // Asumimos que Vercel ya convirtió el body en objeto.
  const { status, tipo } = req.body || {}; 

  // Unificamos variables por si envías 'status' o 'tipo'
  const cliente = status || tipo || 'DESCONOCIDO';
  const ip = req.headers['x-forwarded-for'] || 'IP_Anonima';

  // Log limpio en la consola de Vercel
  console.log(`[QR SCAN] Cliente: ${cliente} - IP: ${ip}`);

  // Respuesta 200 OK inmediata
  res.status(200).json({ ok: true });
}