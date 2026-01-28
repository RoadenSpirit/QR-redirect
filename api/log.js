export default function handler(req, res) {
  // 1. Configuración CORS (Vital para aceptar la petición)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Responder a pre-flight checks del navegador
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // --- LÓGICA BLINDADA ---
    let data = req.body;

    // Si por alguna razón Vercel no lo parseó y llega como texto, lo parseamos nosotros.
    // Si ya es un objeto (lo normal), saltamos este paso.
    if (typeof data === 'string') {
        try {
            data = JSON.parse(data);
        } catch (e) {
            console.error("No se pudo parsear el cuerpo:", e);
            data = {}; // Evitamos que falle si el JSON está roto
        }
    }

    // Aseguramos que data no sea null ni undefined
    data = data || {};

    // 2. Extracción de datos (Soporta 'status' o 'tipo')
    const cliente = data.status || data.tipo || 'DESCONOCIDO';
    const ip = req.headers['x-forwarded-for'] || 'IP_Anonima';
    const ua = req.headers['user-agent'] || 'UA_Desconocido';

    // 3. LOG (Esto aparecerá en tu consola de Vercel)
    console.log(JSON.stringify({
      level: 'INFO',
      event: 'VISIT_LOG',
      cliente: cliente,
      ip: ip,
      ua: ua,
      timestamp: new Date().toISOString()
    }));

    // 4. Respuesta Exitosa
    return res.status(200).json({ ok: true });

  } catch (error) {
    // Catch final para evitar Error 500 bajo cualquier circunstancia
    console.error('Error crítico en log:', error);
    return res.status(200).json({ status: 'error_handled' });
  }
}