export class Product {
    sku: string;
    active: boolean;
    dateActive: string;
    dateCreated: Date;
    description: string;
    imageUrl: string;
    lastUpdated: string;
    name: string;
    unitPrice: number;
    quantity: number;
    id: number

    constructor(    
        sku: string,
        id: number,
        active: boolean,
        dateActive: string,
        dateCreated: Date,
        description: string,
        imageUrl: string,
        lastUpdated: string,
        name: string,
        quantity: number,
        unitPrice: number) {
        this.name = name;
        this.id = id;
        this.sku = sku;
        this.active = active;
        this.dateActive = dateActive;
        this.dateCreated = dateCreated;
        this.description = description;
        this.imageUrl = imageUrl;
        this.lastUpdated = lastUpdated;
        this.unitPrice = unitPrice;
        this.quantity = quantity;
    }

}