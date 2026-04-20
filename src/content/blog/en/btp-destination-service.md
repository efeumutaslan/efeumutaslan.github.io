---
title: 'Calling S/4HANA from SAP BTP via the Destination service'
description: 'How to call an on-premise S/4HANA OData service from a Node.js CAP application on SAP BTP using the Destination service and Cloud Connector.'
pubDate: 2025-12-02
lang: en
heroImage: '../../../assets/blog-placeholder-3.jpg'
tags: ['SAP BTP', 'CAP', 'Destination', 'S/4HANA']
---

A classic extensibility scenario on **SAP BTP** is: an application on the Cloud Foundry or Kyma runtime needs to read data from an on-premise S/4HANA system. Here is the minimal setup using the **Destination service** and the **Cloud Application Programming model**.

## 1. Create the destination in BTP cockpit

In your subaccount, create a destination named `S4HANA-API`:

```properties
Name=S4HANA-API
Type=HTTP
URL=https://my-s4.corp.local:44300
ProxyType=OnPremise
Authentication=PrincipalPropagation
WebIDEEnabled=true
HTML5.DynamicDestination=true
```

The `ProxyType=OnPremise` value tells BTP to route this call through your **Cloud Connector**.

## 2. Bind the service in `mta.yaml`

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

## 3. Declare a remote service in CAP

```js
// package.json excerpt
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

## 4. Call the remote service from a handler

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

CAP transparently fetches the destination, exchanges the user JWT for a principal-propagation assertion, and routes the HTTP call through the Connectivity service. You write almost no boilerplate.

## Operational tips

- Always bind **destination**, **connectivity** and **xsuaa** together — missing any of them causes silent `ECONNREFUSED` errors.
- Put the destination name in a CAP profile (`cds.requires.S4HANA_API.credentials.destination`) so `dev` and `prod` can point at different systems.
- Use `cds watch --profile hybrid` with the `@sap/xssec` plugin to run against a real BTP destination from your laptop.
