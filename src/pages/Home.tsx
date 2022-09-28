import React from 'react';
import { Sort, Categories, PizzaBlock } from '../components/allComponents';
import Pagination from '../components/Pagination';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { useSelector } from 'react-redux';
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzaSlice';

import { RootState, useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
  // const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state: RootState) => state.filter.sort.sort);
  // const currentPage = useSelector((state) => state.filter.currentPage);
  const { categoryId, currentPage, searchValue } = useSelector((state: RootState) => state.filter);
  const { items, status } = useSelector((state: RootState) => state.pizzas);
  const dispatch = useAppDispatch();
  //Skeleton
  const skeleton = [...new Array(4)].map((_, index) => <Skeleton key={index} />);
  //Create pizzaBlocks
  const pizzas = items.map((obj: any, index: number) => <PizzaBlock key={index} {...obj} />);
  //Search
  const search = searchValue ? `&search=${searchValue}` : '';

  const onChangeCategory = React.useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);
  const onChangePage = (number: number) => {
    dispatch(setCurrentPage(number));
  };
  const getPizzas = async () => {
    await dispatch(
      fetchPizzas({
        sortType,
        currentPage,
        categoryId,
        search,
      }),
    );
    window.scrollTo(0, 0);
  };
  React.useEffect(() => {
    getPizzas();
  }, [categoryId, sortType, currentPage, search]);
  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="error">
          Ошибка получения пицц.
          <br />В данный момент пиццы временно недоступны :(
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeleton : pizzas}</div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
