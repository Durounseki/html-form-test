// This class lets us simulate interacting with a database.
class UsersStorage {
    constructor() {
      this.storage = {};
      this.id = 0;
    }
  
    addUser({ firstName, lastName, email, age, bio }) {
      const id = this.id;
      this.storage[id] = { id, firstName, lastName, email, age, bio };
      this.id++;
    }
  
    getUsers() {
      return Object.values(this.storage);
    }
  
    getUser(id) {
      return this.storage[id];
    }
  
    updateUser(id, { firstName, lastName, email, age, bio }) {
      this.storage[id] = { id, firstName, lastName, email, age, bio };
    }
  
    deleteUser(id) {
      delete this.storage[id];
    }

    findUser(nameKeyword,emailKeyword) {
        const lowerCaseNameKeyword = nameKeyword.toLowerCase();
        const lowerCaseEmailKeyword = emailKeyword.toLowerCase();

        let foundUsers;

        if(nameKeyword){//filter by name
            // console.log(Object.values(this.storage));
            foundUsers = Object.values(this.storage).filter(user =>
                user.firstName.toLowerCase().includes(lowerCaseNameKeyword) ||
                user.lastName.toLowerCase().includes(lowerCaseNameKeyword)
            );
            // console.log(foundUsers);
            if(emailKeyword){//filter by email if multiple users are found
                // console.log(foundUsers);
                foundUsers = foundUsers.filter(user => 
                    user.email.toLowerCase().includes(lowerCaseEmailKeyword)
                );
            }
        }else if(emailKeyword){//if no name keyword then filter by email
            // console.log(Object.values(this.storage));
            foundUsers = Object.values(this.storage).filter(user =>
                user.email.toLowerCase().includes(lowerCaseEmailKeyword)
            );
            // console.log(foundUsers);
        }
        // console.log(foundUsers);
        return foundUsers;
    }
  }
  // Rather than exporting the class, we can export an instance of the class by instantiating it.
  // This ensures only one instance of this class can exist, also known as the "singleton" pattern.
  module.exports = new UsersStorage();