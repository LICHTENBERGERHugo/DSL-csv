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

## Retour d'expérience ChatGPT/Copilot

## Diagramme de classe (métamodèle)
