import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api/api";
import { EmptyPage } from "../EmptyPage/EmptyPage";
import { DrinkCard } from "../../components/DrinkCard/DrinkCard";
import styles from "../MyDrinks/MyDrinks.module.scss";

export const MyDrinks = () => {
  const queryClient = useQueryClient();

  const { data: drinks = [], isLoading } = useQuery({
    queryKey: ["myDrinks"],
    queryFn: async () => {
      const { data } = await api.get("/drinks/own");
      return Array.isArray(data) ? data : data.drinks || [];
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/drinks/own/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myDrinks"] });
    },
    onError: (error) => {
      console.error(error);
      alert("Unable to delete the drink");
    },
  });

  if (isLoading) return <EmptyPage message=" " />;

  return (
    <div className={`container ${styles.myDrinksContainer}`}>
      <h1>My Drinks</h1>

      {drinks.length === 0 ? (
        <EmptyPage message="You haven't added any of your cocktails yet" />
      ) : (
        <ul className={styles.drinksList}>
          {drinks.map((drink) => (
            <li key={drink._id} className={styles.item}>
              <DrinkCard
                showDetails={true}
                drink={drink}
                showSeeMore
                onDelete={() => deleteMutation.mutate(drink._id)}
                variant="favorites"
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
