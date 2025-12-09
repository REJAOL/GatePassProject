<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Gate Pass Details</title>

  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet">

  <style>
    body { background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); min-height: 100vh; font-family: 'Segoe UI', sans-serif; }
    .page-header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 2.5rem 0; margin-bottom: 2rem; border-radius: 0 0 20px 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
    .form-card { border: none; border-radius: 16px; box-shadow: 0 8px 25px rgba(0,0,0,0.1); }
    .item-row { background: #f8f9fa; border-radius: 12px; padding: 15px; margin-bottom: 15px; }
    .btn-download { padding: 12px 50px; font-size: 1.1rem; border-radius: 50px; }
  </style>
</head>
<body>

  <div class="page-header text-center">
    <div class="container">
      <h1 class="display-4 fw-bold">Gate Pass Details</h1>
      <p class="lead">View details and download as PDF</p>
    </div>
  </div>

  <div class="container mb-5">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <div class="card form-card">
          <div class="card-body p-5">

            <!-- Gate Pass ID and Dates -->
            <div class="mb-4">
              <label class="form-label fw-bold">Gate Pass ID</label>
              <p class="form-control"><%= gatepass._id %></p>
            </div>
            <div class="row g-3 mb-4">
              <div class="col-md-6">
                <label class="form-label fw-bold">Dispatch Date</label>
                <p class="form-control"><%= new Date(gatepass.date).toLocaleDateString('en-GB') %></p>
              </div>
              <div class="col-md-6">
                <label class="form-label fw-bold">Created At</label>
                <p class="form-control"><%= new Date(gatepass.createdAt).toLocaleDateString('en-GB') %></p>
              </div>
            </div>

            <!-- Dispatch From -->
            <div class="mb-4">
              <label class="form-label fw-bold">Dispatch From</label>
              <p class="form-control"><%= gatepass.dispatchFrom.hubName %> - <%= gatepass.dispatchFrom.details %></p>
            </div>

            <!-- Dispatch To -->
            <div class="mb-4">
              <label class="form-label fw-bold">Dispatch To</label>
              <p class="form-control"><%= gatepass.dispatchTo.hubName %> - <%= gatepass.dispatchTo.details %></p>
            </div>

            <!-- Sender -->
            <div class="mb-4">
              <h5 class="fw-bold text-primary mb-3">Sender's Details</h5>
              <div class="row g-3">
                <div class="col-md-6"><label class="form-label">Name</label><p class="form-control"><%= gatepass.sender.name %></p></div>
                <div class="col-md-6"><label class="form-label">Phone</label><p class="form-control"><%= gatepass.sender.phone %></p></div>
                <div class="col-md-4"><label class="form-label">Designation</label><p class="form-control"><%= gatepass.sender.designation %></p></div>
                <div class="col-md-4"><label class="form-label">Employee ID</label><p class="form-control"><%= gatepass.sender.employee_id %></p></div>
                <div class="col-md-4"><label class="form-label">Department</label><p class="form-control"><%= gatepass.sender.department %></p></div>
              </div>
            </div>

            <!-- Receiver -->
            <div class="mb-4">
              <h5 class="fw-bold text-primary mb-3">Receiver's Details</h5>
              <div class="row g-3">
                <div class="col-md-6"><label class="form-label">Name</label><p class="form-control"><%= gatepass.receiver.name %></p></div>
                <div class="col-md-6"><label class="form-label">Phone</label><p class="form-control"><%= gatepass.receiver.phone %></p></div>
                <div class="col-md-4"><label class="form-label">Designation</label><p class="form-control"><%= gatepass.receiver.designation %></p></div>
                <div class="col-md-4"><label class="form-label">Employee ID</label><p class="form-control"><%= gatepass.receiver.employee_id %></p></div>
                <div class="col-md-4"><label class="form-label">Department</label><p class="form-control"><%= gatepass.receiver.department %></p></div>
              </div>
            </div>

            <!-- Prepared By -->
            <div class="mb-4">
              <h5 class="fw-bold text-primary mb-3">Prepared By</h5>
              <div class="row g-3">
                <div class="col-md-6"><label class="form-label">Name</label><p class="form-control"><%= gatepass.preparedBy.name %></p></div>
                <div class="col-md-6"><label class="form-label">Phone</label><p class="form-control"><%= gatepass.preparedBy.phone %></p></div>
                <div class="col-md-4"><label class="form-label">Designation</label><p class="form-control"><%= gatepass.preparedBy.designation %></p></div>
                <div class="col-md-4"><label class="form-label">Employee ID</label><p class="form-control"><%= gatepass.preparedBy.employee_id %></p></div>
                <div class="col-md-4"><label class="form-label">Department</label><p class="form-control"><%= gatepass.preparedBy.department %></p></div>
              </div>
            </div>

            <!-- Items -->
            <div class="mb-4">
              <h5 class="fw-bold text-primary mb-3">Items</h5>
              <div id="items-container">
                <% gatepass.items.forEach((item, index) => { %>
                  <div class="item-row">
                    <div class="row g-3">
                      <div class="col-md-5"><label class="form-label">Item Name</label><p class="form-control"><%= item.name %></p></div>
                      <div class="col-md-2"><label class="form-label">Qty</label><p class="form-control"><%= item.quantity %></p></div>
                      <div class="col-md-2"><label class="form-label">Unit</label><p class="form-control"><%= item.unit %></p></div>
                      <div class="col-md-3"><label class="form-label">Comments</label><p class="form-control"><%= item.comments || 'N/A' %></p></div>
                    </div>
                  </div>
                <% }) %>
              </div>
            </div>

            <!-- Remarks -->
            <div class="mb-4">
              <label class="form-label fw-bold">Remarks</label>
              <textarea class="form-control" rows="5" readonly><%= gatepass.remarks || 'N/A' %></textarea>
            </div>

            <div class="text-center">
              <a href="/api/v1/gatepass/<%= gatepass._id %>/pdf" class="btn btn-primary btn-lg btn-download shadow-lg" download>Download PDF</a>
              <a href="/api/v1/gatepass" class="btn btn-secondary btn-lg ms-3">Back</a>
              <!-- For future edit: <a href="/api/v1/gatepass/<%= gatepass._id %>/edit" class="btn btn-warning btn-lg ms-3">Edit</a> -->
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>