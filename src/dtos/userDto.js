class userDto {
    constructor(name, lastName, address, age, phone, image, username, email, password) {
        this.name = name;
        this.lastName = lastName;
        this.address = address;
        this.age = age;
        this.phone = phone;
        this.image = image;
        this.username = username;
        this.email = email;
        this.password = password;
    }
    getName() {
        return this.name;
    }
    getLastName() {
        return this.lastName;
    }
    getAddress() {
        return this.address;
    }
    getAge() {
        return this.age;
    }
    getPhone() {
        return this.phone;
    }
    getImage() {
        return this.image;
    }
    getUsername() {
        return this.username;
    }
    getEmail() {
        return this.email;
    }
    getPassword() {
        return this.password;
    }
    
}
