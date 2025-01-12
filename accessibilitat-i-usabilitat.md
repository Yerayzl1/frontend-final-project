# Accessibilitat i Usabilitat

## Resum dels Resultats

### Observacions durant les proves
1. **Accessibilitat**:
   - Elements amb colors poc visibles entre el text i el fons.
   - Manquen etiquetes descriptives o `aria-labels` per a usuaris amb lectors de pantalla.
   - Suport per a navegació amb teclat, com ara targetes de productes i cites.

2. **Usabilitat**:
   - Els usuaris no troben funcionalitats específiques a la cerca avançada de cites.
   - Errors no mostrats a través de les vistes y confusió en el flux d'interacció.
   - Paginació poc intuïtiva per als usuaris, especialment en les vistes amb grans volums de dades.

---

### Problemes Identificats

| **Problema**                             | **Vista**                 | **Prioritat** |
|------------------------------------------|---------------------------|---------------|
| Contrast insuficient en botons           | Totes                     | Alta          |
| Falta d'etiquetes descriptives (`aria-label`) | Formularis i components   | Alta          |
| Navegació amb teclat no funcional        | Inventari, Serveis        | Mitjana       |
| Errors inconsistents en la interfície    | Cites, Usuaris            | Mitjana       |
| Paginació confusa                        | Inventari, Cites          | Baixa         |

---

### Feedback Recollit dels Usuaris

1. **Positiu**:
   - Interfície visual atractiva i moderna.
   - Gràfics amb informació clara i comprensible.

2. **Negatiu**:
   - Els usuaris sugereixen millorar la visibilitat d'alguns components interactius.
   - Simplificar la navegació en pàgines amb moltes dades.

---

## Propostes de Millora

### Accessibilitat

1. **Ajustar el contrast**:
   - Utilitzar colors amb major diferència de lluminositat per botons i textos secundaris.
   - Exemple: canviar el text gris sobre fons clar per un color més fosc.

2. **Afegir etiquetes descriptives**:
   - Assegurar que tots els formularis i components interactius incloguin etiquetes `aria-label` o `aria-describedby`.
   - Exemple: per al camp de cerca, afegir `<input aria-label="Cerca un producte">`.

---

### Usabilitat

1. **Simplificar la navegació**:
   - Afegir filtres i opcions de cerca visibles a la part superior de les llistes llargues, com ara usuaris, productes o cites.
   - Exemple: un menú desplegable amb filtres predefinits.

2. **Revisar la paginació**:
   - Utilitzar icones més clares per als botons de navegació de pàgina.
   - Exemple: afegir etiquetes textuals com "Anterior" i "Següent" juntament amb les fletxes.
