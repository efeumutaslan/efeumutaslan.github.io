---
title: 'Fiori Elements: 5 annotations that matter most'
description: 'The smallest set of UI annotations you need to go from a raw OData entity to a polished Fiori Elements list report.'
pubDate: 2026-01-18
lang: en
heroImage: '../../../assets/blog-placeholder-2.jpg'
tags: ['SAP Fiori', 'Fiori Elements', 'SAPUI5', 'SAP']
---

Fiori Elements templates are driven almost entirely by **OData annotations**. You do not hand-write XML views — you describe *intent* and the framework builds the page. Here are the five annotations that give you 80% of the result.

## 1. `UI.HeaderInfo`

Tells Fiori Elements how to title each object.

```abap
@UI.headerInfo: {
  typeName: 'Flight',
  typeNamePlural: 'Flights',
  title: { type: #STANDARD, value: 'CarrierID' },
  description: { value: 'ConnectionID' }
}
```

## 2. `UI.LineItem`

The column layout of the list report.

```abap
@UI.lineItem: [
  { position: 10, label: 'Carrier'    },
  { position: 20, label: 'Connection' },
  { position: 30, label: 'Date'       },
  { position: 40, label: 'Price'      }
]
```

## 3. `UI.SelectionField`

Controls the filter bar at the top of the list.

```abap
@UI.selectionField: [{ position: 10 }]
CarrierID,
@UI.selectionField: [{ position: 20 }]
FlightDate,
```

## 4. `UI.FieldGroup` + `UI.Facet`

These build the object page sections.

```abap
@UI.fieldGroup: [{ qualifier: 'General', position: 10, label: 'Carrier' }]
CarrierID,
@UI.facet: [{
  id: 'General', type: #FIELDGROUP_REFERENCE,
  label: 'General Info', targetQualifier: 'General', position: 10
}]
```

## 5. `Search.searchable` + `Search.defaultSearchElement`

Turns on the global search box for free-text search.

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

That's it. Activate, refresh the Fiori Elements preview, and the list, filter bar, object page and global search all light up — with zero UI5 code.
