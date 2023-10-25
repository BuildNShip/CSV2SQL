document.getElementById("convertBtn").addEventListener("click", function () {
    const csvFile = document.getElementById("csvFile").files[0];

    if (csvFile) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const csvData = e.target.result;
            const parsedData = Papa.parse(csvData, { header: true, skipEmptyLines: true });

            const sqlStatements = generateSQLInsertStatements(parsedData.data);
            displaySQL(sqlStatements);
        };
        reader.readAsText(csvFile);
    } else {
        alert("Please select a CSV file.");
    }
});

function generateSQLInsertStatements(data) {
    if (data.length === 0) {
        return [];
    }

    const table = "your_table_name"; // Change this to your table name
    const columns = Object.keys(data[0]);
    const sqlStatements = [];

    data.forEach((row) => {
        const values = columns.map((col) => {
            return "'" + row[col].replace(/'/g, "''") + "'";
        });
        const insertSQL = `INSERT INTO ${table} (${columns.join(", ")}) VALUES (${values.join(", ")});`;
        sqlStatements.push(insertSQL);
    });

    return sqlStatements;
}

function displaySQL(sqlStatements) {
    const sqlOutput = document.getElementById("sqlOutput");
    sqlOutput.value = sqlStatements.join("\n");
}
