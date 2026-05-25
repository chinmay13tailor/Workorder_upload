async function uploadExcel() {

    const fileInput = document.getElementById("excelFile");

    const file = fileInput.files[0];

    if (!file) {

        alert("Select Excel File");

        return;

    }

    const formData = new FormData();

    formData.append("excel", file);

    const response = await fetch("/upload", {

        method: "POST",

        body: formData

    });

    const result = await response.json();

    console.log(result);

    let html = "";

    html += `<h3>Total Records : ${result.totalRecords}</h3>`;

    html += `
    
    <table>

        <tr>

            <th>Sr No</th>

            <th>Machine Number</th>

            <th>Job Number</th>

            <th>Target</th>

        </tr>
    
    `;

    result.data.forEach(item => {

        html += `
        
        <tr>

            <td>${item.srNo}</td>

            <td>${item.machineNumber}</td>

            <td>${item.jobNumber}</td>

            <td>${item.target}</td>

        </tr>
        
        `;

    });

    html += `</table>`;

    document.getElementById("result").innerHTML = html;

}
