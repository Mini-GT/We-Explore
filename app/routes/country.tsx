import { useParams } from "react-router"

export default function Country() {
  const { countryName } = useParams();

  return <div>{countryName}</div>
}