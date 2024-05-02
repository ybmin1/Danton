//카트 조회. CartModal에서 서버에 요청하여 응답으로 데이터 받아옴

//액션 타입 정의 - 카트정보
const SET_INITIAL_STATE = "SET_INITIAL_STATE";
//액션 타입 정의 - 수량변경
const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";

// 액션 생성자 - 카트정보
export const setInitialState = (initialCartData) => ({
  type: SET_INITIAL_STATE,
  payload: initialCartData,
});

// 액션 생성자 - 수량변경
export const increment = (cartItemId) => {
  return {
    type: INCREMENT,
    payload: {
      cartItemId: cartItemId,
    },
  };
};
export const decrement = (cartItemId) => {
  return {
    type: DECREMENT,
    payload: {
      cartItemId: cartItemId,
    },
  };
};

// 초기 상태 정의 - 초기상태는 하나만..
const initialState = {
  id: "",
  cartItems: [],
};

// 리듀서 - 카트정보,
const cartInfo = (state = initialState, action) => {
  switch (action.type) {
    case SET_INITIAL_STATE:
      // SET_INITIAL_STATE 액션 처리
      return {
        ...state,
        cart: action.payload, // 받아온 초기 상태로 카트정보 업데이트
      };

    case INCREMENT:
      return {
        cartItems: state.cartItems.map((item) =>
          item.itemId === action.payload.itemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    case DECREMENT:
      const updatedCartItems = state.cartItems.map((item) =>
        item.itemId === action.payload.itemId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );

      //수량이 0인 아이템을 카트에서 삭제
      const updatedCartWithItemDeleted = updatedCartItems.filter(
        (item) =>
          !(item.itemId === action.payload.itemId && item.quantity === 0)
      );

      return {
        cartItems: updatedCartWithItemDeleted,
      };

    default:
      return state;
  }
};

export default cartInfo;
