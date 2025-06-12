import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const Products = (props) => {


  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        <ProductItem
          title='Test-1'
          price={5}
          description='This is the first product - amazing!'
        />
        <ProductItem
          title='Test-2'
          price={10}
          description='This is the second product - twice as amazing!'
        />
      </ul>
    </section>
  );
};

export default Products;
