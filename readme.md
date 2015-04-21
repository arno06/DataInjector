DataInjector
==============

html

```html
<div id="test">
	<div>prop : <span data-source="prop"></span></div>
	<div>prop2 : <span data-source="prop2"></span></div>
</div>
```

js

```javascript
DataInjector.fill(document.querySelector('#test'), {prop:"bouboup", prop2:"w00t"});
```

## TBD

* Gérer les boucles (autre que les tableaux)
* Pousser le champs des possibles dans l'expression (condition, deep values -some.id.lol- ... )
* Revoir l'api
* Ajouter une évaluation automatique
* Automatiser la récupération des données via une requête asynchrone (et évaluation à partir d'une réponse JSON)