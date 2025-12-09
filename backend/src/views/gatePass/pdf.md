<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Gate Pass - Daraz</title>
  <style>
    body {
      font-family: 'Segoe UI', 'Tahoma', Arial, sans-serif;
      font-size: 11px;
      line-height: 1.3;
      color: #000;
      background: #fff;
      margin: 0;
      padding: 10mm;
    }
    .page {
      width: 210mm;
      min-height: 297mm;
      margin: 0 auto;
      box-sizing: border-box;
      position: relative;
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
    .header-table td {
      border: none;
      padding: 0;
    }
    .logo {
      height: 20px;
    }
    .gatepass-id {
      text-align: right;
      font-weight: bold;
    }
    .company-name {
      text-align: center;
      font-weight: bold;
      margin: 4px 0;
    }
    .dates-table td {
      border: none;
      padding: 2px 0;
    }
    .items-table th, .items-table td {
      text-align: center;
    }
    .items-table th:nth-child(2),
    .items-table td:nth-child(2) {
      text-align: left;
    }
    .remarks-box {
      border: 1px solid #000;
      padding: 8px;
      min-height: 80px;
      white-space: pre-wrap;
      font-family: inherit;
      margin-top: 4px;
    }
    .footer {
      position: absolute;
      bottom: 10mm;
      left: 10mm;
      right: 10mm;
      text-align: center;
      font-size: 9px;
      color: #555;
      border-top: 1px solid #ccc;
      padding-top: 4px;
    }
    .field-label {
      font-weight: bold;
      display: inline-block;
      min-width: 90px;
    }
    .serial-comments {
      font-size: 10px;
      line-height: 1.2;
      white-space: pre-wrap;
      margin-top: 4px;
    }
  </style>
</head>
<body>
  <div class="page">
    <!-- Header -->
    <table class="header-table">
      <tr>
        <td><img class="logo" src="data:image/png;base64,<%= logoBase64 %>" alt="Daraz" style="height: 50px;"></td>
        <td class="gatepass-id">GATE PASS#: <%= gatepass._id ? 'BD-IT' + new Date(gatepass.createdAt).toISOString().replace(/[-T:.]/g, '').slice(0,14) : 'N/A' %></td>
      </tr>
    </table>

    <div class="company-name">Daraz Bangladesh Limited</div>

    <!-- Dates -->
    <table class="dates-table">
      <tr>
        <td>Dispatch Date: <%= gatepass.date ? new Date(gatepass.date).toLocaleDateString('en-GB') : '____/____/____' %></td>
        <td>Receiving Date: _____________________</td>
      </tr>
    </table>

    <!-- Challan Type -->
    <table style="border: none; text-align: center;">
      <tr><td>Challan Type: Internal/External</td></tr>
    </table>

    <!-- Dispatch From & Dispatch To -->
    <table>
      <thead>
        <tr>
          <th colspan="2">Dispatch From</th>
          <th colspan="2">Dispatch To</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="width: 25%; font-weight: bold;">Name:</td>
          <td style="width: 25%;"><%= gatepass.dispatchFrom?.hubName || 'N/A' %></td>
          <td style="width: 25%; font-weight: bold;">Name:</td>
          <td style="width: 25%;"><%= gatepass.dispatchTo?.hubName || 'N/A' %></td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Zone:</td>
          <td><%= gatepass.dispatchFrom?.hubName || 'N/A' %></td>
          <td style="font-weight: bold;">Zone:</td>
          <td><%= gatepass.dispatchTo?.hubName || 'N/A' %></td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Address:</td>
          <td><%= gatepass.dispatchFrom?.details || 'N/A' %></td>
          <td style="font-weight: bold;">Address:</td>
          <td><%= gatepass.dispatchTo?.details || 'N/A' %></td>
        </tr>
      </tbody>
    </table>

    <!-- Sender & Receiver Details -->
    <table>
      <thead>
        <tr>
          <th colspan="2">Sender's Details</th>
          <th colspan="2">Receiver's Details</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="width: 25%; font-weight: bold;">Name:</td>
          <td style="width: 25%;"><%= gatepass.sender?.name || 'N/A' %></td>
          <td style="width: 25%; font-weight: bold;">Name:</td>
          <td style="width: 25%;"><%= gatepass.receiver?.name || 'N/A' %></td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Phone No:</td>
          <td><%= gatepass.sender?.phone || 'N/A' %></td>
          <td style="font-weight: bold;">Phone No:</td>
          <td><%= gatepass.receiver?.phone || 'N/A' %></td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Designation:</td>
          <td><%= gatepass.sender?.designation || 'N/A' %></td>
          <td style="font-weight: bold;">Designation:</td>
          <td><%= gatepass.receiver?.designation || 'N/A' %></td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Employee ID:</td>
          <td><%= gatepass.sender?.employee_id || 'N/A' %></td>
          <td style="font-weight: bold;">Employee ID:</td>
          <td><%= gatepass.receiver?.employee_id || 'N/A' %></td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Department:</td>
          <td><%= gatepass.sender?.department || 'N/A' %></td>
          <td style="font-weight: bold;">Department:</td>
          <td><%= gatepass.receiver?.department || 'N/A' %></td>
        </tr>
      </tbody>
    </table>

    <!-- Items Table -->
    <table class="items-table">
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
          <tr>
            <td><%= i + 1 %></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        <% } %>
      </tbody>
    </ table>

    <!-- Serial Comments -->
    <% if (gatepass.items && gatepass.items.some(i => i.comments)) { %>
      <table>
        <tr>
          <td style="border: none; padding-top: 0;">
            <div class="serial-comments">
              <% gatepass.items.forEach(item => { %>
                <%= item.comments ? item.comments + ' ' : '' %>
              <% }); %>
            </div>
          </td>
        </tr>
      </table>
    <% } %>

    <!-- Remarks -->
    <table>
      <tr>
        <th>Remarks</th>
      </tr>
      <tr>
        <td class="remarks-box"><%= gatepass.remarks || '' %></td>
      </tr>
    </table>

    <!-- Bearer & Recipient Details -->
    <table>
      <tr>
        <th colspan="2">Bearer Details</th>
        <th colspan="2">Recipient Details</th>
      </tr>
      <tr>
        <td style="width: 25%; font-weight: bold;">Name:</td>
        <td style="width: 25%;">_________________________</td>
        <td style="width: 25%; font-weight: bold;">Name:</td>
        <td style="width: 25%;">_________________________</td>
      </tr>
      <tr>
        <td style="font-weight: bold;">Phone No:</td>
        <td>_________________________</td>
        <td style="font-weight: bold;">Phone No:</td>
        <td><%= gatepass.receiver?.phone || '' %></td>
      </tr>
    </table>

    <!-- FINAL SIGNATURE BLOCKS (EXACTLY AS IN YOUR PDF) -->
    <table style="border-collapse: collapse; width: 100%; margin-top: 15px;">
      <tr>
        <!-- PREPARED BY -->
        <td style="border: 1px solid #000; width: 33%; padding: 6px; vertical-align: top; text-align: center;">
          <div style="font-weight: bold; margin-bottom: 6px;">PREPARED BY</div>
          <div style="text-align: left; font-size: 10px; line-height: 1.3;">
            <div><span class="field-label">Name:</span> <%= gatepass.preparedBy?.name || 'N/A' %></div>
            <div><span class="field-label">Designation:</span> <%= gatepass.preparedBy?.designation || 'N/A' %></div>
            <div><span class="field-label">Employee ID:</span> <%= gatepass.preparedBy?.employee_id || 'N/A' %></div>
            <div><span class="field-label">Sign:</span> <%= (gatepass.preparedBy?.name || '').toLowerCase() %></div>
          </div>
        </td>
        <!-- SECURITY CHECK -->
        <td style="border: 1px solid #000; width: 33%; padding: 6px; vertical-align: top; text-align: center;">
          <div style="font-weight: bold; margin-bottom: 6px;">SECURITY CHECK</div>
          <!-- Empty -->
        </td>
        <!-- RECEIVED BY -->
        <td style="border: 1px solid #000; width: 33%; padding: 6px; vertical-align: top; text-align: center;">
          <div style="font-weight: bold; margin-bottom: 6px;">RECEIVED BY</div>
          <!-- Empty -->
        </td>
      </tr>
      <!-- Large Empty Box -->
      <tr>
        <td colspan="3" style="border: 1px solid #000; height: 40px; text-align: center; vertical-align: top; padding: 10px;">
          <!-- Intentionally blank for physical signatures -->
        </td>
      </tr>
      <!-- Bottom Row: BEARER (1 col) | AUTHORISED (2 cols) -->
      <tr>
        <td style="border: 1px solid #000; padding: 6px; text-align: center; vertical-align: top;">
          <div style="font-weight: bold; margin-bottom: 6px;">BEARER SIGNATURE</div>
          <!-- Empty -->
        </td>
        <td colspan="2" style="border: 1px solid #000; padding: 6px; text-align: center; vertical-align: top;">
          <div style="font-weight: bold; margin-bottom: 6px;">AUTHORISED SIGNATURE</div>
          <!-- Empty -->
        </td>
      </tr>
    </table>

    <!-- Footer -->
    <div class="footer">
      Daraz Internal B2 DR-COMP-FRM-GPFRM &nbsp; 28 October, 2024 &nbsp; Version 1.1
    </div>
  </div>
</body>
</html>