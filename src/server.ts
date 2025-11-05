import express from 'express';
import path from 'path';

const app = express();
const PORT = 3005;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

interface Supplier {
  id: string;
  name: string;
  contact: string;
  category: string;
  rating: string;
  status: string;
  lastAudit: string;
  registered: string;
}

let suppliers: Supplier[] = [
  {
    id: '1',
    name: 'ABC Manufacturing Co.',
    contact: 'contact@abc.com',
    category: 'Raw Materials',
    rating: 'A',
    status: 'Approved',
    lastAudit: '2024-12-15',
    registered: '2024-01-10'
  },
  {
    id: '2',
    name: 'XYZ Components Ltd.',
    contact: 'info@xyz.com',
    category: 'Components',
    rating: 'B',
    status: 'Under Review',
    lastAudit: '2024-11-20',
    registered: '2024-03-05'
  }
];

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/api/suppliers', (req, res) => {
  res.json(suppliers);
});

app.post('/api/suppliers', (req, res) => {
  const newSupplier: Supplier = {
    id: Date.now().toString(),
    name: req.body.name,
    contact: req.body.contact,
    category: req.body.category,
    rating: req.body.rating || 'C',
    status: req.body.status || 'Pending',
    lastAudit: req.body.lastAudit || '',
    registered: new Date().toISOString().split('T')[0]
  };
  suppliers.push(newSupplier);
  res.json(newSupplier);
});

app.delete('/api/suppliers/:id', (req, res) => {
  suppliers = suppliers.filter(s => s.id !== req.params.id);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Supplier Management System running on http://localhost:${PORT}`);
});

