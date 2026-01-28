export default function handler(req, res) {
  // Configuración de CORS (Importante para que no rechace la petición desde el navegador)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // 1. CORRECCIÓN DEL ERROR:
    // Verificamos si req.body ya es un objeto (lo cual Vercel hace auto) o si es string.
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    // 2. Extracción segura (Manejamos 'tipo' o 'status' para evitar fallos si cambias el frontend)
    // Nota: En el frontend enviamos { status: 'NUEVO' } o { tipo: 'NUEVO' }. Esto cubre ambos.
    const tipoCliente = body.tipo || body.status || 'DESCONOCIDO';

    // 3. Log en consola
    const ip = req.headers['x-forwarded-for'] || 'IP_Oculta';
    console.log(`[QR SCAN] Cliente: ${tipoCliente} - IP: ${ip}`);

    // 4. Respuesta Exitosa
    res.status(200).json({ ok: true });

  } catch (error) {
    // Si algo falla, lo registramos pero no rompemos nada crítico
    console.error('Error procesando log:', error);
    res.status(500).json({ error: 'Error interno' });
  }
}