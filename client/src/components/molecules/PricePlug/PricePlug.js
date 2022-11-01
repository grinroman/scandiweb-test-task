import React, { Component } from 'react';
import Typography from '../../atoms/Typography/Typography';
import clsx from 'clsx';
import { connect } from 'react-redux';
import styles from './priceplug.module.scss';
class PricePlug extends Component {
   render() {
      const { prices, currentCurrency, withHeader, small } = this.props;
      // console.log(currentCurrency);

      const currency = prices.filter(
         ({ currency }) => currency.symbol === currentCurrency
      )[0];

      return (
         <li className={clsx(styles.root, small && styles['narrow'])}>
            {withHeader && (
               <Typography preset="optionsgridtitle">price</Typography>
            )}

            <Typography preset={small ? 'currencyoverlay' : 'optionsgridtitle'}>
               {currency.currency.symbol} {currency.amount}
            </Typography>
         </li>
      );
   }
}

const mapStateToProps = (state) => {
   return { currentCurrency: state.currentCurrency };
};

export default connect(mapStateToProps)(PricePlug);
