---
title: 'SAP BTP üzerinden S/4HANA çağırmak — Destination servisi'
description: 'SAP BTP üzerinde çalışan bir Node.js CAP uygulamasından, Destination servisi ve Cloud Connector aracılığıyla on-premise S/4HANA OData servisine erişmek.'
pubDate: 2025-12-02
lang: tr
heroImage: '../../../assets/blog-placeholder-3.jpg'
tags: ['SAP BTP', 'CAP', 'Destination', 'S/4HANA']
---

**SAP BTP** üzerinde klasik bir genişletme senaryosu: Cloud Foundry ya da Kyma üzerinde çalışan bir uygulama, on-premise S/4HANA sistemden veri okumak ister. İşte **Destination servisi** ve **Cloud Application Programming modeli** ile minimum kurulum.

## 1. BTP cockpit'te destination oluşturun

Subaccount içinde `S4HANA-API` adında bir destination tanımlayın:

```properties
Name=S4HANA-API
Type=HTTP
URL=https://my-s4.corp.local:44300
ProxyType=OnPremise
Authentication=PrincipalPropagation
WebIDEEnabled=true
HTML5.DynamicDestination=true
```

`ProxyType=OnPremise` BTP'ye bu çağrının **Cloud Connector** üzerinden yönlendirilmesi gerektiğini söyler.

## 2. Servisleri `mta.yaml` dosyasında bağlayın

```yaml
resources:
  - name: myapp-destination
    type: org.cloudfoundry.managed-service
    parameters:
      service: destination
      service-plan: lite
  - name: myapp-connectivity
    type: org.cloudfoundry.managed-service
    parameters:
      service: connectivity
      service-plan: lite
  - name: myapp-xsuaa
    type: org.cloudfoundry.managed-service
    parameters:
      service: xsuaa
      service-plan: application
```

## 3. CAP içinde uzak servisi bildirin

```js
// package.json
"cds": {
  "requires": {
    "S4HANA_API": {
      "kind": "odata-v4",
      "model": "srv/external/API_BUSINESS_PARTNER",
      "credentials": { "destination": "S4HANA-API" }
    }
  }
}
```

## 4. Handler içinde uzak servisi çağırın

```js
const cds = require('@sap/cds')

module.exports = cds.service.impl(async function () {
  const s4 = await cds.connect.to('S4HANA_API')

  this.on('READ', 'BusinessPartners', async (req) => {
    return s4.run(
      SELECT.from('A_BusinessPartner')
        .columns('BusinessPartner', 'FirstName', 'LastName')
        .limit(req.query.SELECT.limit?.rows?.val ?? 50)
    )
  })
})
```

CAP destination'ı şeffaf şekilde alır, kullanıcının JWT'sini principal-propagation assertion'a çevirir ve HTTP çağrısını Connectivity servisi üzerinden iletir. Neredeyse hiç boilerplate yazmazsınız.

## Operasyonel ipuçları

- **destination**, **connectivity** ve **xsuaa** servislerini her zaman birlikte bağlayın — biri eksikse sessiz `ECONNREFUSED` hataları alırsınız.
- Destination adını CAP profiline koyun (`cds.requires.S4HANA_API.credentials.destination`) — böylece `dev` ve `prod` farklı sistemlere bakabilir.
- `cds watch --profile hybrid` + `@sap/xssec` plugin ile dizüstünüzden gerçek bir BTP destination'ına karşı çalıştırın.
