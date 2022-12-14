import { Component } from 'react';
import Typography from '../../atoms/Typography/Typography';
import { connect } from 'react-redux';
import styles from './cardproduct.module.scss';
import AddCardIcon from '../../atoms/AddCardIcon/AddCardIcon';
import { Link } from 'react-router-dom';
import { addProductToCard } from '../../../actions';

class CardProduct extends Component {
   state = { redirectToProductPage: false };

   cardClick = (e) => {
      if (
         e.target.tagName.toLowerCase() === 'div' ||
         e.target.tagName.toLowerCase() === 'svg'
      ) {
         e.preventDefault();
         const { product } = this.props;
         let defaultSelectedParamArray = product.attributes.reduce(
            (acc, el) => {
               if (el.id !== 'Color') {
                  acc.push(el.items[0].value);
               }
               return acc;
            },
            []
         );

         let defaultSelectedColor;
         if (product.attributes.findIndex((el) => el.id === 'Color') !== -1) {
            defaultSelectedColor = product.attributes.filter(
               (el) => el.id === 'Color'
            )[0].items[0].id;
         }

         this.props.addProductToCard(
            product.id,
            defaultSelectedParamArray,
            defaultSelectedColor,
            1,
            product.prices
         );
      }
   };

   render() {
      const { product, currentCurrency } = this.props;

      const amount = product.prices.filter(
         (el) => el.currency.symbol === currentCurrency
      )[0].amount;

      return (
         <Link to={`/product/${product.id}`}>
            <li className={styles.root}>
               <button
                  disabled={!product.inStock}
                  className={styles.root__button}
                  {...(product.inStock && {
                     onClick: (e) => this.cardClick(e, product.id),
                  })}
               >
                  <img
                     src={product.gallery[0]}
                     alt={product.name}
                     className={styles.root__image}
                  />
                  {product.inStock ? (
                     <div className={styles.root__middle}>
                        <div className={styles.root__middle__basket}>
                           <AddCardIcon />
                        </div>
                     </div>
                  ) : (
                     <Typography
                        preset="outofstock"
                        color="grei"
                        className={styles.root__outofstock}
                     >
                        out of stock
                     </Typography>
                  )}

                  <Typography preset="cardtitle" align="left">
                     {`${product.brand} ${product.name}`}
                  </Typography>
                  <Typography preset="currency" align="left">
                     {currentCurrency}
                     {amount.toFixed(2)}
                  </Typography>
               </button>
            </li>
         </Link>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      currentCurrency: state.currentCurrency,
      redurectToPLP: state.redurectToPLP,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      addProductToCard: (
         productId,
         selectedParamArray,
         selectedColorName,
         amount,
         pricesArray
      ) =>
         dispatch(
            addProductToCard({
               id: productId,
               paramgrid: selectedParamArray,
               color: selectedColorName,
               amount: amount,
               pricesArray,
            })
         ),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardProduct);
