<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Gate Pass Details</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet">

  <!-- jsPDF + AutoTable -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js"></script>

  <style>
    body { background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); font-family: 'Segoe UI', sans-serif; min-height: 100vh; }
    .card { border: none; border-radius: 16px; box-shadow: 0 8px 25px rgba(0,0,0,0.1); margin-top: 50px; padding: 30px; }
    .gatepass-icon { font-size: 3rem; color: #667eea; }
    h5 { margin-top: 20px; }
    ul { padding-left: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <div class="d-flex align-items-center mb-3">
        <i class="bi bi-truck gatepass-icon me-3"></i>
        <h3 class="mb-0 text-primary">Gate Pass Details</h3>
        <button class="btn btn-success ms-auto" id="downloadBtn">
          <i class="bi bi-download"></i> Download PDF
        </button>
      </div>
      <hr>

      <h5>Route:</h5>
      <p>
        <strong>Sender:</strong> <%= gatepass.sender?.name || 'N/A' %> → 
        <strong>Dispatch From:</strong> <%= gatepass.dispatchFrom?.hubName || 'N/A' %> - <%= gatepass.dispatchFrom?.details || '' %> → 
        <strong>Dispatch To:</strong> <%= gatepass.dispatchTo?.hubName || 'N/A' %> - <%= gatepass.dispatchTo?.details || '' %> → 
        <strong>Receiver:</strong> <%= gatepass.receiver?.name || 'N/A' %>
      </p>

      <h5>Prepared By:</h5>
      <p>
        Name: <%= gatepass.preparedBy?.name || 'N/A' %><br>
        Phone: <%= gatepass.preparedBy?.phone || 'N/A' %><br>
        Designation: <%= gatepass.preparedBy?.designation || 'N/A' %><br>
        Employee ID: <%= gatepass.preparedBy?.employee_id || 'N/A' %><br>
        Department: <%= gatepass.preparedBy?.department || 'N/A' %>
      </p>

      <h5>Items:</h5>
      <ul>
        <% (gatepass.items || []).forEach(item => { %>
          <li><strong><%= item.name || 'Unknown' %></strong> - Qty: <%= item.quantity || 0 %> <%= item.unit || '' %>
            <% if(item.comments) { %> (Comments: <%= item.comments %>)<% } %>
          </li>
        <% }) %>
      </ul>

      <% if(gatepass.remarks) { %>
        <h5>Remarks:</h5>
        <p><%= gatepass.remarks %></p>
      <% } %>

      <p class="text-muted mt-3"><small>Created At: <%= new Date(gatepass.createdAt).toLocaleString('en-IN') %></small></p>
    </div>
  </div>

  <!-- THIS LINE IS THE ONLY ONE THAT MATTERS FOR FIXING THE ERROR -->
  <script>
    window.gatepassData = <%- JSON.stringify(gatepass || {}) %>;
  </script>

  <!-- PDF Generation Script (100% working) -->
  <script>
    document.getElementById('downloadBtn').addEventListener('click', () => {
      if (!window.gatepassData) {
        alert('Data not loaded. Please refresh.');
        return;
      }

      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
      const d = window.gatepassData;

      doc.setFontSize(20);
      doc.text('Gate Pass Details', 105, 20, { align: 'center' });

      let y = 35;
      doc.setFontSize(12);

      doc.text(`Sender: ${d.sender?.name || 'N/A'}`, 14, y); y += 8;
      doc.text(`Dispatch From: ${d.dispatchFrom?.hubName || 'N/A'} - ${d.dispatchFrom?.details || ''}`, 14, y); y += 8;
      doc.text(`Dispatch To: ${d.dispatchTo?.hubName || 'N/A'} - ${d.dispatchTo?.details || ''}`, 14, y); y += 8;
      doc.text(`Receiver: ${d.receiver?.name || 'N/A'}`, 14, y); y += 12;

      doc.setFont('helvetica', 'bold');
      doc.text('Prepared By:', 14, y); y += 8;
      doc.setFont('helvetica', 'normal');
      doc.text(`Name: ${d.preparedBy?.name || 'N/A'}`, 14, y); y += 7;
      doc.text(`Phone: ${d.preparedBy?.phone || 'N/A'}`, 14, y); y += 7;
      doc.text(`Designation: ${d.preparedBy?.designation || 'N/A'}`, 14, y); y += 7;
      doc.text(`Employee ID: ${d.preparedBy?.employee_id || 'N/A'}`, 14, y); y += 7;
      doc.text(`Department: ${d.preparedBy?.department || 'N/A'}`, 14, y); y += 12;

      const items = (d.items || []).map(i => [i.name || '', i.quantity || '', i.unit || '', i.comments || '']);

      doc.autoTable({
        head: [['Item Name', 'Quantity', 'Unit', 'Comments']],
        body: items.length > 0 ? items : [['No items found', '', '', '']],
        startY: y,
        theme: 'grid',
        headStyles: { fillColor: [102, 126, 234], textColor: 255 },
        styles: { fontSize: 10 },
        margin: { left: 14, right: 14 }
      });

      y = doc.lastAutoTable.finalY + 15;

      if (d.remarks) {
        const lines = doc.splitTextToSize(d.remarks, 180);
        doc.setFont('helvetica', 'bold');
        doc.text('Remarks:', 14, y); y += 8;
        doc.setFont('helvetica', 'normal');
        doc.text(lines, 14, y);
      }

      const dateStr = d.createdAt ? new Date(d.createdAt).toISOString().slice(0,10) : 'unknown';
      doc.save(`GatePass_${dateStr}.pdf`);
    });
  </script>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>