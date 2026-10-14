import 'dotenv/config'
import cors from 'cors'
import express from 'express'

const app = express()
const port = Number(process.env.PORT || 4000)

app.use(cors({ origin: process.env.CLIENT_ORIGIN || '*' }))
app.use(express.json())

// In-memory demo store for appointments
const demoAppointments = [
  {
    id: 'demo-appt-1',
    name: 'Priyanka Sen',
    phone: '+91 98765 12345',
    email: 'priyanka@example.com',
    service: 'royal-javanese-lulur',
    serviceName: 'Royal Javanese Lulur',
    location: 'BAAN Jubilee Hills Flagship',
    date: '2026-10-15',
    time: '11:00 AM',
    status: 'Pending',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'demo-appt-2',
    name: 'Kavita Chawla',
    phone: '+91 91234 56789',
    email: 'kavita@example.com',
    service: 'balinese-deep-tissue',
    serviceName: 'Authentic Balinese Deep Tissue Massage',
    location: 'BAAN Gachibowli Financial District',
    date: '2026-10-16',
    time: '03:30 PM',
    status: 'Approved',
    createdAt: new Date().toISOString(),
  },
]

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    service: 'baan-demo-api',
    mode: 'in-memory-demo',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  })
})

app.get('/api/appointments', (_req, res) => {
  res.json({ ok: true, appointments: demoAppointments })
})

app.post('/api/appointments', (req, res) => {
  const { name, phone, email, service, serviceName, location, date, time } = req.body || {}
  if (!name || !phone) {
    return res.status(400).json({ ok: false, error: 'Name and phone are required.' })
  }

  const newAppointment = {
    id: `appt-${Date.now()}`,
    name,
    phone,
    email: email || '',
    service: service || 'general',
    serviceName: serviceName || 'Bespoke Experience',
    location: location || 'Jubilee Hills',
    date: date || new Date().toISOString().slice(0, 10),
    time: time || '11:00 AM',
    status: 'Pending',
    createdAt: new Date().toISOString(),
  }

  demoAppointments.unshift(newAppointment)
  return res.status(201).json({ ok: true, appointment: newAppointment })
})

app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body || {}
  if (email && password) {
    return res.json({
      ok: true,
      token: 'demo-jwt-token-baan-admin',
      user: { email, role: 'admin' },
    })
  }
  return res.status(400).json({ ok: false, error: 'Email and password required' })
})

app.use((_req, res) => res.status(404).json({ ok: false, code: 'NOT_FOUND' }))

app.listen(port, () => console.log(`BAAN API listening on http://localhost:${port}`))
