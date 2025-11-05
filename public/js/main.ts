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

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('htmx:afterSwap', (event: any) => {
    if (event.detail.target.id === 'supplier-list') {
      renderSuppliers(event.detail.xhr.response);
    }
  });
});

function renderSuppliers(response: any): void {
  const suppliers: Supplier[] = typeof response === 'string' 
    ? JSON.parse(response) 
    : response;
  
  const listElement = document.getElementById('supplier-list');
  if (!listElement) return;

  if (suppliers.length === 0) {
    listElement.innerHTML = '<p class="empty">No suppliers found</p>';
    return;
  }

  listElement.innerHTML = `
    <table class="supplier-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Contact</th>
          <th>Category</th>
          <th>Rating</th>
          <th>Status</th>
          <th>Last Audit</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${suppliers.map(supplier => `
          <tr>
            <td>${escapeHtml(supplier.name)}</td>
            <td>${escapeHtml(supplier.contact)}</td>
            <td><span class="badge badge-${supplier.category.toLowerCase().replace(' ', '-')}">${escapeHtml(supplier.category)}</span></td>
            <td><span class="badge badge-rating-${supplier.rating.toLowerCase()}">${escapeHtml(supplier.rating)}</span></td>
            <td><span class="badge badge-${supplier.status.toLowerCase().replace(' ', '-')}">${escapeHtml(supplier.status)}</span></td>
            <td>${escapeHtml(supplier.lastAudit || 'N/A')}</td>
            <td>
              <button class="btn btn-sm btn-danger" 
                      hx-delete="/api/suppliers/${supplier.id}" 
                      hx-target="#supplier-list" 
                      hx-swap="outerHTML"
                      hx-confirm="Are you sure you want to delete this supplier?">
                Delete
              </button>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

