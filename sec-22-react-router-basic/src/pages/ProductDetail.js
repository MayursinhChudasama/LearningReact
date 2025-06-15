import { useParams } from "react-router";
export default function ProductDetail() {
  const params = useParams();
  return <h1>{params.productID}</h1>;
}
