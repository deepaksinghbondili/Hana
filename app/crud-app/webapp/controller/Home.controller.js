var sap;
sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";
        var that;
        return Controller.extend("cap.crudapp.controller.Home", {
            onInit: function () {
                that = this;

                if (!that.oCreateDialog) {
                    that.oCreateDialog = sap.ui.xmlfragment("cap.crudapp.fragments.Create", that);
                    that.getView().addDependent(that.oCreateDialog);
                }
            },
            onAfterRendering: function () {
                var oModel = that.getOwnerComponent().getModel("oModel");
                oModel.read("/OrgSet", {
                    success: function (oData) {
                        var model = new sap.ui.model.json.JSONModel();
                        var oTable = that.getView().byId("idTable");
                        model.setData({
                            items: oData.results
                        });
                        oTable.setModel(model);
                        
                    },
                    error: function (error) {
                        sap.m.MessageToast().show(error);
                    }
                })
            },
            onCreate: function () {
                that.oCreateDialog.open();
            },
            onClose: function () {
                that.oCreateDialog.close();
            },
            onSave: function () {
                var id = sap.ui.getCore().byId("idEmp").getValue();
                var name = sap.ui.getCore().byId("idName").getValue();
                var phone = sap.ui.getCore().byId("idNum").getValue();
                var city = sap.ui.getCore().byId("idCity").getValue();
                var obj = {
                    EmployeeID: id,
                    EmployeeName: name,
                    Phone: phone,
                    City: city
                };
                var oModel = that.getOwnerComponent().getModel("oModel");
                oModel.callFunction("/validate",{
                    method : "GET",
                    urlParameters : {
                        FLAG : "C",
                        Obj : JSON.stringify(obj)
                    },
                    success : function(oData,response){
                        sap.m.MessageToast.show("Created");
                        that.oCreateDialog.close();
                        that.onAfterRendering();
                    },
                    error : function(e){
                        sap.m.MessageToast().show(e);
                    }
                })
            }
        });
    });