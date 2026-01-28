export default function handler(req, res) {
  // Recibimos el dato: "Nuevo" o "Recurrente"
  const { tipo } = JSON.parse(req.body);
  
  // Esto aparece en tu pestaña de Logs de Vercel
  console.log(`[QR SCAN] Cliente: ${tipo} - IP: ${req.headers['x-forwarded-for'] || 'Anon'}`);
  
  // Cerramos la conexión rápido
  res.status(200).send('OK');
}