import Tools from '@/services/Tools';

export default function(list, search, filters) {
  return {
    data() {
      return {
        [search]: '',
        [filters]: [],
      };
    },
    computed: {
      filteredPeople() {
        return this[list]
          // filtre les lignes qui ne passent pas les filtres par colonne
          .filter((p)=>!this.enableFilter || this[filters]
            .every((f)=>f.values.includes(Tools.findValueAtPath(p, f.path)))) // retourne les lignes qui passent tous les filtres
          // filtre les lignes qui ne contiennent pas la recherche
          .filter((p)=>!this[search] || // Si le champ de recherche est vide, on retourne tout
              this.objectToString(p) // Sinon, on recupere les valeurs de l'objet sous forme de texte
                .toLowerCase() // On converti tout le texte en minuscule
                .includes(this[search].toLowerCase())); // On teste si la valeur de la recherche est contenu dans le texte
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
