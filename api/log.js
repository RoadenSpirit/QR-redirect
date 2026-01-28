export default function handler(req, res) {
  // 1. Headers CORS (Estrictamente necesarios para que el navegador no bloquee)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Si es pre-flight, cortamos aquí (0ms de procesamiento extra)
  if (req.method === 'OPTIONS') return res.status(200).end();

  // 2. Ejecución Directa (Sin validaciones, confiamos en la infraestructura)
  // Usamos el body directo. El operador '|| {}' es la única protección necesaria para evitar crash si llega vacío.
  const body = req.body || {};
  
  // 3. Log (Lo que te interesa)
  console.log(JSON.stringify({
    event: 'SCAN',
    cliente: body.status || 'UNKNOWN',
    ip: req.headers['x-forwarded-for'] || 'IP_HIDDEN',
    time: new Date().toISOString()
  }));

  // 4. Salida inmediata
  return res.status(200).json({ ok: 1 });
}