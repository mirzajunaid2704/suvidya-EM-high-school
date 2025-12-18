const API_URL = "https://backkend-schl.onrender.com/api/enquiries";

fetch(API_URL)
  .then(response => response.json())
  .then(data => {
    const tableBody = document.getElementById("enquiryTable");
    tableBody.innerHTML = "";

    if (!data || data.length === 0) {
      tableBody.innerHTML =
        "<tr><td colspan='5' class='empty'>No enquiries found</td></tr>";
      return;
    }

    // Show latest enquiry first
    data.reverse().forEach(enquiry => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${enquiry.name}</td>
        <td>${enquiry.email}</td>
        <td>${enquiry.phone || "-"}</td>
        <td>${enquiry.message}</td>
        <td>${new Date(enquiry.date).toLocaleString()}</td>
      `;

      tableBody.appendChild(row);
    });
  })
  .catch(error => {
    console.error("Error loading enquiries:", error);
    document.getElementById("enquiryTable").innerHTML =
      "<tr><td colspan='5' class='empty'>Failed to load enquiries</td></tr>";
  });
