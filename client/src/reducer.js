const initialState = {
   currentCurrency: '$',
   redurectToPLP: true,
   redirectToCardPage: false,
   cardTotal: 0,
   cardArray: [],
};

const reducer = (state = initialState, action) => {
   switch (action.type) {
      case 'CURRENCY_CHANGE':
         return { ...state, currentCurrency: action.payload };
      case 'REDIRECT_TO_PLP':
         return { ...state, redurectToPLP: action.payload };
      case 'ADD_PRODUCT_TO_CARD': {
         const productIsNew = state.cardArray.some(
            (el) => el.id === action.payload.id
         ); //проверяем есть ли товар с таким айдишником

         if (!productIsNew) {
            // если такрго товара нету то добавляем новый
            const newCardArray = state.cardArray;
            newCardArray.push(action.payload);
            return { ...state, cardArray: newCardArray };
         } else {
            // если он всё же есть надо узнать с такими же он параметрами или нет
            const indexOfSameProduct = state.cardArray.findIndex(
               (el) =>
                  el.paramgrid.join('') === action.payload.paramgrid.join('') &&
                  el.color === action.payload.color
            ); // пробегаемся по корзине и ищем товар с такими же параметрами цвета и парамгрида
            if (indexOfSameProduct === -1) {
               //если такого не нашлось то добавляем новый товар
               const newCardArray = state.cardArray;
               newCardArray.push(action.payload);
               return { ...state, cardArray: newCardArray };
            } else {
               //если всё же товар нашёлся, то меняем у такого товара по индексу кол-во для корзины
               const newCardArray = state.cardArray;
               newCardArray[indexOfSameProduct].amount =
                  newCardArray[indexOfSameProduct].amount + 1;
               return { ...state, cardArray: newCardArray };
            }
         }
      }
      default:
         return state;
   }
};

export default reducer;
