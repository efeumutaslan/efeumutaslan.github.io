---
title: 'Fiori Elements: Die 5 wichtigsten Annotationen'
description: 'Die kleinste Menge an UI-Annotationen, mit der man von einer rohen OData-Entity zu einem fertigen Fiori-Elements-List-Report kommt.'
pubDate: 2026-01-18
lang: de
heroImage: '../../../assets/blog-placeholder-2.jpg'
tags: ['SAP Fiori', 'Fiori Elements', 'SAPUI5', 'SAP']
---

Fiori-Elements-Templates werden fast ausschließlich über **OData-Annotationen** gesteuert. Man schreibt keine XML-Views — man beschreibt die *Absicht*, und das Framework baut die Seite. Diese fünf Annotationen bringen 80 % des Ergebnisses.

## 1. `UI.HeaderInfo`

Legt fest, wie jedes Objekt überschrieben wird.

```abap
@UI.headerInfo: {
  typeName: 'Flug',
  typeNamePlural: 'Flüge',
  title: { type: #STANDARD, value: 'CarrierID' },
  description: { value: 'ConnectionID' }
}
```

## 2. `UI.LineItem`

Das Spaltenlayout des List Reports.

```abap
@UI.lineItem: [
  { position: 10, label: 'Carrier'     },
  { position: 20, label: 'Verbindung'  },
  { position: 30, label: 'Datum'       },
  { position: 40, label: 'Preis'       }
]
```

## 3. `UI.SelectionField`

Steuert die Filterleiste oben im List Report.

```abap
@UI.selectionField: [{ position: 10 }]
CarrierID,
@UI.selectionField: [{ position: 20 }]
FlightDate,
```

## 4. `UI.FieldGroup` + `UI.Facet`

Damit entstehen die Abschnitte der Objektseite.

```abap
@UI.fieldGroup: [{ qualifier: 'Allgemein', position: 10, label: 'Carrier' }]
CarrierID,
@UI.facet: [{
  id: 'Allgemein', type: #FIELDGROUP_REFERENCE,
  label: 'Allgemeine Infos', targetQualifier: 'Allgemein', position: 10
}]
```

## 5. `Search.searchable` + `Search.defaultSearchElement`

Aktiviert die globale Suchleiste ohne Zusatzaufwand.

```abap
@Search.searchable: true
define view entity ZC_Flight as projection on ZI_Flight {
  @Search.defaultSearchElement: true
  CarrierID,
  @Search.defaultSearchElement: true
  ConnectionID,
  ...
}
```

Fertig. Aktivieren, die Fiori-Elements-Vorschau neu laden — Liste, Filterleiste, Objektseite und globale Suche sind da, ohne eine Zeile UI5-Code.
