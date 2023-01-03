import { createAction } from "redux-actions";
import * as actions from "../constant";


export const getAllocItemsRequest = createAction(
actions.GET_ALLOC_ITEMS_REQUEST
);
export const getAllocItemsSuccess = createAction(
actions.GET_ALLOC_ITEMS_SUCCESS
);
export const getAllocItemsError = createAction(
actions.GET_ALLOC_ITEMS_ERROR
);

export const postLIkeInsertRequest = createAction(
    actions.POST_LIKE_INSERT_REQUEST
);
export const postLIkeInsertSuccess = createAction(
    actions.POST_LIKE_INSERT_SUCCESS
);
export const postLIkeInsertError = createAction(
    actions.POST_LIKE_INSERT_ERROR
);
