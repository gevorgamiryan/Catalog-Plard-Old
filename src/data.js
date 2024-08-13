import axios from "axios";

export function NewUser(fullname, email, password) {

    this.fullname = fullname;
    this.email = email;
    this.password = password;
}


const subCategories = {
    "кольцo": ["обручальные", "кольца кастеты ", "коктейльные", "помолвочные"],
    "metal": ["gold", "red gold", "silver"]
}


function importAll(r) {
    let images = [];
    r.keys().map((item, index) => images.push({
        name: "../../assets/products/кольцo" + item
    }));
    return images;
}




export const images = [importAll(require.context('./assets/products', true, /\.(png|jpe?g|svg)$/))].flat();
