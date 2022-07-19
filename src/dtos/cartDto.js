class cartDto {
    constructor (id, name, Date, user, products) {
        this.id = id;
        this.name = name;
        this.Date = Date;
        this.user = user;
        this.products = products;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }
    
    getDate() {
        return this.Date;
    }

    getUser() {
        return this.user;
    }

    getProducts() {
        return this.products;
    }
    
}