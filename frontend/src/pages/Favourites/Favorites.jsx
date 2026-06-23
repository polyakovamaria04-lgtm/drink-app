import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { EmptyPage } from "../EmptyPage/EmptyPage";
import { DrinkCard } from "../../components/DrinkCard/DrinkCard";
import styles from "../Favourites/Favourites.module.scss";
import api from "../../api/api";

export const Favorites = () => {
  const queryClient = useQueryClient();

  const { data: drinks = [], isLoading } = useQuery({
    queryKey: ["favorites"],
    queryFn: async () => {
      const { data } = await api.get("/drinks/favorite");
      return Array.isArray(data) ? data : data.favorites || [];
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/drinks/favorite/remove/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
    onError: () => alert("Unable to delete the drink from favorites"),
  });

  if (isLoading) return <EmptyPage message=" " />;
  return (
    <div className="container">
      <h1 className={styles.title}>Favorites</h1>

      {drinks.length === 0 ? (
        <EmptyPage message="You haven't added any favorite cocktails yet" />
      ) : (
        <ul className={styles.drinksList}>
          {drinks.map((drink, index) => {
            console.log("drink:", drink);

            return (
              <li key={drink._id || drink.id || index}>
                <DrinkCard
                  showDetails={true}
                  drink={drink}
                  showSeeMore
                  onDelete={() => deleteMutation.mutate(drink._id)}
                  variant="favorites"
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
