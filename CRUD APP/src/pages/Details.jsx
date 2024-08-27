import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { cleanRecord } from "../state/postSilce";
import Loading from "../components/Loading";
import usePostDetails from "../hook/use-post-details"
const Details = () => {
  const dispatch=useDispatch()
  const { loading, error, record } = usePostDetails();
  
  useEffect(() => {
    return () => {
   dispatch(cleanRecord())
 }
},[dispatch])


  return (
    <div>
      <Loading error={error}  loading={loading} >
        <p>Title { record?.title}</p>
        <p>Title { record?.description}</p>
</Loading>

    </div>
  )
}

export default Details