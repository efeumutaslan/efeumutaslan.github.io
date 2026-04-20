---
title: 'S/4HANA von SAP BTP aus aufrufen — mit dem Destination Service'
description: 'Wie man aus einer Node.js-CAP-Anwendung auf SAP BTP einen On-Premise-S/4HANA-OData-Service über den Destination Service und den Cloud Connector aufruft.'
pubDate: 2025-12-02
lang: de
heroImage: '../../../assets/blog-placeholder-3.jpg'
tags: ['SAP BTP', 'CAP', 'Destination', 'S/4HANA']
---

Ein klassisches Extensibility-Szenario auf **SAP BTP**: eine Anwendung auf Cloud Foundry oder Kyma muss Daten aus einem On-Premise-S/4HANA-System lesen. Hier die minimale Einrichtung mit **Destination Service** und dem **Cloud Application Programming Model**.

## 1. Destination im BTP Cockpit anlegen

Im Subaccount eine Destination `S4HANA-API` erzeugen:

```properties
Name=S4HANA-API
Type=HTTP
URL=https://my-s4.corp.local:44300
ProxyType=OnPremise
Authentication=PrincipalPropagation
WebIDEEnabled=true
HTML5.DynamicDestination=true
```

`ProxyType=OnPremise` sagt BTP, dass dieser Aufruf über den **Cloud Connector** laufen muss.

## 2. Services im `mta.yaml` binden

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

## 3. Remote-Service in CAP deklarieren

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

## 4. Remote-Service im Handler aufrufen

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

CAP holt die Destination transparent, tauscht das User-JWT gegen eine Principal-Propagation-Assertion und leitet den HTTP-Call über den Connectivity-Service — fast ohne Boilerplate.

## Betriebstipps

- **destination**, **connectivity** und **xsuaa** immer zusammen binden — fehlt eines, gibt es stille `ECONNREFUSED`-Fehler.
- Destination-Name in ein CAP-Profil packen (`cds.requires.S4HANA_API.credentials.destination`), damit `dev` und `prod` auf unterschiedliche Systeme zeigen können.
- `cds watch --profile hybrid` mit dem `@sap/xssec`-Plugin nutzen, um vom Laptop aus gegen eine echte BTP-Destination zu laufen.
