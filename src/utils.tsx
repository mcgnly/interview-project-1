
export function formatCentsToDollars(cents: number): string {
    if (cents < 10) {
      return `$0.0${cents}`;
    }

    let d = (cents / 100) >> 0;
    let c = cents % 100;

    return `$${d}.${c}`;
  };

  export const placeholderProduct = {
    id: 0,
    imageSrc: "/images/loading.svg",
    name: "Loading...",
    priceCents: 0,
  }