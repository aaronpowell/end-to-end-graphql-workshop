param swaName string
param location string
param sku string = 'Free'

resource swa_resource 'Microsoft.Web/staticSites@2021-03-01' = {
  name: swaName
  location: location
  sku: {
    name: sku
    size: sku
  }
}
