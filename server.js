const express = require("express");
const multer = require("multer");
const XLSX = require("xlsx");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.static("public"));

const storage = multer.diskStorage({

    destination: function (req, file, cb) {

        cb(null, "uploads/");

    },

    filename: function (req, file, cb) {

        cb(null, Date.now() + "-" + file.originalname);

    }

});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("excel"), (req, res) => {

    try {

        const workbook = XLSX.readFile(req.file.path);

        const sheetName = workbook.SheetNames[0];

        const sheet = workbook.Sheets[sheetName];

        const data = XLSX.utils.sheet_to_json(sheet);

        const formattedData = data.map((row, index) => {

            return {

                srNo: index + 1,

                machineNumber: row["Machine Number"],

                jobNumber: row["Job Number"],

                target: row["Target"]

            };

        });

        res.json({

            success: true,

            totalRecords: formattedData.length,

            data: formattedData

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: "Error Reading Excel"

        });

    }

});

app.listen(3000, () => {

    console.log("Server Running On Port 3000");

});
