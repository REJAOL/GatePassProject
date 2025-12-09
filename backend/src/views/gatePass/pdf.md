<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Gate Pass - Daraz</title>
  <style>
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      font-size: 11px;
      line-height: 1.3;
      margin: 0;
      padding: 10mm;
    }
    .page {
      width: 210mm;
      min-height: 297mm;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 6px;
    }
    th, td {
      border: 1px solid #000;
      padding: 4px;
      vertical-align: top;
    }
    th {
      background: #f0f0f0;
      font-weight: bold;
      text-align: left;
    }
    .logo {
      height: 20px;
    }
    .field-label {
      font-weight: bold;
      display: inline-block;
      min-width: 90px;
    }
    .remarks-box {
      border: 1px solid #000;
      padding: 8px;
      min-height: 80px;
      white-space: pre-wrap;
    }
  </style>
</head>
<body>
  <div class="page">
    <!-- Header -->
    <table style="border: none;">
      <tr>
        <td style="border: none;">
          <% if (logoBase64) { %>
            <img src="data:image/png;base64,<%= logoBase64 %>" class="logo" alt="Daraz">
          <% } %>
        </td>
        <td style="border: none; text-align: right; font-weight: bold;">
          GATE PASS#: <%= gatepass._id ? 'BD-IT' + new Date(gatepass.createdAt).toISOString().replace(/[-T:.]/g, '').slice(0,14) : 'N/A' %>
        </td>
      </tr>
    </table>

    <div style="text-align: center; font-weight: bold; margin: 4px 0;">
      Daraz Bangladesh Limited
    </div>

    <!-- Dates -->
    <table style="border: none;">
      <tr>
        <td style="border: none;">
          Dispatch Date: <%= gatepass.date ? new Date(gatepass.date).toLocaleDateString('en-GB') : '____/____/____' %>
        </td>
        <td style="border: none;">Receiving Date: _____________________</td>
      </tr>
    </table>

    <div style="text-align: center; margin: 6px 0; font-weight: bold;">
      Challan Type: Internal/External
    </div>

    <!-- Dispatch From & To -->
    <table>
      <thead>
        <tr>
          <th colspan="2">Dispatch From</th>
          <th colspan="2">Dispatch To</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="width:25%; font-weight:bold;">Name:</td>
          <td style="width:25%;"><%= gatepass.dispatchFrom?.hubName || 'N/A' %></td>
          <td style="width:25%; font-weight:bold;">Name:</td>
          <td style="width:25%;"><%= gatepass.dispatchTo?.hubName || 'N/A' %></td>
        </tr>
        <tr>
          <td style="font-weight:bold;">Zone:</td>
          <td><%= gatepass.dispatchFrom?.hubName || 'N/A' %></td>
          <td style="font-weight:bold;">Zone:</td>
          <td><%= gatepass.dispatchTo?.hubName || 'N/A' %></td>
        </tr>
        <tr>
          <td style="font-weight:bold;">Address:</td>
          <td><%= gatepass.dispatchFrom?.details || 'N/A' %></td>
          <td style="font-weight:bold;">Address:</td>
          <td><%= gatepass.dispatchTo?.details || 'N/A' %></td>
        </tr>
      </tbody>
    </table>

    <!-- Sender & Receiver -->
    <table>
      <thead>
        <tr>
          <th colspan="2">Sender's Details</th>
          <th colspan="2">Receiver's Details</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="width:25%; font-weight:bold;">Name:</td>
          <td style="width:25%;"><%= gatepass.sender?.name || 'N/A' %></td>
          <td style="width:25%; font-weight:bold;">Name:</td>
          <td style="width:25%;"><%= gatepass.receiver?.name || 'N/A' %></td>
        </tr>
        <tr>
          <td style="font-weight:bold;">Phone No:</td>
          <td><%= gatepass.sender?.phone || 'N/A' %></td>
          <td style="font-weight:bold;">Phone No:</td>
          <td><%= gatepass.receiver?.phone || 'N/A' %></td>
        </tr>
        <!-- Add designation, employee_id, department if needed -->
      </tbody>
    </table>

    <!-- Items Table -->
    <table>
      <thead>
        <tr>
          <th>SL NO</th>
          <th>ITEM DESCRIPTION</th>
          <th>QUANTITY</th>
          <th>UNIT</th>
        </tr>
      </thead>
      <tbody>
        <% (gatepass.items || []).forEach((item, i) => { %>
          <tr>
            <td><%= i + 1 %></td>
            <td><%= item.name || '' %></td>
            <td><%= item.quantity || '' %></td>
            <td><%= item.unit || '' %></td>
          </tr>
        <% }); %>
        <% for (let i = (gatepass.items?.length || 0); i < 5; i++) { %>
          <tr><td><%= i + 1 %></td><td></td><td></td><td></td></tr>
        <% } %>
      </tbody>
    </table>

    <!-- Remarks -->
    <table>
      <tr><th>Remarks</th></tr>
      <tr><td class="remarks-box"><%= gatepass.remarks || '' %></td></tr>
    </table>

    <!-- Prepared By -->
    <table>
      <tr><th>Prepared By</th></tr>
      <tr>
        <td>
          <div><span class="field-label">Name:</span> <%= gatepass.preparedBy?.name || 'N/A' %></div>
          <div><span class="field-label">Designation:</span> <%= gatepass.preparedBy?.designation || 'N/A' %></div>
          <div><span class="field-label">Employee ID:</span> <%= gatepass.preparedBy?.employee_id || 'N/A' %></div>
          <div><span class="field-label">Sign:</span> <%= (gatepass.preparedBy?.name || '').toLowerCase() %></div>
        </td>
      </tr>
    </table>
  </div>
</body>
</html>