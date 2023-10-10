# Domain analysis

## Présentation et explications textuelles

## Comparatif des langages

### Python

#### Tableau comparatif des options

| Fonctionnalité                                           | Module `csv` (Python)                                                                                                            | Bibliothèque pandas`                                                                                               |
| -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Site Web du projet                                       | https://docs.python.org/3/library/csv.html                                                                                       | https://pandas.pydata.org/                                                                                         |
| Lecture de fichiers CSV                                  | Prend en charge la lecture simple de fichiers CSV.                                                                               | Permet de lire des fichiers CSV avec de nombreuses options de personnalisation.                                    |
| Écriture de fichiers CSV                                 | Prend en charge l'écriture simple de fichiers CSV.                                                                               | Permet d'écrire des DataFrames dans un fichier CSV avec de nombreuses options de personnalisation.                 |
| Traitement de données tabulaires                         | Peut être utilisé pour le traitement de données CSV, mais les données sont généralement stockées sous forme de listes de listes. | Offre des DataFrames, une structure de données puissante pour le traitement de données tabulaires.                 |
| Indexation et étiquetage des données                     | N'a pas de support intégré pour l'indexation ou l'étiquetage des données.                                                        | Permet d'attribuer des étiquettes et d'indexer les données pour une recherche et une manipulation plus efficaces.  |
| Filtrage et sélection des données                        | Le filtrage et la sélection des données nécessitent généralement un code personnalisé.                                           | Fournit des méthodes pour filtrer et sélectionner des données en utilisant des critères spécifiques.               |
| Agrégation et calculs statistiques                       | Nécessite d'écrire du code personnalisé pour les agrégations et les calculs statistiques.                                        | Offre des fonctions intégrées pour effectuer des opérations d'agrégation et de calcul statistique sur les données. |
| Gestion des données manquantes                           | Doit être géré manuellement en utilisant des conditions dans le code.                                                            | Propose des outils intégrés pour gérer les données manquantes, y compris la suppression ou le remplacement.        |
| Fusion de données provenant de plusieurs sources         | Exige d'écrire un code personnalisé pour la fusion de données.                                                                   | Fournit des méthodes pour fusionner des DataFrames à partir de plusieurs sources en utilisant des clés communes.   |
| Lecture et écriture de formats de données autres que CSV | Limité à la lecture et à l'écriture de fichiers CSV.                                                                             | Prend en charge une variété de formats de fichiers, y compris Excel, SQL, parquet, JSON, et bien d'autres.         |
| Performances pour les jeux de données volumineux         | Peut être moins efficace pour les gros jeux de données en raison de la manipulation de listes de listes.                         | Conçu pour traiter efficacement les gros jeux de données grâce à l'optimisation interne.                           |

#### Exemple de lecture de fichier dans ce langage

Exemple d'ouverture de fichier

Avec le module csv de Python :

```python
import csv
# Ouvrir le fichier CSV en mode lecture
with open('exemple.csv', mode='r') as fichier_csv:
    lecteur_csv = csv.reader(fichier_csv)

    # Lire et afficher chaque ligne du fichier
    for ligne in lecteur_csv:
        print(', '.join(ligne))
```

Avec la librairie pandas :

```python
import pandas as pd

# Lire le fichier CSV en un DataFrame
data = pd.read_csv('exemple.csv')

# Afficher les cinq premières lignes du DataFrame
print(data.head())

```

### Javascript

| Bibliothèque       | Langage de Programmation | Site Web                                                           | Features Notables                                                                                 |
| ------------------ | ------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| `csv-parser`       | JavaScript (Node.js)     | [csv-parser](https://www.npmjs.com/package/csv-parser)             | - Lecture efficace de fichiers CSV ligne par ligne<br>- Gestion automatique des en-têtes CSV      |
| `csv-write-stream` | JavaScript (Node.js)     | [csv-write-stream](https://www.npmjs.com/package/csv-write-stream) | - Écriture de données dans un fichier CSV<br>- Personnalisation des délimiteurs et des en-têtes   |
| `PapaParse`        | JavaScript (Navigateur)  | [PapaParse](https://www.papaparse.com/)                            | - Analyse de fichiers CSV dans un navigateur<br>- Gestion des erreurs et des options de formatage |
| `fast-csv`         | JavaScript (Node.js)     | [fast-csv](https://www.npmjs.com/package/fast-csv)                 | - Performance élevée pour la lecture/écriture CSV<br>- Support pour les flux et les promesses     |
| `csvtojson`        | JavaScript (Node.js)     | [csvtojson](https://www.npmjs.com/package/csvtojson)               | - Conversion de CSV en JSON<br>- Prise en charge de nombreux dialectes CSV                        |

Exemple de programme pour `csv-parser`:

```javascript
const fs = require("fs");
const csv = require("csv-parser");
fs.createReadStream("data.csv")
  .pipe(csv())
  .on("data", (row) => {
    console.log(row);
  })
  .on("end", () => {
    console.log("Lecture du CSV terminée.");
  });
```

Exemple de programme pour `csv-write-stream`:

```javascript
const fs = require("fs");
const csvWriter = require("csv-write-stream");
const writer = csvWriter();
writer.pipe(fs.createWriteStream("output.csv"));
writer.write({ Nom: "John", Prenom: "Doe", Age: 30 });
writer.write({ Nom: "Jane", Prenom: "Smith", Age: 25 });
writer.end();
```

Exemple de programme pour `PapaParse` :

```html
<!-- Inclure la bibliothèque PapaParse -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js"></script>

<input type="file" id="csvFile" accept=".csv" />

<script>
  document.getElementById("csvFile").addEventListener("change", (event) => {
    const file = event.target.files[0];

    // Lire le fichier CSV
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: function (results) {
        // Traitement des données CSV
        console.log(results.data);
      },
    });
  });
</script>
```

Exemple de programme pour `fast-csv`:

```javascript
const fs = require("fs");
const fastcsv = require("fast-csv");
const ws = fs.createWriteStream("output.csv");
const data = [
  { Name: "John", Age: 30 },
  { Name: "Jane", Age: 25 },
];
fastcsv.write(data, { headers: true }).pipe(ws);
```

Exemple de programme pour `csvtojson`:

```javascript
const csv = require("csvtojson");
csv()
  .fromFile("data.csv")
  .then((jsonObj) => {
    console.log(jsonObj);
  });
```

## Retour d'expérience ChatGPT/Copilot

## Diagramme de classe (métamodèle)
