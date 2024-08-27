import {
  Button,
  ButtonGroup,
} from "react-bootstrap";

import { Link, useNavigate } from "react-router-dom";
import usePostDetails from "../hook/use-post-details";
const PostListItem = ({ data, deleteRecord , isLoggedIn }) => {
  const navigtet = useNavigate();
  
  const deleteHandler = (item) => {
    if (window.confirm(`Do you really want to delete record: ${item.title}?`)) {
    return  deleteRecord(item.id);
    }
  };

  const handleEdit = (el) => {
    
  
         navigtet(`post/${el}/edit`)
       }


  // Ensure data is an array before mapping
  const records = Array.isArray(data) ? data.map((el, idx) =>
    <tr key={el.id}>
      <td>#{++idx}</td>
      <td>
        <Link to={`post/${el.id}` }>
        {el.title}
        </Link>
      </td>
      <td>
        <ButtonGroup aria-label="Basic example">
          <Button variant="success"  onClick={()=>handleEdit(el.id)}
           >Edit</Button>
          <Button variant="danger" disabled={!isLoggedIn} onClick={() => deleteHandler(el)}>
            Delete
          </Button>
        </ButtonGroup>
      </td>
    </tr>
  ) : <tr><td colSpan="3">No records available</td></tr>;


  
  return (
    <>
      {records}
    </>
  );
}

export default PostListItem;
