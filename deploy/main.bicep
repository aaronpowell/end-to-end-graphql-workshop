param location string = resourceGroup().location
param environmentName string = 'env-${uniqueString(resourceGroup().id)}'

param minReplicas int = 0

param backendImage string
param backendPort int = 4000
var backendServiceAppName = 'graphql'

param isPrivateRegistry bool = true

param containerRegistry string
param containerRegistryUsername string = 'testUser'
@secure()
param containerRegistryPassword string = ''
@secure()
param registryPassword string = 'registry-password'

param databaseName string = 'trivia'
param containerName string = 'game'

param swaName string
param swaSku string = 'Standard'

// Container Apps Environment 
module environment 'environment.bicep' = {
  name: '${deployment().name}--environment'
  params: {
    environmentName: environmentName
    location: location
    appInsightsName: '${environmentName}-ai'
    logAnalyticsWorkspaceName: '${environmentName}-la'
  }
}

// Cosmosdb
module cosmosdb 'cosmosdb.bicep' = {
  name: '${deployment().name}--cosmosdb'
  params: {
    location: location
    primaryRegion: location
    databaseName: databaseName
    containerName: containerName
  }
}

// backend App
module backendService 'container-http.bicep' = {
  name: '${deployment().name}--${backendServiceAppName}'
  dependsOn: [
    environment
  ]
  params: {
    enableIngress: true
    isExternalIngress: true
    location: location
    environmentName: environmentName
    containerAppName: backendServiceAppName
    containerImage: backendImage
    containerPort: backendPort
    minReplicas: minReplicas
    isPrivateRegistry: isPrivateRegistry
    containerRegistry: containerRegistry
    registryPassword: registryPassword
    containerRegistryUsername: containerRegistryUsername
    env: [
      {
        name: 'CosmosDB'
        value: 'AccountEndpoint=${cosmosdb.outputs.documentEndpoint};AccountKey=${cosmosdb.outputs.primaryMasterKey}'
      }
      {
        name: 'CONTAINER_NAME'
        value: containerName
      }
      {
        name: 'DATABASE_NAME'
        value: databaseName
      }
    ]
    secrets: [
      {
        name: registryPassword
        value: containerRegistryPassword
      }
    ]
  }
}

module staticWebApp 'swa.bicep' = {
  name: '${deployment().name}--swa'
  params: {
    location: 'westus2'
    sku: swaSku
    name: swaName
  }
}

output backendFqdn string = backendService.outputs.fqdn
