// hooks/useRouting.js
import { useNavigate } from "react-router-dom";

const useRouting = () => {
  const navigate = useNavigate();

  function goToProductDetail(id) {
    navigate(`/products/${id}`);
  }

  return { goToProductDetail };
};

export default useRouting;
