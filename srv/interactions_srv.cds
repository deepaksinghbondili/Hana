using app.interactions from '../db/interactions';
service CatalogService {

 entity Interactions_Header
    as projection on interactions.Interactions_Header;

 entity Interactions_Items
    as projection on  interactions.Interactions_Items;

 entity OrgSet
    as projection on interactions.Organization;   
    
   @cds.http.method: 'POST'
   function validate(Obj : String) returns {message : String};
}
