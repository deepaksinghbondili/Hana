const cds = require("@sap/cds");
module.exports = srv => {
    srv.on("validate", async (req,res) => {
        try {
            debugger;
            const obj = JSON.parse(req.data.Obj);
            await cds.run(INSERT.into("APP_INTERACTIONS_ORGANIZATION").entries(obj));
            const result = {message : "Successfully Created "}
            return result;
        } catch (error) {
            console.error(error);
            return error;
        }
    });
    // srv.after("validate", res => {
    //     if (res.status === 500) {
    //         console.error(res.error);
    //     }
    // });
};
