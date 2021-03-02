export default function(list, search) {
  return {
    data() {
      return {
        [search]: '',
      };
    },
    computed: {
      filteredPeople() {
        return this[list]
          .filter((p)=>{ // filtre les lignes qui ne contiennent pas la recherche
            return !this[search] || // Si le champ de recherche est vide, on retourne tout
              this.objectToString(p) // On recupere les valeurs de l'objet sous forme de texte
                .toLowerCase() // On converti tout le texte en minuscule
                .includes(this[search].toLowerCase()); // On teste si la valeur de la recherche est contenu dans le texte
          });
      },
    },
    methods: {
      objectToString(obj) {
        return Object.values(obj)
          .map((v)=>typeof v === 'object' ? this.objectToString(v) : v) // On recupere les valeurs imbriquees de l'objet de maniere recursive
          .join(' '); // On applatit la liste sous forme de texte
      },
    },
  };
}
