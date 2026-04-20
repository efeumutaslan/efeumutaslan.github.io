---
title: 'Fiori Elements: En önemli 5 annotation'
description: 'Ham bir OData varlığından cilalı bir Fiori Elements list raporuna geçmek için ihtiyacınız olan en küçük annotation kümesi.'
pubDate: 2026-01-18
lang: tr
heroImage: '../../../assets/blog-placeholder-2.jpg'
tags: ['SAP Fiori', 'Fiori Elements', 'SAPUI5', 'SAP']
---

Fiori Elements şablonları neredeyse tamamen **OData annotation**'ları ile yönlendirilir. XML view yazmazsınız; yalnızca *niyeti* tarif edersiniz ve framework sayfayı sizin için kurar. Sonuçların %80'ini veren beş annotation şunlardır.

## 1. `UI.HeaderInfo`

Her nesneye nasıl başlık verileceğini belirtir.

```abap
@UI.headerInfo: {
  typeName: 'Uçuş',
  typeNamePlural: 'Uçuşlar',
  title: { type: #STANDARD, value: 'CarrierID' },
  description: { value: 'ConnectionID' }
}
```

## 2. `UI.LineItem`

List report'un sütun düzenini belirler.

```abap
@UI.lineItem: [
  { position: 10, label: 'Taşıyıcı'   },
  { position: 20, label: 'Bağlantı'   },
  { position: 30, label: 'Tarih'      },
  { position: 40, label: 'Fiyat'      }
]
```

## 3. `UI.SelectionField`

Üstteki filtre çubuğunu yönetir.

```abap
@UI.selectionField: [{ position: 10 }]
CarrierID,
@UI.selectionField: [{ position: 20 }]
FlightDate,
```

## 4. `UI.FieldGroup` + `UI.Facet`

Nesne sayfası bölümlerini oluştururlar.

```abap
@UI.fieldGroup: [{ qualifier: 'Genel', position: 10, label: 'Taşıyıcı' }]
CarrierID,
@UI.facet: [{
  id: 'Genel', type: #FIELDGROUP_REFERENCE,
  label: 'Genel Bilgiler', targetQualifier: 'Genel', position: 10
}]
```

## 5. `Search.searchable` + `Search.defaultSearchElement`

Global arama kutusunu ücretsiz olarak açar.

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

Bu kadar. Aktifleştirin, Fiori Elements önizlemesini yenileyin; hiç UI5 kodu yazmadan liste, filtre çubuğu, nesne sayfası ve global arama çalışmaya başlar.
