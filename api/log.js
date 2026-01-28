export default function handler(req, res) {
  // 1. Configuración CORS (Permite que tu web envíe datos al backend)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Si es una petición de prueba del navegador (OPTIONS), respondemos OK y salimos.
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // === EL FIX CRÍTICO ===
    // Preguntamos: ¿req.body es texto? Si sí, parseealo.
    // ¿No es texto? (entonces ya es objeto), úsalo directamente.
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    // Extraemos el dato con seguridad (usamos || para evitar fallos si viene vacío)
    const tipo = body.status || body.tipo || 'DESCONOCIDO';
    const ip = req.headers['x-forwarded-for'] || 'IP_Anonima';
    const userAgent = req.headers['user-agent'] || 'Desconocido';

    // 2. LOG (Esto es lo que verás en Vercel)
    // Usamos JSON.stringify para que el log sea legible y estructurado
    console.log(JSON.stringify({
      level: 'INFO',
      event: 'QR_SCAN',
      cliente: tipo,
      ip: ip,
      ua: userAgent
    }));

    // 3. Respuesta rápida
    return res.status(200).json({ success: true });

  } catch (error) {
    // Si falla, registramos el error pero no rompemos la ejecución visual del usuario
    console.error('Error en log:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}