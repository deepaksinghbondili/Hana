const cds = require("@sap/cds");
const express = require("express");
module.exports = srv => {
    srv.on("validate", async (req, res) => {
        debugger;
        if (req.data.FLAG == 'C') {
            try {
                let res = await cds.run(INSERT.into('APP_INTERACTIONS_ORGANIZATION').entries(JSON.parse(req.data.Obj)));
            } catch (error) {
                res.error = error
            }
        }
    })
}