---
title: 'Dein erster RAP-Service in ABAP Cloud'
description: 'Schritt-für-Schritt-Anleitung zum Aufbau eines schreibgeschützten SAP RESTful Application Programming (RAP) Services mit CDS Views und Behavior Definitions.'
pubDate: 2025-11-04
updatedDate: 2026-02-10
lang: de
heroImage: '../../../assets/blog-placeholder-1.jpg'
tags: ['SAP', 'ABAP', 'RAP', 'SAP BTP']
---

Das **RESTful Application Programming Model (RAP)** ist der Standardweg, um transaktionale Business-Services für S/4HANA und die SAP BTP ABAP Environment zu bauen. In diesem Beitrag bauen wir einen kleinen, schreibgeschützten RAP-Service, der eine Liste von Flügen ausliefert.

## 1. CDS-Interface-View definieren

Jeder RAP-Service beginnt mit einem Interface-View (`I_*`), der die Datenbanktabelle umschließt und die Elementliste festlegt.

```abap
@AbapCatalog.viewEnhancementCategory: [#NONE]
@AccessControl.authorizationCheck: #CHECK
@EndUserText.label: 'Interface-View: Flüge'
define view entity ZI_Flight
  as select from /dmo/flight as flight
{
  key flight.carrier_id    as CarrierID,
  key flight.connection_id as ConnectionID,
  key flight.flight_date   as FlightDate,
      flight.price         as Price,
      flight.currency_code as CurrencyCode
}
```

## 2. Projection-View veröffentlichen

Den Projection-View (`C_*`) sieht die UI oder der OData-Client tatsächlich. Er trägt auch die UI-Annotationen.

```abap
@AccessControl.authorizationCheck: #CHECK
@EndUserText.label: 'Projection: Flüge'
@Metadata.allowExtensions: true
@Search.searchable: true
define root view entity ZC_Flight
  provider contract transactional_query
  as projection on ZI_Flight
{
  key CarrierID,
  key ConnectionID,
  key FlightDate,
      @Semantics.amount.currencyCode: 'CurrencyCode'
      Price,
      CurrencyCode
}
```

## 3. Behavior Definition

Ein Read-only-Service braucht nur eine minimale Behavior Definition, damit RAP weiß, welche Entity der Root ist.

```abap
managed implementation in class zbp_i_flight unique;
strict ( 2 );
define behavior for ZI_Flight alias Flight
  lock master
  authorization master ( instance )
{
  field ( readonly ) CarrierID, ConnectionID, FlightDate;
}
```

## 4. Als OData-Service freischalten

Mit einer **Service Definition** die freigegebenen Entitäten auflisten und anschließend per **Service Binding** vom Typ `ODATA V4 (UI)` veröffentlichen.

```abap
@EndUserText.label: 'Flüge-Service'
define service ZUI_FLIGHT {
  expose ZC_Flight as Flight;
}
```

Nach dem Aktivieren liefert der **Preview**-Button im Service Binding kostenlos ein Fiori-Elements-List-Report.

## Nächste Schritte

- **Draft Handling** für `is_draft`-Edit-Sessions aktivieren.
- Den Service in eine eigene **Software Component** im ABAP-Cloud-Stack verschieben.
- Auf der SAP BTP eine CI-Pipeline mit `abapGit` und `abaplint` aufsetzen.
