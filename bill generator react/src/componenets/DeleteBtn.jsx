import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import storageSlice from "../store/storageSlice";

export default function DeleteBtn() {
  const storedBuyerListData = useSelector((store) => store.storage);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleDelete } = storageSlice.actions;
  function handleDeleteFn() {
    const result = confirm("Are you sure?");
    if (result) {
      const updatedState = storedBuyerListData.filter(
        (buyer) => buyer.buyerName !== params?.buyerName
      );
      dispatch(handleDelete({ updatedState }));
      navigate("..");
      console.log("worked");
    }
  }
  return (
    <div>
      <button
        className='mx-20 text-2xl hover:cursor-pointer'
        onClick={handleDeleteFn}>
        🗑️
      </button>
    </div>
  );
}
