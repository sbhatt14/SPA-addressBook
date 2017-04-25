function ContactsViewModel() {
	// Access data from the datastore.js to populate the contacts lisiting.
	// the values are retrieved for the following keys id, firstName, lastName, companyName, emailAddress, pictureURL
	
	
	// There are 3 context home, all, detail. Depending upon the SPA one context will be serviced at a given  time.
   var self = this;

   self.contacts = ko.observableArray();
   self.currentContext = ko.observable("home");
	
   self.currentContactsFullName = ko.observable("");
   self.currentContactsEmailAddress = ko.observable("");
   self.currentContactsPictureURL = ko.observable("");

   self.loadContacts = function () {

      self.contacts.removeAll();
	  // Call to the dataservice.
      var dataService = new contactsDataService();
      var contacts = dataService.getContacts();

      for (var i = 0; i < contacts.length; i++) {

         var contact = new Contact(
         contacts[i].id,
         contacts[i].firstName,
         contacts[i].lastName,
         contacts[i].companyName,
         contacts[i].emailAddress,
         contacts[i].pictureURL);

         self.contacts.push(contact);
      }

   };

   self.viewAll = function () {
      self.currentContext("all");
      
   }

   self.reset = function () {

      self.currentContext("home");

   };

   self.setCurrentContacts = function () {

      self.currentContext("detail");

      self.currentContacts = this;
      self.currentContactsFullName(this.fullName());
      self.currentContactsEmailAddress(this.emailAddress());
      self.currentContactsPictureURL(this.pictureURL());

   };

   self.loadContacts();

} 
;