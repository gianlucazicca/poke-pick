export const usePokeApi = () => {
    const {$pokeApiClient} = useNuxtApp();
    return $pokeApiClient;
}