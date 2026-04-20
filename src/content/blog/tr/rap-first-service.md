---
title: 'ABAP Cloud üzerinde ilk RAP servisiniz'
description: 'CDS görünümleri ve davranış tanımları kullanarak salt okunur bir SAP RESTful Application Programming (RAP) servisini adım adım oluşturun.'
pubDate: 2025-11-04
updatedDate: 2026-02-10
lang: tr
heroImage: '../../../assets/blog-placeholder-1.jpg'
tags: ['SAP', 'ABAP', 'RAP', 'SAP BTP']
---

**RESTful Application Programming modeli (RAP)**, S/4HANA ve SAP BTP ABAP Environment üzerinde işlemsel iş servisleri oluşturmanın standart yoludur. Bu yazıda uçuş listesini sunan minimal, salt okunur bir RAP servisi kuracağız.

## 1. CDS arayüz görünümünü tanımlayın

Tüm RAP servisleri, veritabanı tablosunu saran ve alan listesini bildiren bir arayüz görünümü (`I_*`) ile başlar.

```abap
@AbapCatalog.viewEnhancementCategory: [#NONE]
@AccessControl.authorizationCheck: #CHECK
@EndUserText.label: 'Arayüz görünümü: Uçuşlar'
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

## 2. Projeksiyon görünümünü yayınlayın

Projeksiyon görünümü (`C_*`), kullanıcı arayüzünün veya OData istemcisinin gerçekten gördüğü katmandır. UI notlarını da taşır.

```abap
@AccessControl.authorizationCheck: #CHECK
@EndUserText.label: 'Projeksiyon: Uçuşlar'
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

## 3. Davranış tanımı

Salt okunur bir servis için minimal bir davranış tanımı yeterlidir:

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

## 4. OData servisi olarak yayınlayın

Bir **Service Definition** ile sunulacak varlıkları listeleyin, ardından `ODATA V4 (UI)` tipinde bir **Service Binding** ile eşleştirin.

```abap
@EndUserText.label: 'Uçuşlar servisi'
define service ZUI_FLIGHT {
  expose ZC_Flight as Flight;
}
```

Servis binding içerisinde **Preview** düğmesine tıkladığınızda, ücretsiz bir Fiori Elements list report karşınıza çıkar.

## Sonraki adımlar

- `is_draft` düzenleme oturumlarını desteklemek için **draft handling** ekleyin.
- Servisi ABAP Cloud üzerinde bir **software component** içine taşıyın.
- SAP BTP üzerinde `abapGit` ve `abaplint` ile bir CI hattı kurun.
