---
title: 'Your first RAP service in ABAP Cloud'
description: 'A hands-on walkthrough of building a read-only SAP RESTful Application Programming (RAP) service using CDS views and behavior definitions.'
pubDate: 2025-11-04
updatedDate: 2026-02-10
lang: en
heroImage: '../../../assets/blog-placeholder-1.jpg'
tags: ['SAP', 'ABAP', 'RAP', 'SAP BTP']
---

The **RESTful Application Programming model (RAP)** is the standard way to build transactional business services for S/4HANA and SAP BTP ABAP Environment. In this post we build a tiny read-only RAP service that exposes a list of flights.

## 1. Define the CDS interface view

All RAP services start from an interface view (`I_*`) that wraps the database table and declares an element list.

```abap
@AbapCatalog.viewEnhancementCategory: [#NONE]
@AccessControl.authorizationCheck: #CHECK
@EndUserText.label: 'Interface view: Flights'
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

## 2. Expose a projection view

The projection view (`C_*`) is what the UI or OData client actually sees. It also carries UI annotations.

```abap
@AccessControl.authorizationCheck: #CHECK
@EndUserText.label: 'Projection: Flights'
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

## 3. Behavior definition

A read-only service only needs a minimal behavior definition to tell RAP which entity is the root.

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

## 4. Publish as an OData service

Use a **Service Definition** to list the exposed entities, then bind it with a **Service Binding** of type `ODATA V4 (UI)`.

```abap
@EndUserText.label: 'Flights service'
define service ZUI_FLIGHT {
  expose ZC_Flight as Flight;
}
```

Once activated, hit **Preview** in the service binding — you get a Fiori Elements list report for free.

## Next steps

- Add **draft handling** to support `is_draft` edit sessions.
- Move the service into a **software component** on the ABAP Cloud stack.
- Add a CI pipeline on SAP BTP with abapGit and `abaplint`.
