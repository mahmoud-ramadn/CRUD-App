import { useCallback, useEffect } from "react";
import PostList from "../components/PostList";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts, deletePost } from '../state/postSilce'; // Fixed typo in import
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
const Index = () => {
  const dispatch = useDispatch();
  const { records, loading, error } = useSelector(state => state.Posts);
  const {  isLoggedIn } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const  deleteRecord= useCallback((id) => {  // Renamed deletRecord to deleteRecord
    dispatch(deletePost(id));
  }, [dispatch]);

  return (
    <Loading error={error}  loading={loading}> 
<PostList  data={records}  deleteRecord={deleteRecord}  isLoggedIn={isLoggedIn} /> 

    </Loading>


  );
};

export default Index;
