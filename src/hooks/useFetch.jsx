import { useEffect, useState } from "react";

export default function useFetch(url, method) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(url, {
      method,
    })
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, [url, method]);

  return { products };
}
