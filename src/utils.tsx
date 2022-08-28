
export function formatCentsToDollars(cents: number): string {
    if (cents < 10) {
      return `$0.0${cents}`;
    }

    let d = (cents / 100) >> 0;
    let c = cents % 100;
    if (c < 10) {
        return `$${d}.0${c}`;
    }
    return `$${d}.${c}`;
  };

  export const placeholderProduct = {
    id: 0,
    imageSrc: "/images/loading.svg",
    name: "Loading...",
    priceCents: 0,
  }

//   We have Vendor A that sells all products that start with the letter A, Vendor B that sells products that start with B, etc. Add the following validations and constraints:
const VOWELS = ["A", "E", "I", "O", "U"];
//     All items have a maximum quantity of 10 unless specified.
//         Exceptions: Vendors A, E, I, O, and U have a maximum quantity per item of 25.
export const findMaxItems = (productName: string) => {
    if (VOWELS.includes(productName[0])) {
      return 25;
    }
    return 10;
}
//     Vendors A-M have a minimum order requirement of $500
//     Vendors N-Z have a minimum order requirement of $1000
export const findMinOrderCentsValue = (productName: string) => {
    const alphabetTop = ["A","B","C","D","E","F","G","H","I","J","K","L","M"];
    if (alphabetTop.includes(productName.charAt(0))) {
        return 500*100;
    } else return 1000*100;
}
//     Vendors A, E, I, O, and U like to sell their items in batches of 5. Ensure the dropdown only shows 0, 5, 10, etc, while keeping in mind that the price from the server is the price for each item, not for each batch
export const findBatchSize = (productName: string) => {
    if (VOWELS.includes(productName[0])) {
        return 5;
    } else return 1;
}
//     Show an error message in the checkout page if the order is too small. This can be itemized or global one
export const isOrderTooSmall = (productName: string, quantity: number, price:number) => {
    const minOrder = findMinOrderCentsValue(productName);
    if (quantity*price < minOrder){
        return true;
    }
    return false;
}
//     If it is impossible to order from a vendor because ∑(Item cost × maximum item quantity) is less than the vendor's order minimum, hide all the items from that vendor in the catalog.
export const isImpossibleToOrder = (productName: string, price:number) => {
    const maxItems = findMaxItems(productName);
    const minOrder = findMinOrderCentsValue(productName);
    if (maxItems*price < minOrder){
        return true;
    }
    return false;
}