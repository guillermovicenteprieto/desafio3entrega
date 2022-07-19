class productDto {
    constructor(timestamp, name, price, stock, description, image, url, code, category) {
        this.timestamp = timestamp;
        this.name = name;
        this.price = price;
        this.stock = stock;
        this.description = description;
        this.image = image;
        this.url = url;
        this.code = code;
        this.category = category;
    }

    getTimestamp() {
        return this.timestamp;
    }

    getName() {
        return this.name;
    }

    getPrice() {
        return this.price;
    }

    getStock() {
        return this.stock;
    }

    getDescription() {
        return this.description;
    }

    getImage() {
        return this.image;
    }

    getUrl() {
        return this.url;
    }

    getCode() {
        return this.code;
    }

    getCategory() {
        return this.category;
    }

}